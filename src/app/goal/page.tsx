'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Navbar } from '../../components/navbar'
import { useWaterGoal } from '../../hooks/useWaterGoal'

function Confetti () {
	// Simple confetti animation using CSS
	return (
		<div className='fixed inset-0 pointer-events-none z-50 flex items-center justify-center'>
			<div className='w-full h-full flex flex-wrap justify-center items-start'>
				{Array.from({ length: 40 }).map((_, i) => (
					<div
						key={i}
						className='w-2 h-6 rounded-full absolute animate-confetti'
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 40 + 10}%`,
							background: `hsl(${Math.random() * 360}, 80%, 60%)`,
							animationDelay: `${Math.random()}s`,
							animationDuration: `${1.5 + Math.random()}s`,
						}}
					/>
				))}
			</div>
		</div>
	)
}

function playBeep() {
	try {
		const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
		const o = ctx.createOscillator()
		const g = ctx.createGain()
		o.type = 'sine'
		o.frequency.value = 880
		g.gain.value = 0.1
		o.connect(g)
		g.connect(ctx.destination)
		o.start()
		o.stop(ctx.currentTime + 0.3)
		setTimeout(() => ctx.close(), 400)
	} catch {}
}

 function GoalPage () {
	const params = useSearchParams()
	const goal = Number(params.get('goal')) || 2
	const perHourParam = params.get('perHour')
	const perHour = perHourParam ? Number(perHourParam) : Math.round((goal * 1000) / 16)
	
	// Use Convex for data management
	const { currentState, updateProgress, isLoading } = useWaterGoal(goal, perHour)
	const { drunk, hour, timer } = currentState
	
	const [showConfetti, setShowConfetti] = useState(false)
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	const percent = Math.min((drunk / goal) * 100, 100)
	const remaining = Math.max(goal - drunk, 0)

	useEffect(() => {
		if (drunk >= goal) {
			setShowConfetti(true)
			if (timerRef.current) clearInterval(timerRef.current)
			return
		}
		setShowConfetti(false)
	}, [drunk, goal])

	useEffect(() => {
		if (timerRef.current) clearInterval(timerRef.current)
		if (drunk >= goal) return
		timerRef.current = setInterval(() => {
			const newTimer = timer <= 1 ? 3600 : timer - 1
			const newHour = timer <= 1 ? hour + 1 : hour
			
			if (timer <= 1) {
				playBeep()
				alert('Time to drink your next glass of water!')
			}
			
			updateProgress(drunk, newHour, newTimer)
		}, 1000)
		return () => {
			if (timerRef.current) clearInterval(timerRef.current)
		}
	}, [hour, drunk, goal, timer, updateProgress])

	const handleDrink = () => {
		if (drunk < goal) {
			const newDrunk = Math.round((drunk + goal / 8) * 10) / 10
			updateProgress(newDrunk, hour, timer)
		}
	}

	const formatTime = (s: number) => {
		const m = Math.floor(s / 60)
		const sec = s % 60
		return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
	}

	// Show loading state while Convex is loading
	if (isLoading) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col'>
				<Navbar active='goal' />
				<div className='flex flex-1 flex-col items-center justify-center px-2 sm:px-0'>
					<Card className='w-full max-w-lg shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 rounded-2xl fade-in p-4 sm:p-6'>
						<CardContent>
							<div className='flex flex-col items-center gap-6'>
								<p className='text-lg font-semibold text-indigo-600 dark:text-indigo-300'>Loading your water goal...</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col'>
			<Navbar active='goal' />
			<div className='flex flex-1 flex-col items-center justify-center px-2 sm:px-0'>
				<Card className='w-full max-w-lg shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 rounded-2xl fade-in p-4 sm:p-6'>
					<CardHeader>
						<CardTitle className='text-center text-lg sm:text-2xl font-extrabold tracking-tight mb-2 text-indigo-700 dark:text-indigo-300'>Today&apos;s Water Goal</CardTitle>
						<p className='text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium'>
							Goal: <span className='font-bold text-indigo-600 dark:text-indigo-300'>{goal} liters</span>
						</p>
					</CardHeader>
					<CardContent>
						<div className='flex flex-col items-center gap-6'>
							<div className='w-full flex flex-col items-center gap-2'>
								<div className='w-full h-20 sm:h-24 relative mb-2 flex items-end'>
									<div className='absolute inset-0 flex items-end'>
										<svg viewBox='0 0 400 100' className='w-full h-full' preserveAspectRatio='none'>
											<defs>
												<linearGradient id='water-gradient' x1='0' y1='0' x2='0' y2='1'>
													<stop offset='0%' stopColor='#818cf8' />
													<stop offset='100%' stopColor='#6366f1' />
												</linearGradient>
											</defs>
											<path
												id='wave'
												fill='url(#water-gradient)'
												d={`
													M0,${100 - percent}
													Q50,${90 - percent * 0.7} 100,${100 - percent}
													T200,${100 - percent}
													T300,${100 - percent}
													T400,${100 - percent}
													L400,100 L0,100 Z
												`}
												style={{ transition: 'd 1s cubic-bezier(0.22,1,0.36,1)' }}
											/>
										</svg>
									</div>
									<div
										className='absolute left-0 bottom-0 h-full rounded-full pointer-events-none shimmer-mask'
										style={{ width: `${percent}%`, transition: 'width 1s cubic-bezier(0.22,1,0.36,1)' }}
									/>
									<div className='relative w-full flex justify-center items-center h-full z-10'>
										<span className='text-base sm:text-xl font-bold text-indigo-800 dark:text-indigo-100 drop-shadow-lg'>{Math.round(percent)}%</span>
									</div>
								</div>
								<p className='text-base sm:text-lg font-bold text-indigo-700 dark:text-indigo-200'>
									Drunk: {drunk} L / {goal} L
								</p>
								<p className='text-xs sm:text-base text-gray-500 dark:text-gray-400'>
									Remaining: {remaining} L
								</p>
							</div>
							<div className='flex flex-col items-center gap-2'>
								<p className='text-xs sm:text-base font-semibold text-indigo-600 dark:text-indigo-300'>
									Next drink in: <span className='font-mono'>{formatTime(timer)}</span>
								</p>
								<p className='text-xs sm:text-base font-semibold text-indigo-600 dark:text-indigo-300'>
									Per hour: <span className='font-mono'>{perHour} ml</span>
								</p>
								<Button onClick={handleDrink} className='mt-2 w-full sm:w-40 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all duration-200'>I Drank Water</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			{showConfetti && <Confetti />}
		</div>
	)
}

export default function GoalPageWrapper () {
	return (
		<>
    <Suspense>
      <GoalPage />
    </Suspense>
		</>
	)
}