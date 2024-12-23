'use client'

import { Dialog } from '@headlessui/react'
import { useState } from 'react'

interface SignupDialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export default function SignupDialog({ 
  isOpen, 
  onClose,
  title = "Be the First to Know When We Launch",
  description = "Sign up to get early access and exclusive benefits when we launch!"
}: SignupDialogProps) {
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
      setTimeout(() => onClose(), 2000) // Close dialog after 2 seconds
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe')
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Dialog.Panel className="mx-auto w-full max-w-[90%] sm:max-w-2xl md:max-w-4xl rounded-2xl bg-white p-6 sm:p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]">
          <div className="text-center mb-6 sm:mb-8">
            <span className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-500/10 text-blue-600 rounded-full text-sm sm:text-base font-semibold">
              🚀 Coming Soon - Join the Waitlist
            </span>
          </div>
          <Dialog.Title className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center px-4">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 text-center max-w-2xl mx-auto px-4">
            {description}
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 max-w-xl sm:max-w-2xl mx-auto px-4">
            <div className="space-y-2 sm:space-y-3">
              <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
                required
              />
            </div>
            
            {message && (
              <p className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-green-600'} text-center`}>
                {message}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-base sm:text-lg"
              >
                Cancel
              </button>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4 sm:mt-6">
              We respect your privacy. You can unsubscribe at any time.
            </p>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 