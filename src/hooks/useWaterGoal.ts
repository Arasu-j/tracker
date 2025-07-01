import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useCallback } from 'react'

// For now, we'll use a simple user ID. In a real app, you'd get this from authentication
const getUserId = () => {
	// Generate a simple user ID for demo purposes
	// In production, this would come from your auth system
	if (typeof window !== 'undefined') {
		let userId = localStorage.getItem('water-user-id')
		if (!userId) {
			userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
			localStorage.setItem('water-user-id', userId)
		}
		return userId
	}
	return 'default-user'
}

const getCurrentDate = () => {
	const today = new Date()
	return today.toISOString().split('T')[0] // YYYY-MM-DD format
}

export function useWaterGoal(goal: number, perHour?: number) {
	const userId = getUserId()
	const currentDate = getCurrentDate()
	
	// Query current water goal
	const waterGoal = useQuery(api.waterGoals.getWaterGoal, {
		userId,
		date: currentDate,
	})
	
	// Mutations
	const upsertWaterGoal = useMutation(api.waterGoals.upsertWaterGoal)
	const updateWaterProgress = useMutation(api.waterGoals.updateWaterProgress)
	
	// Initialize water goal if it doesn't exist
	const initializeWaterGoal = useCallback(async (initialDrunk = 0, initialHour = 0, initialTimer = 3600) => {
		await upsertWaterGoal({
			userId,
			goal,
			drunk: initialDrunk,
			hour: initialHour,
			timer: initialTimer,
			perHour,
			date: currentDate,
		})
	}, [upsertWaterGoal, userId, goal, perHour, currentDate])
	
	// Update water progress
	const updateProgress = useCallback(async (drunk: number, hour: number, timer: number) => {
		if (waterGoal) {
			await updateWaterProgress({
				userId,
				date: currentDate,
				drunk,
				hour,
				timer,
			})
		} else {
			// If no water goal exists, create one
			await initializeWaterGoal(drunk, hour, timer)
		}
	}, [waterGoal, updateWaterProgress, userId, currentDate, initializeWaterGoal])
	
	// Get current state
	const currentState = waterGoal ? {
		drunk: waterGoal.drunk,
		hour: waterGoal.hour,
		timer: waterGoal.timer,
	} : {
		drunk: 0,
		hour: 0,
		timer: 3600,
	}
	
	return {
		waterGoal,
		currentState,
		initializeWaterGoal,
		updateProgress,
		isLoading: waterGoal === undefined,
	}
} 