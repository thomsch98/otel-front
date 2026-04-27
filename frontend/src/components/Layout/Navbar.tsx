import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { apiClient } from '../../services/api'

interface NavbarProps {
  onResetComplete?: () => void
}

export function Navbar({ onResetComplete }: NavbarProps) {
  const location = useLocation()
  const [isResetting, setIsResetting] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const handleReset = async () => {
    setIsResetting(true)
    try {
      await apiClient.resetData()
      onResetComplete?.()
    } catch (error) {
      console.error('Failed to reset telemetry data:', error)
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">
                OTEL Viewer
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? 'border-blue-500 text-blue-200'
                    : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/traces"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/traces')
                    ? 'border-blue-500 text-blue-200'
                    : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                }`}
              >
                Traces
              </Link>
              <Link
                to="/logs"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/logs')
                    ? 'border-blue-500 text-blue-200'
                    : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                }`}
              >
                Logs
              </Link>
              <Link
                to="/metrics"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/metrics')
                    ? 'border-blue-500 text-blue-200'
                    : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                }`}
              >
                Metrics
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <button
              type="button"
              onClick={handleReset}
              disabled={isResetting}
              className="inline-flex items-center rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-200 hover:bg-red-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isResetting ? 'Resetting...' : 'Reset'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
