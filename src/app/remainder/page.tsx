'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { useMemo } from 'react'
import { Navbar } from '../../components/navbar'

function calculateWaterIntakeRange (weight: number): [number, number] {
	// 30-40ml per kg body weight, rounded to nearest 0.1L
	const min = Math.round((weight * 0.03) * 10) / 10
	const max = Math.round((weight * 0.04) * 10) / 10
	return [min, max]
}

export default function RemainderPage () {
	const params = useSearchParams()
	const router = useRouter()
	const weight = Number(params.get('weight'))

	const [minLiters, maxLiters] = useMemo(() => {
		if (!weight) return [null, null]
		return calculateWaterIntakeRange(weight)
	}, [weight])

	const [minPerHourMl, maxPerHourMl] = useMemo(() => {
		if (!minLiters || !maxLiters) return [null, null]
		return [
			Math.round((minLiters * 1000) / 16),
			Math.round((maxLiters * 1000) / 16)
		]
	}, [minLiters, maxLiters])

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col'>
			<Navbar active='remainder' />
			<div className='flex flex-1 flex-col items-center justify-center p-4'>
				<Card className='w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 rounded-2xl fade-in p-4 sm:p-6'>
					<CardHeader>
						<CardTitle className='text-center text-xl sm:text-2xl font-extrabold tracking-tight mb-2 text-indigo-700 dark:text-indigo-300'>Daily Water Suggestion</CardTitle>
						<p className='text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium'>Based on your weight</p>
					</CardHeader>
					<CardContent>
						{minLiters && maxLiters ? (
							<div className='flex flex-col items-center gap-4 sm:gap-6'>
								<p className='text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-300'>
									{minLiters} - {maxLiters} <span className='text-base sm:text-lg font-medium'>liters/day</span>
								</p>
								{minPerHourMl !== null && maxPerHourMl !== null && (
									<p className='text-base sm:text-lg font-semibold text-indigo-500 dark:text-indigo-200'>
										{minPerHourMl} - {maxPerHourMl} ml/hour
										<span className='text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400 ml-2'>(16h active)</span>
									</p>
								)}
								<div className='flex gap-4 w-full'>
									<Button className='w-1/2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all duration-200' onClick={() => router.push(`/goal?goal=${maxLiters}`)}>Set</Button>
									<Button variant='outline' className='w-1/2 font-bold py-3 rounded-xl transition-all duration-200' onClick={() => router.push('/manual')}>Manual</Button>
								</div>
							</div>
						) : (
							<p className='text-center text-red-500'>Invalid input. Please return to Home and enter your details.</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
} 