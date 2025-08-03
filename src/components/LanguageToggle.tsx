import { ChevronDown, Globe } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export const LanguageToggle = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage()

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0]

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-md hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary transition-colors"
      >
        <Globe size={18} />
        <span className="hidden sm:inline text-sm font-medium">{currentLang.flag} {currentLang.name}</span>
        <span className="sm:hidden text-sm">{currentLang.flag}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-light-bg-primary dark:bg-dark-bg-primary border border-light-border dark:border-dark-border rounded-md shadow-lg z-50">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                changeLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors ${
                currentLanguage === lang.code
                  ? 'bg-light-accent-muted/20 dark:bg-dark-accent-primary/20 text-light-accent-primary dark:text-dark-accent-primary'
                  : 'text-light-text-primary dark:text-dark-text-primary'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false)
            }
          }}
          aria-label="Close language menu"
        />
      )}
    </div>
  )
}
