import React from 'react'
import Link from 'next/link'
function page() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 to-purple-400 overflow-hidden">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8 drop-shadow-lg transition-transform duration-700 scale-110">
        Welcome to ByteRipple
      </h1>
      <p className="text-center mb-12 text-white/80 text-lg font-medium drop-shadow">
        Your one-stop solution for all things tech.
      </p>
      {/* Arrow outside the Get Started box */}
      <span className="fixed bottom-32 left-1/2 -translate-x-1/2 text-3xl text-white z-[1001] pointer-events-none drop-shadow-lg">
        ↑
      </span>
      <Link href="/Firstpage" passHref>
        <span
          className="fixed bottom-10 items-center-translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg border-2 border-dotted border-white animate-float z-[1000] cursor-pointer transition-all duration-300 hover:bg-white hover:text-purple-400 hover:shadow-2xl hover:scale-110"
        >
          Lets Start
        </span>
      </Link>
      <style>{`
        @keyframes float {
          0% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-20px); }
          100% { transform: translateX(-50%) translateY(0); }
        }
        .animate-float {
          animation: float 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default page