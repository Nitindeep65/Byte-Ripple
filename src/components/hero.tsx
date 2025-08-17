import React from 'react'
import Link from 'next/link'

const Hero = () => {
	return (
		<section className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-16">
							<h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
								Connect. Chat. Collaborate.
							</h1>
							<p className="text-base text-center mb-8 text-gray-500 dark:text-gray-400 max-w-2xl">
								ByteRipple brings seamless real-time chat to your fingertips. Join conversations, share ideas, and build connections instantly.
							</p>
							<Link href="/signup" passHref>
								<span className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-8 py-3 rounded-full font-semibold text-base shadow transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700">
									Get Started
								</span>
							</Link>
							<div className="mt-12 flex flex-wrap gap-6 justify-center">
								<div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow flex flex-col items-center w-64 border border-gray-100 dark:border-gray-800">
									<svg className="w-10 h-10 mb-2 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m2-4h4a2 2 0 012 2v2a2 2 0 01-2 2h-4a2 2 0 01-2-2V6a2 2 0 012-2z" /></svg>
									<span className="font-semibold text-lg mb-1">Secure Messaging</span>
									<span className="text-gray-400 dark:text-gray-500 text-sm text-center">Your chats are encrypted and private, always.</span>
								</div>
								<div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow flex flex-col items-center w-64 border border-gray-100 dark:border-gray-800">
									<svg className="w-10 h-10 mb-2 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18z" /></svg>
									<span className="font-semibold text-lg mb-1">Group Chats</span>
									<span className="text-gray-400 dark:text-gray-500 text-sm text-center">Create groups and collaborate with your team or friends.</span>
								</div>
								<div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow flex flex-col items-center w-64 border border-gray-100 dark:border-gray-800">
									<svg className="w-10 h-10 mb-2 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
									<span className="font-semibold text-lg mb-1">Notifications</span>
									<span className="text-gray-400 dark:text-gray-500 text-sm text-center">Stay updated with instant notifications for new messages.</span>
								</div>
							</div>
		</section>
	)
}

export default Hero
