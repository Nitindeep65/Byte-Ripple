"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'

function Page() {
  const router = useRouter()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/Login')
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [router])
  
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-purple-900 overflow-hidden">
      <ThemeToggle />
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 animate-pulse">
            ByteRipple
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light">
            Connect. Chat. Collaborate.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 sm:mt-12">
          <Link href="/auth/Login" className="group relative w-full sm:w-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <button className="relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black dark:bg-gray-900 text-white rounded-lg leading-none flex items-center justify-center sm:divide-x divide-gray-600">
              <span className="flex items-center space-x-3 sm:space-x-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="pr-0 sm:pr-6 text-gray-100 text-base sm:text-lg font-semibold">Login Now</span>
              </span>
              <span className="hidden sm:block pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200">Go →</span>
            </button>
          </Link>
          
          <Link href="/auth/Signup" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 dark:bg-white/5 backdrop-blur-lg text-white rounded-lg border border-white/20 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 font-semibold text-base sm:text-lg">
              Create Account
            </button>
          </Link>
        </div>
        
        <div className="mt-6 sm:mt-8 text-white/60 text-xs sm:text-sm">
          Redirecting to login in 3 seconds...
        </div>
      </div>
      
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white dark:bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white dark:bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white dark:bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}

export default Page