import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	waterGoals: defineTable({
		userId: v.string(),
		goal: v.number(),
		drunk: v.number(),
		hour: v.number(),
		timer: v.number(),
		perHour: v.optional(v.number()),
		date: v.string(), // YYYY-MM-DD format
		createdAt: v.number(),
		updatedAt: v.number(),
	})
		.index('by_user_and_date', ['userId', 'date'])
		.index('by_user', ['userId']),
}) 