import { ReactNode } from 'react'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: ReactNode
  onResetComplete?: () => void
}

export function Layout({ children, onResetComplete }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onResetComplete={onResetComplete} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
