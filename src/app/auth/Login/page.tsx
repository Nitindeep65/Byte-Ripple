
import React from 'react'

export default function Login() {
		return (
			<main className="font-montserrat min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
				<div className="w-full max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-8 md:p-14 backdrop-blur-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center">
					<div className="mb-6 flex flex-col items-center">
						<span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg mb-2">
							<svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
						</span>
						<h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100">Login to ByteRipple</h1>
					</div>
					<form className="flex flex-col gap-6 w-full">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
							<input type="email" id="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" />
						</div>
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
							<input type="password" id="password" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your password" />
						</div>
						<button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold shadow hover:from-purple-400 hover:to-blue-400 transition-all">Login</button>
					</form>
					<div className="flex items-center w-full my-6">
						<div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
						<span className="mx-4 text-xs text-gray-400 dark:text-gray-500">or</span>
						<div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
					</div>
					<div className="flex flex-col gap-3 w-full">
						<button className="w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
							<svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.22l6.9-6.9C36.44 2.36 30.55 0 24 0 14.61 0 6.27 5.48 1.82 13.44l8.06 6.27C12.36 13.13 17.73 9.5 24 9.5z"/><path fill="#34A853" d="M46.18 24.56c0-1.64-.15-3.22-.44-4.76H24v9.04h12.44c-.54 2.9-2.18 5.36-4.64 7.04l7.18 5.59C43.73 37.36 46.18 31.44 46.18 24.56z"/><path fill="#FBBC05" d="M9.88 28.09c-1.13-3.36-1.13-6.97 0-10.33l-8.06-6.27C.64 15.36 0 19.55 0 24c0 4.45.64 8.64 1.82 12.51l8.06-6.27z"/><path fill="#EA4335" d="M24 48c6.55 0 12.44-2.16 16.9-5.89l-7.18-5.59c-2.01 1.35-4.59 2.15-7.72 2.15-6.27 0-11.64-3.63-14.12-8.94l-8.06 6.27C6.27 42.52 14.61 48 24 48z"/></g></svg>
							Continue with Google
						</button>
						<button className="w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.86 8.16 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/></svg>
							Continue with Github
						</button>
					</div>
					<div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
						Don&apos;t have an account? <a href="/auth/Signup" className="text-blue-400 dark:text-purple-400 font-semibold hover:underline">Sign up</a>
					</div>
				</div>
			</main>
	)
}
