 "use client"
import Hero from '@/components/hero'
import Navbar from '@/components/Navbar'
import About from '@/components/About'
import React from 'react'
import Footer from '@/components/footer'


export default function Firstpage() {
  return (
  <main className="font-montserrat relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Decorative blurred circles for unique background */}
      <div className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] bg-blue-400/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[180px] h-[180px] bg-pink-400/10 rounded-full blur-2xl z-0 -translate-x-1/2 -translate-y-1/2"></div>
      <Navbar />
      <section className="w-full flex flex-col items-center justify-center pt-28 z-10">
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="bg-white/60 dark:bg-gray-900/60 rounded-3xl shadow-xl p-8 md:p-16 backdrop-blur-md border border-gray-200 dark:border-gray-800 transition-all duration-500">
            <Hero />
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col items-center justify-center z-10">
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="bg-white/60 dark:bg-gray-900/60 rounded-3xl shadow-xl p-8 md:p-16 backdrop-blur-md border border-gray-200 dark:border-gray-800 mt-8 transition-all duration-500">
            <About />
          </div>
        </div>
      </section>
      <div className="h-16 md:h-24" />
      <Footer />
    </main>
  )
}

