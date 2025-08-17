
import React from 'react'

const Footer = () => {
	return (
	<footer className="font-montserrat w-full  bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center relative z-10">
			{/* Decorative blurred circle for footer background */}
			<div className="absolute bottom-[-40px] right-[-60px] w-[180px] h-[180px] bg-purple-400/20 rounded-full blur-2xl z-0"></div>
			<div className="relative w-full flex flex-col items-center">
				<div className="w-full px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
					<div className="flex flex-col items-start">
						<span className="font-extrabold text-2xl text-gray-700 dark:text-gray-200 mb-2">ByteRipple</span>
						<span className="text-gray-500 dark:text-gray-400 text-sm mb-4">Modern chat platform for seamless communication and collaboration.</span>
						<div className="flex gap-4 mt-2">
							<a href="#" className="text-gray-500 hover:text-blue-400 transition-colors" aria-label="Twitter"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.48v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg></a>
							<a href="#" className="text-gray-500 hover:text-blue-400 transition-colors" aria-label="Github"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" /></svg></a>
							<a href="#" className="text-gray-500 hover:text-blue-400 transition-colors" aria-label="LinkedIn"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" /><rect width="4" height="12" x="2" y="9" rx="2" /></svg></a>
						</div>
					</div>
					<div className="flex flex-col items-end text-right">
						<span className="text-gray-500 dark:text-gray-400 text-sm mb-2">&copy; {new Date().getFullYear()} ByteRipple. All rights reserved.</span>
						<span className="text-gray-400 dark:text-gray-500 text-xs">Made with <span className="text-pink-400">♥</span> by ByteRipple Team</span>
					</div>
				</div>
			</div>
		</footer>
	)
}
export default Footer

