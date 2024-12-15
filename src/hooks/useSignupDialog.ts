'use client'

import { useState } from 'react'

export function useSignupDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const openSignupDialog = () => setIsOpen(true)
  const closeSignupDialog = () => setIsOpen(false)

  return {
    isOpen,
    openSignupDialog,
    closeSignupDialog,
  }
} 