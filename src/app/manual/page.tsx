'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Navbar } from '../../components/navbar'

export default function ManualPage () {
	const [goal, setGoal] = useState('2')
	const [perHour, setPerHour] = useState('125')
	const router = useRouter()

	const isValid = Number(goal) > 0 && Number(perHour) > 0

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (isValid) {
			router.push(`/goal?goal=${goal}&perHour=${perHour}`)
		}
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col'>
			<Navbar active='goal' />
			<div className='flex flex-1 flex-col items-center justify-center'>
				<Card className='w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 rounded-2xl fade-in'>
					<CardHeader>
						<CardTitle className='text-center text-2xl font-extrabold tracking-tight mb-2 text-indigo-700 dark:text-indigo-300'>Set Your Own Water Goal</CardTitle>
						<p className='text-center text-gray-500 dark:text-gray-400 text-base font-medium'>Customize your daily and hourly water intake</p>
					</CardHeader>
					<CardContent>
						<form className='flex flex-col gap-6' onSubmit={handleSubmit}>
							<div className='flex flex-col gap-2'>
								<Label htmlFor='goal' className='font-semibold text-gray-700 dark:text-gray-200'>Daily Goal (liters)</Label>
								<Input
									id='goal'
									type='number'
									placeholder='e.g. 2.5'
									value={goal}
									onChange={e => setGoal(e.target.value)}
									min={0}
									required
									step='0.1'
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<Label htmlFor='perHour' className='font-semibold text-gray-700 dark:text-gray-200'>Per Hour (ml)</Label>
								<Input
									id='perHour'
									type='number'
									placeholder='e.g. 125'
									value={perHour}
									onChange={e => setPerHour(e.target.value)}
									min={0}
									required
								/>
							</div>
							<Button type='submit' className='mt-4 w-full text-base font-bold py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed' disabled={!isValid}>
								Set Goal
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	)
} 