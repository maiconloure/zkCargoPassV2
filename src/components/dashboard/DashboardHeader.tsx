import { Bell, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import zkCargoPassLogo from '../../assets/zkCargoPass.png'

// Mock user data - replace with real user data later
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Administrator',
  avatar: null, // Add user avatar URL here if available
}

export const DashboardHeader = () => {
  const { t } = useTranslation()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [hasNotifications] = useState(true) // Mock notification state

  return (
    <header className="sticky top-0 z-50 bg-light-bg-primary/95 dark:bg-dark-bg-primary/95 backdrop-blur-sm border-b border-light-border dark:border-dark-border transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={zkCargoPassLogo} alt="zkCargoPass Logo" className="w-6 h-6 mr-3" />
            <h1 className="text-xl font-display font-bold text-light-text-primary dark:text-dark-text-primary">{t('dashboard.title')}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button type="button" className="relative p-2 text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary rounded-full hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 transition-colors">
              <Bell size={20} />
              {hasNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-light-accent-primary dark:bg-dark-accent-primary rounded-full"></span>
              )}
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-light-bg-secondary dark:bg-dark-bg-secondary flex items-center justify-center text-light-text-muted dark:text-dark-text-muted">
                    {mockUser.avatar ? (
                      <img src={mockUser.avatar} alt="" className="w-8 h-8 rounded-full" />
                    ) : (
                      <UserCircle size={24} />
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">{mockUser.name}</p>
                    <p className="text-xs text-light-text-muted dark:text-dark-text-muted">{mockUser.role}</p>
                  </div>
                  <ChevronDown size={16} className="text-light-text-muted dark:text-dark-text-muted" />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-light-bg-card dark:bg-dark-bg-card rounded-lg border border-light-border dark:border-dark-border shadow-xl transition-colors duration-300">
                  <div className="px-4 py-2 border-b border-light-border dark:border-dark-border">
                    <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">{mockUser.name}</p>
                    <p className="text-xs text-light-text-muted dark:text-dark-text-muted">{mockUser.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-sm text-left text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 flex items-center space-x-2 transition-colors"
                    >
                      <Settings size={16} />
                      <span>{t('dashboard.settings')}</span>
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-sm text-left text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 flex items-center space-x-2 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>{t('dashboard.signOut')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
