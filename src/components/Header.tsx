import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import zkCargoPassLogo from '../assets/logo2.png'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  onOpenLogin: () => void
  onOpenDemo: () => void
  onOpenDuimpDemo?: () => void
}

export const Header = ({ onOpenLogin, onOpenDemo, onOpenDuimpDemo }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 bg-light-bg-primary/95 dark:bg-dark-bg-primary/95 backdrop-blur-sm border-b border-light-border dark:border-dark-border transition-colors duration-300">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="text-xl sm:text-2xl lg:text-3xl font-bold text-light-text-primary dark:text-dark-text-primary flex items-center hover:opacity-80 transition-opacity">
              <img src={zkCargoPassLogo} alt="zkCargoPass Logo" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mr-2 sm:mr-3 lg:mr-4" />
              <h1 className="font-titillium hidden xs:block">{t('header.brand')}</h1>
            </Link>
          </div>

          <nav className="hidden lg:flex space-x-4 xl:space-x-6">
            <NavItem label={t('header.features')} targetId="features" />
            <NavItem label={t('header.howItWorks')} targetId="how-it-works" />
            <NavItem label={t('header.partners')} targetId="partners" />
            <NavItem label={t('header.pricing')} targetId="pricing" />
            <Link
              to="/about"
              className="text-light-text-primary font-bold dark:text-dark-text-primary hover:text-light-text-secondary dark:hover:text-dark-text-muted transition-colors"
            >
              {t('header.aboutUs')}
            </Link>
            {/* <button
              onClick={onOpenDuimpDemo || onOpenLogin}
              className="text-light-text-primary font-bold dark:text-dark-text-primary hover:text-light-text-secondary dark:hover:text-dark-text-muted transition-colors"
            >
              Demo
            </button> */}
          </nav>
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors text-sm xl:text-base"
              onClick={onOpenLogin}
            >
              {t('common.loginButton')}
            </button>
            <button
              type="button"
              className="bg-light-accent-primary dark:bg-dark-accent-primary hover:bg-light-accent-secondary dark:hover:bg-dark-accent-secondary text-white px-3 py-2 xl:px-4 rounded-md transition-colors text-sm xl:text-base whitespace-nowrap"
              onClick={onOpenDemo}
            >
              {t('common.requestDemo')}
            </button>
          </div>
          <div className="lg:hidden flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-light-text-primary dark:text-dark-text-primary hover:text-light-text-secondary dark:hover:text-dark-text-muted transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-light-border dark:border-dark-border animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              <MobileNavItem
                label={t('header.features')}
                targetId="features"
                onClose={() => setIsMenuOpen(false)}
              />
              <MobileNavItem
                label={t('header.howItWorks')}
                targetId="how-it-works"
                onClose={() => setIsMenuOpen(false)}
              />
              <MobileNavItem
                label={t('header.partners')}
                targetId="partners"
                onClose={() => setIsMenuOpen(false)}
              />
              <MobileNavItem
                label={t('header.pricing')}
                targetId="pricing"
                onClose={() => setIsMenuOpen(false)}
              />
              <Link
                to="/about"
                className="text-light-text-primary dark:text-dark-text-primary hover:text-light-text-secondary dark:hover:text-dark-text-muted py-2 px-2 text-left transition-colors font-medium rounded-md hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.aboutUs')}
              </Link>
              <button
                className="text-light-text-primary dark:text-dark-text-primary hover:text-light-text-secondary dark:hover:text-dark-text-muted py-2 px-2 text-left transition-colors font-medium rounded-md hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary"
                onClick={() => {
                  setIsMenuOpen(false)
                  if (onOpenDuimpDemo) {
                    onOpenDuimpDemo()
                  } else {
                    onOpenLogin()
                  }
                }}
              >
                Demo
              </button>
              <div className="pt-4 border-t border-light-border dark:border-dark-border flex flex-col space-y-3">
                <button
                  type="button"
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors py-2.5 px-4 rounded-md border border-light-border dark:border-dark-border hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary font-medium w-full text-center"
                  onClick={() => {
                    setIsMenuOpen(false)
                    onOpenLogin()
                  }}
                >
                  {t('common.loginButton')}
                </button>
                <button
                  type="button"
                  className="bg-light-accent-primary dark:bg-dark-accent-primary hover:bg-light-accent-secondary dark:hover:bg-dark-accent-secondary text-white px-4 py-2.5 rounded-md transition-colors font-medium w-full text-center"
                  onClick={() => {
                    setIsMenuOpen(false)
                    onOpenDemo()
                  }}
                >
                  {t('common.requestDemo')}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

const NavItem = ({ label, targetId }: { label: string; targetId: string }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <button
      type="button"
      onClick={() => scrollToSection(targetId)}
      className="text-light-text-primary font-bold dark:text-dark-text-primary hover:text-light-text-secondary dark:hover:text-dark-text-muted transition-colors"
    >
      {label}
    </button>
  )
}

const MobileNavItem = ({
  label,
  targetId,
  onClose
}: {
  label: string;
  targetId: string;
  onClose: () => void
}) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <button
      type="button"
      className="text-light-text-primary dark:text-dark-text-primary hover:text-light-text-secondary dark:hover:text-dark-text-muted py-2 px-2 text-left transition-colors font-medium rounded-md hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary"
      onClick={() => {
        onClose()
        scrollToSection(targetId)
      }}
    >
      {label}
    </button>
  )
}
