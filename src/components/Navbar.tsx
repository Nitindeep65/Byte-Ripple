import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="w-full px-8 py-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-xl flex items-center justify-between fixed top-0 left-0 z-[1002] border-b border-gray-200 dark:border-gray-800">
      {/* Decorative blurred circle for navbar background */}
      <div className="absolute top-[-40px] left-[-60px] w-[180px] h-[180px] bg-blue-400/20 rounded-full blur-2xl z-0"></div>
      <div className="relative w-full flex items-center justify-between">
        <div className="font-extrabold text-2xl text-blue-400 dark:text-purple-400 tracking-wide drop-shadow">ByteRipple</div>
        <div className="flex gap-6 items-center">
          <Link href="/" passHref>
            <span className="text-gray-800 dark:text-gray-200 font-medium cursor-pointer hover:text-blue-400 dark:hover:text-purple-400 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Home</span>
          </Link>
          <Link href="/about" passHref>
            <span className="text-gray-800 dark:text-gray-200 font-medium cursor-pointer hover:text-blue-400 dark:hover:text-purple-400 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">About</span>
          </Link>
          <Link href="/features" passHref>
            <span className="text-gray-800 dark:text-gray-200 font-medium cursor-pointer hover:text-blue-400 dark:hover:text-purple-400 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Features</span>
          </Link>
          <Link href="/contact" passHref>
            <span className="text-gray-800 dark:text-gray-200 font-medium cursor-pointer hover:text-blue-400 dark:hover:text-purple-400 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Contact</span>
          </Link>
          <Link href="/auth/Login" passHref>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:from-purple-400 hover:to-blue-400 transition-all cursor-pointer border border-white/30 dark:border-gray-800/30">Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar