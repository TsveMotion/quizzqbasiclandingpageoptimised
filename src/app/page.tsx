'use client'

import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.message || 'Something went wrong')

      setStatus('success')
      setMessage('Thank you for joining our waitlist!')
      setEmail('')

      // Reset message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe')
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 md:px-16 py-12 sm:py-16 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:16px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-800/50 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-2 sm:px-4 sm:py-2 bg-blue-500/10 rounded-full text-blue-100 text-sm font-semibold mb-4 sm:mb-6">
            🚀 Coming Soon - Join the Waitlist
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4 sm:mb-8">
            The Future of Learning is Coming
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed text-blue-100 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Be among the first to experience our AI-powered learning platform. 
            Sign up now to get early access and exclusive benefits when we launch.
          </p>
          <div className="max-w-md mx-auto mb-4 sm:mb-6 px-4 relative">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="flex-1 px-4 py-3 rounded-lg text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-white text-blue-600 text-base sm:text-lg font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          </div>
          <p className="text-sm text-blue-200 px-4">
            Be the first to know when we launch. No spam, just updates.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 px-4 sm:px-6 md:px-16 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 text-gray-900">
            Coming Soon to QuizzQ
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center mb-12 sm:mb-16 max-w-3xl mx-auto px-4">
            We're building the most advanced AI-powered learning platform. Here's what you can expect:
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4">
            <FeatureCard
              icon="🤖"
              title="24/7 AI Tutor"
              description="Get instant help from our advanced AI tutor for any subject, anytime, anywhere"
            />
            <FeatureCard
              icon="🎯"
              title="Personalized Learning"
              description="AI-driven study plans and recommendations tailored to your learning style and goals"
            />
            <FeatureCard
              icon="📝"
              title="Smart Quiz Generator"
              description="AI-generated quizzes that adapt to your level across all subjects"
            />
            <FeatureCard
              icon="📚"
              title="Past Papers & Resources"
              description="Comprehensive collection of past papers and study materials with AI-powered explanations"
            />
            <FeatureCard
              icon="💰"
              title="Affordable Learning"
              description="More cost-effective than traditional tutoring with advanced AI features for all subjects"
            />
            <FeatureCard
              icon="📱"
              title="Learn Anywhere"
              description="Access our platform on any device with our mobile-friendly interface"
            />
          </div>
        </div>
      </section>

      {/* Notification Toast */}
      {message && (
        <div 
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg transition-all duration-500 ${
            status === 'error' 
              ? 'bg-red-500 text-white' 
              : 'bg-green-500 text-white'
          } ${message ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {message}
        </div>
      )}
    </main>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
    </div>
  )
}
