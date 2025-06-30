'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { useRouter } from 'next/navigation'
import { Navbar } from '../components/navbar'

export default function Home () {
	const [height, setHeight] = useState('')
	const [weight, setWeight] = useState('')
	const router = useRouter()
	const isValid = height !== '' && weight !== '' && !isNaN(Number(height)) && !isNaN(Number(weight)) && Number(height) > 0 && Number(weight) > 0

	const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHeight(e.target.value)
	}

	const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWeight(e.target.value)
	}

	const handleNext = () => {
		if (isValid) {
			router.push(`/remainder?height=${encodeURIComponent(height)}&weight=${encodeURIComponent(weight)}`)
		}
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col'>
			<Navbar active='home' />
			<main className='flex flex-1 items-center justify-center p-4'>
				<div className='flex w-full justify-center items-center min-h-[calc(100vh-80px)]'>
					<Card className='w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 rounded-2xl fade-in p-4 sm:p-6'>
						<CardHeader>
							<CardTitle className='text-center text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-indigo-700 dark:text-indigo-300'>Welcome</CardTitle>
							<p className='text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium'>Enter your height and weight to continue</p>
						</CardHeader>
						<CardContent>
							<form className='flex flex-col gap-6' onSubmit={e => { e.preventDefault(); handleNext() }}>
								<div className='flex flex-col gap-2'>
									<Label htmlFor='height' className='font-semibold text-gray-700 dark:text-gray-200'>Height (cm)</Label>
									<Input
										id='height'
										type='number'
										placeholder='e.g. 170'
										value={height}
										onChange={handleHeightChange}
										min={0}
										required
										className='rounded-lg px-4 py-3 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all duration-200'
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<Label htmlFor='weight' className='font-semibold text-gray-700 dark:text-gray-200'>Weight (kg)</Label>
									<Input
										id='weight'
										type='number'
										placeholder='e.g. 65'
										value={weight}
										onChange={handleWeightChange}
										min={0}
										required
										className='rounded-lg px-4 py-3 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all duration-200'
									/>
								</div>
								<Button type='submit' className='mt-4 w-full text-base font-bold py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed' disabled={!isValid}>
									Next
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	)
}
