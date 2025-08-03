import { Clock, Lock, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DemoRequestModal } from './demo/DemoRequestModal'

interface HeroProps {
  onOpenLogin: () => void
}

export const Hero = ({ onOpenLogin }: HeroProps) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-light-bg-primary dark:bg-dark-bg-primary transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-block px-4 py-1.5 bg-light-accent-muted/20 dark:bg-dark-bg-secondary/80 rounded-full text-sm font-medium text-light-accent-primary dark:text-dark-text-muted mb-2">
              {t('hero.subtitle')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-titillium tracking-tight text-light-text-primary dark:text-dark-text-primary font-bold">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-[600px]">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                type="button"
                className="bg-light-accent-primary dark:bg-dark-accent-primary hover:bg-light-accent-secondary dark:hover:bg-dark-accent-secondary text-white px-6 py-3 rounded-md font-medium transition-colors"
                onClick={onOpenLogin}
              >
                {t('common.getStarted')}
              </button>
              <button
                type="button"
                className="bg-light-bg-secondary dark:bg-dark-bg-secondary/80 hover:bg-light-border dark:hover:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary px-6 py-3 rounded-md font-medium border border-light-border dark:border-dark-border transition-colors"
                onClick={() => setIsDemoModalOpen(true)}
              >
                {t('common.scheduleDemo')}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  className="text-light-accent-primary dark:text-dark-accent-primary"
                  size={20}
                />
                <span className="text-light-text-secondary dark:text-dark-text-secondary">
                  {t('hero.features.secureVerification')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock
                  className="text-light-accent-primary dark:text-dark-accent-primary"
                  size={20}
                />
                <span className="text-light-text-secondary dark:text-dark-text-secondary">
                  {t('hero.features.fasterClearance')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lock
                  className="text-light-accent-primary dark:text-dark-accent-primary"
                  size={20}
                />
                <span className="text-light-text-secondary dark:text-dark-text-secondary">
                  {t('hero.features.dataPrivacy')}
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-light-bg-card/70 dark:bg-dark-bg-secondary/70 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6 shadow-xl">
              <div className="bg-light-bg-secondary/80 dark:bg-dark-bg-primary/80 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-3">
                  <div className="h-3 w-3 rounded-full bg-light-accent-primary dark:bg-dark-accent-primary mr-2"></div>
                  <span className="text-sm text-light-text-secondary dark:text-dark-text-muted">
                    {t('hero.documentVerificationProcess')}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="bg-light-bg-card dark:bg-dark-bg-secondary/80 rounded p-3 flex items-start gap-3 border border-light-border dark:border-dark-border">
                    <div className="bg-light-bg-secondary dark:bg-dark-border rounded-full p-1 mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 3V7C14 7.55228 14.4477 8 15 8H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-light-text-secondary dark:text-dark-text-muted"
                        />
                        <path
                          d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-light-text-secondary dark:text-dark-text-muted"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                        {t('hero.importDeclaration')}
                      </div>
                      <div className="text-xs text-light-text-secondary dark:text-dark-text-muted">
                        DUIMP #2023-005781
                      </div>
                    </div>
                    <div className="ml-auto bg-green-100 dark:bg-green-800/20 text-green-700 dark:text-green-400 text-xs px-2 py-0.5 rounded">
                      {t('common.verified')}
                    </div>
                  </div>
                  <div className="bg-light-bg-card dark:bg-dark-bg-secondary/80 rounded p-3 flex items-start gap-3 border border-light-border dark:border-dark-border">
                    <div className="bg-light-bg-secondary dark:bg-dark-border rounded-full p-1 mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="16"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-light-text-secondary dark:text-dark-text-muted"
                        />
                        <path
                          d="M3 10H21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="text-light-text-secondary dark:text-dark-text-muted"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                        {t('hero.invoice')}
                      </div>
                      <div className="text-xs text-light-text-secondary dark:text-dark-text-muted">
                        INV-2023-1234
                      </div>
                    </div>
                    <div className="ml-auto bg-blue-100 dark:bg-dark-accent-primary/20 text-blue-700 dark:text-blue-400 text-xs px-2 py-0.5 rounded">
                      {t('common.processing')}
                    </div>
                  </div>
                  <div className="bg-light-bg-card dark:bg-dark-bg-secondary/80 rounded p-3 flex items-start gap-3 border border-light-border dark:border-dark-border">
                    <div className="bg-light-bg-secondary dark:bg-dark-border rounded-full p-1 mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-light-text-secondary dark:text-dark-text-muted"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                        {t('hero.zkProofGeneration')}
                      </div>
                      <div className="text-xs text-light-text-secondary dark:text-dark-text-muted">
                        {t('hero.generatingCryptographicProof')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-light-text-secondary dark:text-dark-text-muted mb-2">
                {t('hero.verificationProgress')}
              </div>
              <div className="w-full bg-light-bg-secondary dark:bg-dark-bg-primary/80 rounded-full h-2 mb-4">
                <div
                  className="bg-light-accent-primary dark:bg-dark-accent-primary h-2 rounded-full"
                  style={{
                    width: '65%',
                  }}
                ></div>
              </div>
              <div className="text-center text-sm text-light-text-secondary dark:text-dark-text-muted">
                {t('hero.estimatedTimeToCompletion')}{' '}
                <span className="font-medium text-light-text-primary dark:text-dark-text-primary">
                  {t('hero.minutes')}
                </span>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-light-accent-primary/10 dark:bg-dark-accent-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-light-accent-primary/10 dark:bg-dark-accent-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-light-accent-primary/10 dark:bg-dark-accent-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-light-accent-primary/10 dark:bg-dark-accent-primary/5 rounded-full blur-3xl"></div>
      </div>
      {/* Demo Modal */}
      <DemoRequestModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </section>
  )
}
