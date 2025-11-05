import { AlertCircle, Shield, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const LoginModal = ({ isOpen, onClose, onSuccess }: LoginModalProps) => {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { login, register, isLoading } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')

      if (isRegistering) {
        if (!name.trim()) {
          setError('Please enter your name')
          return
        }
        await register(email, password, name)
      } else {
        await login(email, password)
      }

      // Call onSuccess after successful login/register
      if (onSuccess) {
        onSuccess()
      } else {
        onClose()
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError(err instanceof Error ? err.message : 'Authentication failed. Please try again.')
    }
  }

  const toggleMode = () => {
    setIsRegistering(!isRegistering)
    setError('')
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
            {isRegistering ? t('auth.loginModal.createAccount') : t('auth.loginModal.welcomeBack')}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                {t('auth.loginModal.fullName')}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isRegistering}
                className="w-full px-4 py-2 bg-white dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-lg text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary"
                placeholder={t('auth.loginModal.fullNamePlaceholder')}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              {t('auth.loginModal.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-lg text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary"
              placeholder={t('auth.loginModal.emailPlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              {t('auth.loginModal.password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-2 bg-white dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-lg text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary"
              placeholder={t('auth.loginModal.passwordPlaceholder')}
            />
            {isRegistering && (
              <p className="mt-1 text-xs text-light-text-muted dark:text-dark-text-muted">
                {t('auth.loginModal.passwordMinLength')}
              </p>
            )}
          </div>

          <button
            type="submit"
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
                {isRegistering ? t('auth.loginModal.creatingAccount') : t('auth.loginModal.signingIn')}
              </>
            ) : (
              <>
                <Shield size={20} />
                {isRegistering ? t('auth.loginModal.createAccountButton') : t('auth.loginModal.signIn')}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          {/* <button
            type="button"
            onClick={toggleMode}
            className="text-sm text-light-accent-primary dark:text-dark-accent-primary hover:text-light-accent-secondary dark:hover:text-dark-accent-secondary transition-colors"
          >
            {isRegistering ? t('auth.loginModal.toggleToSignIn') : t('auth.loginModal.toggleToSignUp')}
          </button> */}
        </div>

        {/* Benefits */}
        <div className="mt-6 space-y-3">
          {/* <div className="flex items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>{t('auth.loginModal.benefits.secure')}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>{t('auth.loginModal.benefits.encrypted')}</span>
          </div> */}
          {/* <div className="flex items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>{t('auth.loginModal.benefits.blockchain')}</span>
          </div> */}
        </div>

        <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border text-center">
          <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
            {t('auth.loginModal.termsPrefix')}{' '}
            {isRegistering ? t('auth.loginModal.termsRegisterAction') : t('auth.loginModal.termsLoginAction')}
            {t('auth.loginModal.termsSuffix')}{' '}
            <button
              type="button"
              className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors underline"
            >
              {t('auth.loginModal.termsOfService')}
            </button>{' '}
            {t('auth.loginModal.and')}{' '}
            <button
              type="button"
              className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors underline"
            >
              {t('auth.loginModal.privacyPolicy')}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
