'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'

interface ComingSoonButtonProps {
  label: string
  isMobile?: boolean
}

export default function ComingSoonButton({ label, isMobile = false }: ComingSoonButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const buttonClasses = isMobile
    ? "w-full py-4 text-left text-base text-gray-700 hover:text-blue-600 font-medium"
    : "text-base text-gray-700 hover:text-blue-600 font-medium transition-colors group relative"

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={buttonClasses}
      >
        {label}
        {!isMobile && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Coming Soon
          </span>
        )}
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
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
              Get Notified When {label} Launches
            </Dialog.Title>
            <Dialog.Description className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 text-center max-w-2xl mx-auto px-4">
              Sign up to be the first to know when this feature becomes available. We'll notify you as soon as it's ready!
            </Dialog.Description>

            <form className="space-y-6 sm:space-y-8 max-w-xl sm:max-w-2xl mx-auto px-4">
              <div className="space-y-2 sm:space-y-3">
                <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <button
                  type="submit"
                  className="flex-1 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg"
                >
                  Notify Me
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
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
    </>
  )
} 