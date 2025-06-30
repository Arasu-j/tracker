'use client'

import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface NavbarProps {
	active?: 'home' | 'remainder' | 'goal'
}

export function Navbar ({ active = 'home' }: NavbarProps) {
	return (
		<nav className='w-full flex items-center justify-between px-4 sm:px-8 py-4 bg-white/80 dark:bg-gray-900/80 pro-navbar-shadow backdrop-blur-md fixed top-0 left-0 z-10 fade-in'>
			<div className='flex items-center'>
				<Button variant='ghost' className='rounded-full p-0 h-10 w-10 focus-visible:ring-2 focus-visible:ring-indigo-400 transition-shadow'>
					<Avatar>
						<AvatarImage src='' alt='Profile' />
						<AvatarFallback>P</AvatarFallback>
					</Avatar>
				</Button>
			</div>
			<div className='flex-1 flex items-center justify-center gap-2 sm:gap-10'>
				<a href='/' className={
					`text-sm sm:text-base font-semibold px-2 sm:px-3 py-1 rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ` +
					(active === 'home'
						? 'font-extrabold text-indigo-700 dark:text-indigo-300 underline underline-offset-8 decoration-2 decoration-indigo-400 dark:decoration-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 cursor-default pointer-events-none'
						: 'text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400')
				}>
					Home
				</a>
				<a href='/remainder' className={
					`text-sm sm:text-base font-semibold px-2 sm:px-3 py-1 rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ` +
					(active === 'remainder'
						? 'font-extrabold text-indigo-700 dark:text-indigo-300 underline underline-offset-8 decoration-2 decoration-indigo-400 dark:decoration-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 cursor-default pointer-events-none'
						: 'text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400')
				}>
					Remainder
				</a>
				<a href='#' className={
					`text-sm sm:text-base font-semibold px-2 sm:px-3 py-1 rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ` +
					(active === 'goal'
						? 'font-extrabold text-indigo-700 dark:text-indigo-300 underline underline-offset-8 decoration-2 decoration-indigo-400 dark:decoration-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 cursor-default pointer-events-none'
						: 'text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400')
				}>
					Goal
				</a>
			</div>
			<div className='flex items-center'>
				<Button variant='outline' className='text-sm sm:text-base font-semibold px-3 sm:px-5 py-2 rounded-lg shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-indigo-400'>Login</Button>
			</div>
		</nav>
	)
} 