import { AlertCircle, Shield, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWeb3Auth } from '../../contexts/web3authContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const LoginModal = ({ isOpen, onClose, onSuccess }: LoginModalProps) => {
  const [error, setError] = useState('')
  const { login, isLoading } = useWeb3Auth()
  const { t } = useTranslation()

  if (!isOpen) return null

  const handleWeb3AuthLogin = async () => {
    try {
      setError('')
      await login()
      if (onSuccess) {
        onSuccess()
      } else {
        onClose()
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(t('loginModal.error'))
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
          <div className="mr-3 bg-light-accent-primary dark:bg-dark-accent-primary rounded-md p-1" />
          <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
            {t('loginModal.title')}
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
            {t('loginModal.description')}
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
                {t('loginModal.loading')}
              </>
            ) : (
              <>
                <Shield size={20} />
                {t('loginModal.button')}
              </>
            )}
          </button>

          {/* Benefits */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>{t('loginModal.benefits.google')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>{t('loginModal.benefits.secure')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>{t('loginModal.benefits.noKeys')}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border text-center">
          <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
            {t('loginModal.terms')}{' '}
            <button
              type="button"
              className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors underline"
            >
              {t('loginModal.tos')}
            </button>{' '}
            {t('loginModal.and')}{' '}
            <button
              type="button"
              className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors underline"
            >
              {t('loginModal.privacy')}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
