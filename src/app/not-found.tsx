'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import SignupDialog from '@/components/SignupDialog'

const NotFound: React.FC = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-blue-500/30 rounded-full text-blue-100 text-sm font-semibold mb-6">
            🚀 Coming Soon - Join the Waitlist
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            This page has not been developed yet
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            We're working hard to bring you amazing features. Sign up to be notified when they're ready!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg"
            >
              Back to Home
            </Link>
            <button
              onClick={() => setIsSignupOpen(true)}
              className="px-8 py-3 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </main>

      <SignupDialog 
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
    </>
  )
}

export default NotFound 