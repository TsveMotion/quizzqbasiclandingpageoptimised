import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QuizzQ - AI-Powered Learning Platform",
  description: "Revolutionary AI-powered GCSE science tuition platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <Navigation />
        </header>
        {children}
      </body>
    </html>
  )
}
