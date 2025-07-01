import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Get water goal for a specific user and date
export const getWaterGoal = query({
	args: {
		userId: v.string(),
		date: v.string(),
	},
	handler: async (ctx, args) => {
		const waterGoal = await ctx.db
			.query('waterGoals')
			.withIndex('by_user_and_date', (q) => 
				q.eq('userId', args.userId).eq('date', args.date)
			)
			.first()
		
		return waterGoal
	},
})

// Create or update water goal
export const upsertWaterGoal = mutation({
	args: {
		userId: v.string(),
		goal: v.number(),
		drunk: v.number(),
		hour: v.number(),
		timer: v.number(),
		perHour: v.optional(v.number()),
		date: v.string(),
	},
	handler: async (ctx, args) => {
		const now = Date.now()
		
		// Check if water goal already exists for this user and date
		const existing = await ctx.db
			.query('waterGoals')
			.withIndex('by_user_and_date', (q) => 
				q.eq('userId', args.userId).eq('date', args.date)
			)
			.first()
		
		if (existing) {
			// Update existing water goal
			return await ctx.db.patch(existing._id, {
				goal: args.goal,
				drunk: args.drunk,
				hour: args.hour,
				timer: args.timer,
				perHour: args.perHour,
				updatedAt: now,
			})
		} else {
			// Create new water goal
			return await ctx.db.insert('waterGoals', {
				userId: args.userId,
				goal: args.goal,
				drunk: args.drunk,
				hour: args.hour,
				timer: args.timer,
				perHour: args.perHour,
				date: args.date,
				createdAt: now,
				updatedAt: now,
			})
		}
	},
})

// Update water goal progress (drunk amount)
export const updateWaterProgress = mutation({
	args: {
		userId: v.string(),
		date: v.string(),
		drunk: v.number(),
		hour: v.number(),
		timer: v.number(),
	},
	handler: async (ctx, args) => {
		const waterGoal = await ctx.db
			.query('waterGoals')
			.withIndex('by_user_and_date', (q) => 
				q.eq('userId', args.userId).eq('date', args.date)
			)
			.first()
		
		if (!waterGoal) {
			throw new Error('Water goal not found')
		}
		
		return await ctx.db.patch(waterGoal._id, {
			drunk: args.drunk,
			hour: args.hour,
			timer: args.timer,
			updatedAt: Date.now(),
		})
	},
})

// Get all water goals for a user
export const getUserWaterGoals = query({
	args: {
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const waterGoals = await ctx.db
			.query('waterGoals')
			.withIndex('by_user', (q) => q.eq('userId', args.userId))
			.order('desc')
			.collect()
		
		return waterGoals
	},
}) 