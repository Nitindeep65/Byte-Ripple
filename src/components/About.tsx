
import React from 'react'

const About = () => {
	return (
		<section className="max-w-3xl mx-auto px-4 py-16 text-gray-900 dark:text-gray-100">
					<h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">About ByteRipple</h2>
					<p className="text-base text-gray-500 dark:text-gray-400 mb-8 text-center">
						ByteRipple is a modern chat platform designed for seamless communication and collaboration. Our mission is to empower individuals and teams to connect, share, and innovate in a secure and user-friendly environment.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow border border-gray-100 dark:border-gray-800">
							<h3 className="font-semibold text-lg mb-2">Our Vision</h3>
							<p className="text-gray-400 dark:text-gray-500">To create a space where ideas flow freely and everyone feels heard, valued, and connected.</p>
						</div>
						<div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow border border-gray-100 dark:border-gray-800">
							<h3 className="font-semibold text-lg mb-2">Why ByteRipple?</h3>
							<ul className="list-disc pl-5 text-gray-400 dark:text-gray-500">
								<li>End-to-end encrypted messaging</li>
								<li>Intuitive and minimalistic design</li>
								<li>Real-time group and private chats</li>
								<li>Cross-platform accessibility</li>
							</ul>
						</div>
					</div>
		</section>
	)
}

export default About
