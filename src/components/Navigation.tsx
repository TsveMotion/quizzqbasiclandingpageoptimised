'use client'

import { useState } from 'react'
import Link from "next/link"
import ComingSoonButton from "./ComingSoonButton"
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Navigation() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-16 py-4 max-w-7xl mx-auto">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-bold text-3xl sm:text-4xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            QUIZZQ
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center space-x-6">
          <Link 
            href="/"
            className="text-base text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Home
          </Link>
          <ComingSoonButton label="Educational Videos" />
          <ComingSoonButton label="Exam Questions" />
          <Link 
            href="/contact"
            className="text-base text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Contact
          </Link>
        </div>
        <div className="flex gap-4 ml-4">
          {session ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="px-6 py-2.5 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 text-lg font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 text-lg font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Log In
              </Link>
              <Link 
                href="/signup" 
                className="px-6 py-2.5 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`h-0.5 w-full bg-gray-600 transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`h-0.5 w-full bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-full bg-gray-600 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      <div
        className={`absolute top-full left-0 right-0 bg-white border-b md:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-4 py-6 flex flex-col">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/"
              className="mobile-menu-item text-base text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <div className="mobile-menu-item">
              <ComingSoonButton label="Educational Videos" isMobile />
            </div>
            <div className="mobile-menu-item">
              <ComingSoonButton label="Exam Questions" isMobile />
            </div>
            <Link 
              href="/contact"
              className="mobile-menu-item text-base text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>
          </div>
          {session ? (
            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200">
              <Link
                href="/dashboard"
                className="w-full px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md text-center"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 text-base font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200">
              <Link 
                href="/login" 
                className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 text-base font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                Log In
              </Link>
              <Link 
                href="/signup" 
                className="w-full px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}