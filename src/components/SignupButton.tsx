'use client'

interface SignupButtonProps {
  onClick: () => void
  className?: string
  children?: React.ReactNode
}

export default function SignupButton({ onClick, className, children = "Join Waitlist" }: SignupButtonProps) {
  return (
    <button
      onClick={onClick}
      className={className || "px-8 py-3 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"}
    >
      {children}
    </button>
  )
} 