import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { metadata as pageMetadata } from './metadata'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from "@/components/Navigation"
import { NextAuthProvider } from '@/providers/NextAuthProvider'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'QuizzQ - AI-Powered Learning Platform (Beta)',
  description: 'Join the waitlist for our revolutionary AI-powered learning platform.',
  icons: {
    icon: [
      {
        url: '/logo.png',
        href: '/logo.png',
      }
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <header className="border-b bg-white !bg-opacity-100 sticky top-0 z-50">
            <Navigation />
          </header>
          {children}
          <footer className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">QuizzQ</h3>
                  <p className="text-blue-100">
                    The future of AI-powered learning, making education accessible and personalized for everyone.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-blue-100 hover:text-white">Videos & Quizzes</a></li>
                    <li><a href="#" className="text-blue-100 hover:text-white">Exam Questions</a></li>
                    <li><a href="#" className="text-blue-100 hover:text-white">For Students</a></li>
                    <li><a href="#" className="text-blue-100 hover:text-white">For Teachers</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Contact</h3>
                  <ul className="space-y-2">
                    <li className="text-blue-100">Email: info@quizzq.com</li>
                    <li className="text-blue-100">Support: help@quizzq.com</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-blue-500/30 mt-8 pt-8 text-center text-blue-100">
                <p>&copy; {new Date().getFullYear()} QuizzQ. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  )
}
