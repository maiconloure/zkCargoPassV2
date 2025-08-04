import { AlertCircle, Shield, X } from 'lucide-react'
import { useState } from 'react'
import { useWeb3Auth } from '../../contexts/web3authContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const LoginModal = ({ isOpen, onClose, onSuccess }: LoginModalProps) => {
  const [error, setError] = useState('')
  const { login, isLoading } = useWeb3Auth()

  if (!isOpen) return null

  const handleWeb3AuthLogin = async () => {
    try {
      setError('')
      await login()
      // Call onSuccess after successful login
      if (onSuccess) {
        onSuccess()
      } else {
        // Fallback: close modal if no onSuccess handler
        onClose()
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Failed to login. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-light-bg-card dark:bg-dark-bg-primary border border-light-border dark:border-dark-border rounded-xl shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center mb-6">
          <div className="mr-3 bg-light-accent-primary dark:bg-dark-accent-primary rounded-md p-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>zkCargoPass Logo</title>
              <path
                d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22V16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 6L12 10L4 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 14L12 18L20 14"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Welcome Back
          </h2>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800/50 rounded-lg flex items-start gap-2">
            <AlertCircle
              size={18}
              className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0"
            />
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            Secure login with Web3Auth - choose your preferred authentication method
          </p>
        </div>

        <div className="space-y-4">
          {/* Web3Auth Login Button */}
          <button
            type="button"
            onClick={handleWeb3AuthLogin}
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-3 transition-colors ${
              isLoading
                ? 'bg-light-accent-primary/70 dark:bg-dark-accent-primary/70 text-white/70 cursor-not-allowed'
                : 'bg-light-accent-primary dark:bg-dark-accent-primary hover:bg-light-accent-secondary dark:hover:bg-dark-accent-secondary text-white'
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <title>Loading</title>
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Connecting...
              </>
            ) : (
              <>
                <Shield size={20} />
                Continue with Web3Auth
              </>
            )}
          </button>

          {/* Benefits */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Login with Google, Twitter, Discord, or Email</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Secure blockchain-based authentication</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>No need to manage private keys</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border text-center">
          <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
            By logging in, you agree to our{' '}
            <button
              type="button"
              className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors underline"
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button
              type="button"
              className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors underline"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
