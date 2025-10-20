import {
  AlertCircle,
  Building,
  Calendar,
  Check,
  Mail,
  Phone,
  User,
  X,
} from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sendDemoRequestEmail } from '../../utils/emailService'

interface DemoRequestModalProps {
  isOpen: boolean
  onClose: () => void
}

export const DemoRequestModal = ({
  isOpen,
  onClose,
}: DemoRequestModalProps) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    demoType: 'live',
    date: '',
    message: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  if (!isOpen) return null
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (
      !formData.name ||
      !formData.email ||
      !formData.company
    ) {
      setError(t('demoRequest.errors.requiredFields'))
      return
    }
    setIsLoading(true)

    try {
      // Send email using EmailJS
      await sendDemoRequestEmail({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      })

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('demoRequest.errors.sendFailed'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-10">
      <div className="relative w-full max-w-2xl p-6 bg-light-bg-card dark:bg-dark-bg-primary border border-light-border dark:border-dark-border rounded-xl shadow-2xl m-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
        >
          <X size={20} />
        </button>
        {!isSubmitted ? (
          <>
            <div className="flex items-center mb-6">
              <div className="mr-3 bg-light-accent-primary dark:bg-dark-accent-primary rounded-md p-1">
                <Calendar size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">{t('demoRequest.title')}</h2>
            </div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
              {t('demoRequest.description')}
            </p>
            {error && (
              <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800/50 rounded-lg flex items-start gap-2">
                <AlertCircle
                  size={18}
                  className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0"
                />
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"
                  >
                    {t('demoRequest.form.name.label')} <span className="text-light-accent-primary dark:text-dark-accent-primary">{t('demoRequest.form.required')}</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={18} className="text-light-text-muted dark:text-dark-text-muted" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-light-bg-secondary dark:bg-dark-bg-primary border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary rounded-lg block w-full pl-10 p-2.5 placeholder-light-text-muted dark:placeholder-dark-text-muted/70 focus:outline-none focus:ring-1 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary focus:border-light-accent-primary dark:focus:border-dark-accent-primary transition-colors"
                      placeholder={t('demoRequest.form.name.placeholder')}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"
                  >
                    {t('demoRequest.form.company.label')} <span className="text-light-accent-primary dark:text-dark-accent-primary">{t('demoRequest.form.required')}</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Building size={18} className="text-light-text-muted dark:text-dark-text-muted" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-light-bg-secondary dark:bg-dark-bg-primary border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary rounded-lg block w-full pl-10 p-2.5 placeholder-light-text-muted dark:placeholder-dark-text-muted/70 focus:outline-none focus:ring-1 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary focus:border-light-accent-primary dark:focus:border-dark-accent-primary transition-colors"
                      placeholder={t('demoRequest.form.company.placeholder')}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"
                  >
                    {t('demoRequest.form.email.label')} <span className="text-light-accent-primary dark:text-dark-accent-primary">{t('demoRequest.form.required')}</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail size={18} className="text-light-text-muted dark:text-dark-text-muted" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-light-bg-secondary dark:bg-dark-bg-primary border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary rounded-lg block w-full pl-10 p-2.5 placeholder-light-text-muted dark:placeholder-dark-text-muted/70 focus:outline-none focus:ring-1 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary focus:border-light-accent-primary dark:focus:border-dark-accent-primary transition-colors"
                      placeholder={t('demoRequest.form.email.placeholder')}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"
                  >
                    {t('demoRequest.form.phone.label')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone size={18} className="text-light-text-muted dark:text-dark-text-muted" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-light-bg-secondary dark:bg-dark-bg-primary border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary rounded-lg block w-full pl-10 p-2.5 placeholder-light-text-muted dark:placeholder-dark-text-muted/70 focus:outline-none focus:ring-1 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary focus:border-light-accent-primary dark:focus:border-dark-accent-primary transition-colors"
                      placeholder={t('demoRequest.form.phone.placeholder')}
                    />
                  </div>
                </div>
              </div>
              {/* <div>
                <label
                  htmlFor="demoType"
                  className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"
                >
                  Demo Type <span className="text-light-accent-primary dark:text-dark-accent-primary">*</span>
                </label>
                <select
                  id="demoType"
                  name="demoType"
                  value={formData.demoType}
                  onChange={handleChange}
                  className="bg-light-bg-secondary dark:bg-dark-bg-primary border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary focus:border-light-accent-primary dark:focus:border-dark-accent-primary transition-colors"
                >
                  <option value="live">
                    Live Demo with Product Specialist
                  </option>
                  <option value="recorded">Recorded Demo + Q&A Session</option>
                  <option value="custom">Custom Demo for Enterprise</option>
                </select>
              </div> */}
              {/* <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"
                >
                  Preferred Date <span className="text-light-accent-primary dark:text-dark-accent-primary">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="bg-light-bg-secondary dark:bg-dark-bg-primary border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary focus:border-light-accent-primary dark:focus:border-dark-accent-primary transition-colors"
                />
              </div> */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1"
                >
                  {t('demoRequest.form.message.label')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-light-bg-secondary dark:bg-dark-bg-primary border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary rounded-lg block w-full p-2.5 placeholder-light-text-muted dark:placeholder-dark-text-muted/70 focus:outline-none focus:ring-1 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary focus:border-light-accent-primary dark:focus:border-dark-accent-primary transition-colors"
                  placeholder={t('demoRequest.form.message.placeholder')}
                ></textarea>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg font-medium flex justify-center transition-colors ${isLoading ? 'bg-light-accent-primary/70 dark:bg-dark-accent-primary/70 text-white/70 cursor-not-allowed' : 'bg-light-accent-primary dark:bg-dark-accent-primary hover:bg-light-accent-secondary dark:hover:bg-dark-accent-secondary text-white'}`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <title>Loading...</title>
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    t('demoRequest.form.submit')
                  )}
                </button>
              </div>
            </form>
            {/* <div className="mt-6 text-center">
              <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
                By submitting this form, you agree to our{' '}
                <a href="#" className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors">
                  Privacy Policy
                </a>
              </p>
            </div> */}
          </>
        ) : (
          <div className="text-center py-10">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <Check size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              {t('demoRequest.success.title')}
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 max-w-md mx-auto">
              {t('demoRequest.success.message')}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-light-accent-primary dark:bg-dark-accent-primary hover:bg-light-accent-secondary dark:hover:bg-dark-accent-secondary text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              {t('demoRequest.success.button')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
