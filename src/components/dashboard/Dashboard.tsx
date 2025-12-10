import {
  BarChart3,
  Bell,
  CheckCircle,
  ChevronDown,
  Clock,
  Eye,
  FileText,
  LogOut,
  Menu,
  Play,
  Shield,
  Upload,
  UserCircle,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import zkCargoPassLogo from '../../assets/logo.png'
import { useAuth } from '../../contexts/AuthContext'
import { LanguageToggle } from '../LanguageToggle'
import { ThemeToggle } from '../ThemeToggle'
import { BudgetConsumption } from './BudgetConsumption'
import { DocumentHistory } from './DocumentHistory'
import { PlatformStatus } from './PlatformStatus'
import { ProofSimulationFlow } from '../proof/ProofSimulationFlow'

const mockDocs = [
  { id: 1, name: 'Invoice_123.pdf', date: '2025-07-20', status: 'Uploaded' },
  { id: 2, name: 'Manifest_456.pdf', date: '2025-07-18', status: 'Uploaded' },
]

const mockProofs = [
  { id: 1, doc: 'Invoice_123.pdf', date: '2025-07-20', type: 'Generated' },
  { id: 2, doc: 'Manifest_456.pdf', date: '2025-07-18', type: 'Verified' },
]

const mockStats = {
  totalDocuments: 0,
  activeProofs: 0,
  verifiedProofs: 0,
  savedTime: '0h',
}

const mockRecentActivity = [
  {
    id: 1,
    type: 'document',
    action: 'uploaded',
    item: 'Invoice_789.pdf',
    timestamp: '2 hours ago',
  },
  { id: 2, type: 'proof', action: 'generated', item: 'Manifest_101.pdf', timestamp: '4 hours ago' },
  { id: 3, type: 'proof', action: 'verified', item: 'Contract_202.pdf', timestamp: '1 day ago' },
  { id: 4, type: 'document', action: 'uploaded', item: 'BL_303.pdf', timestamp: '2 days ago' },
]

const platformStatus = {
  api: 'Online',
  proofs: 'Operational',
  storage: 'Online',
}

export const Dashboard = () => {
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') || 'overview'
  const [tab, setTab] = useState(initialTab)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [hasNotifications] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Mock data for budget - in real app this would come from an API
  const mockBudget = {
    budgetUsed: 0,
    budgetTotal: 1000,
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary flex transition-colors duration-300">
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 sm:w-80 lg:w-80
        bg-light-bg-card/95 dark:bg-dark-bg-card/95 backdrop-blur-sm
        border-r border-light-border dark:border-dark-border
        min-h-screen transition-all duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img src={zkCargoPassLogo} alt="zkCargoPass" className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-lg sm:text-xl font-display font-bold text-light-text-primary dark:text-dark-text-primary">
                zkCargoPass
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1.5 sm:space-y-2">
            <button
              type="button"
              onClick={() => {
                setTab('overview')
                setIsSidebarOpen(false)
              }}
              className={`group relative w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base ${
                tab === 'overview'
                  ? 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary'
                  : 'text-light-text-muted dark:text-dark-text-muted hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              <BarChart3 size={18} />
              <span>{t('dashboard.overview')}</span>
              <div className="absolute left-full ml-2 invisible group-hover:visible w-64 p-2 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg shadow-lg text-xs text-light-text-muted dark:text-dark-text-muted">
                {t('dashboard.tooltips.overview')}
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('documents')
                setIsSidebarOpen(false)
              }}
              className={`group relative w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base ${
                tab === 'documents'
                  ? 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary'
                  : 'text-light-text-muted dark:text-dark-text-muted hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              <FileText size={18} />
              <span>{t('dashboard.navigation.documents')}</span>
              <div className="absolute left-full ml-2 invisible group-hover:visible w-64 p-2 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg shadow-lg text-xs text-light-text-muted dark:text-dark-text-muted">
                {t('dashboard.tooltips.documents')}
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('proofs')
                setIsSidebarOpen(false)
              }}
              className={`group relative w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base ${
                tab === 'proofs'
                  ? 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary'
                  : 'text-light-text-muted dark:text-dark-text-muted hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              <Shield size={18} />
              <span>{t('dashboard.navigation.proofs')}</span>
              <div className="absolute left-full ml-2 invisible group-hover:visible w-64 p-2 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg shadow-lg text-xs text-light-text-muted dark:text-dark-text-muted">
                {t('dashboard.tooltips.proofs')}
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('generate')
                setIsSidebarOpen(false)
              }}
              className={`group relative w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base ${
                tab === 'generate'
                  ? 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary'
                  : 'text-light-text-muted dark:text-dark-text-muted hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              <Play size={18} />
              <span>{t('dashboard.navigation.generate')}</span>
              <div className="absolute left-full ml-2 invisible group-hover:visible w-64 p-2 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg shadow-lg text-xs text-light-text-muted dark:text-dark-text-muted">
                {t('dashboard.tooltips.generate')}
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('validate')
                setIsSidebarOpen(false)
              }}
              className={`group relative w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base ${
                tab === 'validate'
                  ? 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary'
                  : 'text-light-text-muted dark:text-dark-text-muted hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              <Eye size={18} />
              <span>{t('dashboard.navigation.validate')}</span>
              <div className="absolute left-full ml-2 invisible group-hover:visible w-64 p-2 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg shadow-lg text-xs text-light-text-muted dark:text-dark-text-muted">
                {t('dashboard.tooltips.validate')}
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('duimp-demo')
                setIsSidebarOpen(false)
              }}
              className={`group relative w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base ${
                tab === 'duimp-demo'
                  ? 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary'
                  : 'text-light-text-muted dark:text-dark-text-muted hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              <Upload size={18} />
              <span>DUIMP Demo</span>
              <div className="absolute left-full ml-2 invisible group-hover:visible w-64 p-2 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg shadow-lg text-xs text-light-text-muted dark:text-dark-text-muted">
                Generate fake DUIMP zero-knowledge proofs (demo only)
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('help')
                setIsSidebarOpen(false)
              }}
              className={`group relative w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base ${
                tab === 'help'
                  ? 'bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary'
                  : 'text-light-text-muted dark:text-dark-text-muted hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              <span>{t('dashboard.navigation.help')}</span>
              <div className="absolute left-full ml-2 invisible group-hover:visible w-64 p-2 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg shadow-lg text-xs text-light-text-muted dark:text-dark-text-muted">
                {t('dashboard.tooltips.help')}
              </div>
            </button>
          </nav>
        </div>
      </aside>

      {/* Dashboard Content */}
      <main className="flex-1 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
        <div className="flex-1 flex flex-col">
          {/* Dashboard Header */}
          <header className="sticky top-0 z-30 bg-light-bg-card/95 dark:bg-dark-bg-card/95 backdrop-blur-sm border-b border-light-border dark:border-dark-border mb-6 sm:mb-8 lg:mb-12 transition-colors duration-300 rounded-sm -mx-3 sm:-mx-4 lg:-mx-8 px-3 sm:px-4 lg:px-8">
            <div className="w-full">
              <div className="flex justify-between items-center h-14 sm:h-16">
                {/* Mobile Menu Button & Title */}
                <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-8">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden p-2 text-light-text-primary dark:text-dark-text-primary hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary rounded-lg transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu size={24} />
                  </button>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* <img src={zkCargoPassLogo} alt="zkCargoPass" className="w-6 h-6" /> */}
                    {/* <span className="text-xl font-display font-bold text-light-text-primary dark:text-dark-text-primary">Dashboard</span> */}
                  </div>

                  {/* Page Title */}
                  <div className="text-base sm:text-lg lg:text-xl font-display font-bold text-light-text-primary dark:text-dark-text-primary truncate">
                    {tab === 'overview' && t('dashboard.overview')}
                    {tab === 'documents' && t('dashboard.pages.documents')}
                    {tab === 'proofs' && t('dashboard.pages.proofs')}
                    {tab === 'generate' && t('dashboard.pages.generate')}
                    {tab === 'validate' && t('dashboard.pages.validate')}
                    {tab === 'help' && t('dashboard.pages.help')}
                  </div>
                </div>

                {/* Right Section - Notifications & Profile */}
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  {/* Language Toggle */}
                  <div className=" sm:block">
                    <LanguageToggle />
                  </div>

                  {/* Theme Toggle */}
                  <ThemeToggle />

                  {/* Notifications */}
                  {/* <button
                    type="button"
                    className="relative p-1.5 sm:p-2 text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary rounded-full hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 transition-colors"
                  >
                    <Bell size={18} className="sm:w-5 sm:h-5" />
                    {hasNotifications && (
                      <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-light-accent-primary dark:bg-dark-accent-primary rounded-full"></span>
                    )}
                  </button> */}

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 rounded-lg hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 transition-colors group"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-light-bg-secondary dark:bg-dark-bg-secondary flex items-center justify-center text-light-text-muted dark:text-dark-text-muted group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary transition-colors">
                        <UserCircle size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary truncate max-w-[120px] lg:max-w-none">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-light-text-muted dark:text-dark-text-muted truncate max-w-[120px] lg:max-w-none">
                          {user?.email || 'Authenticated'}
                        </p>
                      </div>
                      <ChevronDown
                        size={14}
                        className={`hidden sm:block text-light-text-muted dark:text-dark-text-muted transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-light-bg-card dark:bg-dark-bg-card rounded-lg border border-light-border dark:border-dark-border shadow-xl animate-fadeIn">
                        <div className="px-4 py-3 border-b border-light-border dark:border-dark-border">
                          <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary truncate">
                            {user?.name || 'User'}
                          </p>
                          <p className="text-xs text-light-text-muted dark:text-dark-text-muted truncate">
                            {user?.email || 'user@example.com'}
                          </p>
                        </div>
                        <div className="py-1">
                          {/* Language toggle for mobile in dropdown */}
                          <div className="sm:hidden px-4 py-2 border-b border-light-border dark:border-dark-border">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-light-text-muted dark:text-dark-text-muted">{t('dashboard.profile.language')}</span>
                              <LanguageToggle />
                            </div>
                          </div>
                          {/* <button type="button" className="group relative w-full px-4 py-2 text-sm text-left text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 flex items-center space-x-2 transition-colors">
                            <Settings size={16} />
                            <span>{t('dashboard.profile.settings')}</span>
                            <div className="absolute left-full ml-2 invisible group-hover:visible w-64 p-2 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg shadow-lg text-xs">
                              {t('dashboard.tooltips.settings')}
                            </div>
                          </button> */}
                          {/* <button type="button" className="group relative w-full px-4 py-2 text-sm text-left text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 flex items-center space-x-2 transition-colors">
                            <CreditCard size={16} />
                            <span>{t('dashboard.profile.budget')}</span>
                            <div className="absolute left-full ml-2 invisible group-hover:visible w-64 p-2 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg shadow-lg text-xs">
                              {t('dashboard.tooltips.budget')}
                            </div>
                          </button> */}
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="group relative w-full px-4 py-2.5 sm:py-2 text-sm text-left text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 flex items-center space-x-2 transition-colors"
                          >
                            <LogOut size={16} />
                            <span>{t('dashboard.profile.signOut')}</span>
                            <div className="hidden lg:block absolute left-full ml-2 invisible group-hover:visible w-64 p-2 bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg shadow-lg text-xs">
                              {t('dashboard.tooltips.signOut')}
                            </div>
                          </button>
                        </div>
                        {/* Budget Info */}
                        {/* <div className="px-4 py-3 border-t border-light-border dark:border-dark-border">
                          <BudgetConsumption
                            budgetUsed={mockUser.budgetUsed}
                            budgetTotal={mockUser.budgetTotal}
                          />
                        </div> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Platform Status Component */}
          {/* <PlatformStatus
            api={platformStatus.api}
            proofs={platformStatus.proofs}
            storage={platformStatus.storage}
          /> */}

          {/* Page Content */}

          {tab === 'overview' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Welcome Section */}
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                  {t('dashboard.welcome')}, {user?.name || 'User'}!
                </h1>
                <p className="text-sm sm:text-base text-light-text-muted dark:text-dark-text-muted">
                  {t('dashboard.overviewSubtitle')}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
                      +12%
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
                    {mockStats.totalDocuments}
                  </h3>
                  <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
                    {t('dashboard.stats.totalDocuments')}
                  </p>
                </div>

                <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
                      +8%
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
                    {mockStats.activeProofs}
                  </h3>
                  <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
                    {t('dashboard.stats.activeProofs')}
                  </p>
                </div>

                <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
                      +15%
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
                    {mockStats.verifiedProofs}
                  </h3>
                  <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
                    {t('dashboard.stats.verifiedProofs')}
                  </p>
                </div>

                <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
                      +20%
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
                    {mockStats.savedTime}
                  </h3>
                  <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
                    {t('dashboard.stats.savedTime')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Quick Actions */}
                <div className="lg:col-span-2">
                  <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 sm:mb-6">
                      {t('dashboard.quickActions.title')}
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="relative">
                        <button
                          type="button"
                          disabled
                          className="w-full flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-light-bg-secondary/30 dark:bg-dark-bg-secondary/30 rounded-lg transition-colors opacity-60 cursor-not-allowed"
                        >
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
                            <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="text-left flex-1 min-w-0">
                            <h3 className="font-medium text-sm sm:text-base text-light-text-primary dark:text-dark-text-primary truncate">
                              {t('dashboard.quickActions.uploadDocument')}
                            </h3>
                            <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted line-clamp-2">
                              {t('dashboard.quickActions.uploadDocumentDesc')}
                            </p>
                          </div>
                        </button>
                        <div className="absolute top-2 right-2 px-2 py-0.5 sm:py-1 bg-gray-500 dark:bg-gray-600 text-white text-[10px] sm:text-xs font-bold rounded">
                          {t('common.comingSoon')}
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          type="button"
                          disabled
                          className="w-full flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-light-bg-secondary/30 dark:bg-dark-bg-secondary/30 rounded-lg transition-colors opacity-60 cursor-not-allowed"
                        >
                          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg flex-shrink-0">
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="text-left flex-1 min-w-0">
                            <h3 className="font-medium text-sm sm:text-base text-light-text-primary dark:text-dark-text-primary truncate">
                              {t('dashboard.quickActions.generateProof')}
                            </h3>
                            <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted line-clamp-2">
                              {t('dashboard.quickActions.generateProofDesc')}
                            </p>
                          </div>
                        </button>
                        <div className="absolute top-2 right-2 px-2 py-0.5 sm:py-1 bg-gray-500 dark:bg-gray-600 text-white text-[10px] sm:text-xs font-bold rounded">
                          {t('common.comingSoon')}
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          type="button"
                          disabled
                          className="w-full flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-light-bg-secondary/30 dark:bg-dark-bg-secondary/30 rounded-lg transition-colors opacity-60 cursor-not-allowed"
                        >
                          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg flex-shrink-0">
                            <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="text-left flex-1">
                            <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                              {t('dashboard.quickActions.validateProof')}
                            </h3>
                            <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                              {t('dashboard.quickActions.validateProofDesc')}
                            </p>
                          </div>
                        </button>
                        <div className="absolute top-2 right-2 px-2 py-1 bg-gray-500 dark:bg-gray-600 text-white text-xs font-bold rounded">
                          {t('common.comingSoon')}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setTab('duimp-demo')}
                        className="flex items-center space-x-4 p-4 bg-light-bg-secondary/50 dark:bg-dark-bg-secondary/50 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary rounded-lg transition-colors group"
                      >
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                          <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                            {t('dashboard.quickActions.duimpDemo')}
                          </h3>
                          <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                            {t('dashboard.quickActions.duimpDemoDesc')}
                          </p>
                        </div>
                      </button>
{/*
                      <div className="relative">
                        <button
                          type="button"
                          disabled
                          className="w-full flex items-center space-x-4 p-4 bg-light-bg-secondary/30 dark:bg-dark-bg-secondary/30 rounded-lg transition-colors opacity-60 cursor-not-allowed"
                        >
                          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div className="text-left flex-1">
                            <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                              {t('dashboard.quickActions.viewReports')}
                            </h3>
                            <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                              {t('dashboard.quickActions.viewReportsDesc')}
                            </p>
                          </div>
                        </button>
                        <div className="absolute top-2 right-2 px-2 py-1 bg-gray-500 dark:bg-gray-600 text-white text-xs font-bold rounded">
                          {t('common.comingSoon')}
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div className="bg-light-bg-card dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                        {t('dashboard.recentActivity.title')}
                      </h2>
                      <button
                        type="button"
                        className="text-sm text-light-accent-primary dark:text-dark-accent-primary hover:text-light-accent-secondary dark:hover:text-dark-accent-secondary"
                      >
                        {t('dashboard.recentActivity.viewAll')}
                      </button>
                    </div>
                    <div className="space-y-4">
                      {mockRecentActivity.map(activity => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div
                            className={`p-1.5 rounded-full ${
                              activity.type === 'document'
                                ? 'bg-blue-100 dark:bg-blue-900'
                                : 'bg-green-100 dark:bg-green-900'
                            }`}
                          >
                            {activity.type === 'document' ? (
                              <FileText
                                className={`w-3 h-3 ${
                                  activity.type === 'document'
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-green-600 dark:text-green-400'
                                }`}
                              />
                            ) : (
                              <Shield className="w-3 h-3 text-green-600 dark:text-green-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-light-text-primary dark:text-dark-text-primary">
                              <span className="font-medium">{activity.item}</span>{' '}
                              {t(`dashboard.recentActivity.${activity.action}`)}
                            </p>
                            <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Budget Info */}
                  <div className="mt-6">
                    <BudgetConsumption
                      budgetUsed={mockBudget.budgetUsed}
                      budgetTotal={mockBudget.budgetTotal}
                    />
                  </div>

                  {/* Platform Status */}
                  <div className="mt-6">
                    <PlatformStatus
                      api={platformStatus.api}
                      proofs={platformStatus.proofs}
                      storage={platformStatus.storage}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'documents' && <DocumentHistory />}

          {tab === 'proofs' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
                {t('dashboard.tables.proofs.title')}
              </h2>
              <div className="bg-light-bg-card dark:bg-dark-bg-card backdrop-blur-sm border border-light-border dark:border-dark-border rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-light-border dark:border-dark-border">
                      <th className="py-4 px-6 text-light-text-muted dark:text-dark-text-muted font-medium">
                        {t('dashboard.tables.proofs.document')}
                      </th>
                      <th className="py-4 px-6 text-light-text-muted dark:text-dark-text-muted font-medium">
                        {t('dashboard.tables.proofs.date')}
                      </th>
                      <th className="py-4 px-6 text-light-text-muted dark:text-dark-text-muted font-medium">
                        {t('dashboard.tables.proofs.type')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProofs.map(proof => (
                      <tr
                        key={proof.id}
                        className="border-b border-light-border dark:border-dark-border last:border-b-0 hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 transition-colors"
                      >
                        <td className="py-4 px-6 text-light-text-primary dark:text-dark-text-primary">
                          {proof.doc}
                        </td>
                        <td className="py-4 px-6 text-light-text-muted dark:text-dark-text-muted">
                          {proof.date}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={
                              proof.type === 'Verified'
                                ? 'text-green-400'
                                : 'text-light-accent-primary dark:text-dark-accent-primary'
                            }
                          >
                            {t(`dashboard.status.${proof.type.toLowerCase()}`)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'generate' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
                {t('dashboard.forms.generate.title')}
              </h2>
              <div className="bg-light-bg-card dark:bg-dark-bg-card backdrop-blur-sm border border-light-border dark:border-dark-border rounded-lg p-6">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="document-select"
                      className="block text-light-text-muted dark:text-dark-text-muted text-sm mb-2"
                    >
                      {t('dashboard.forms.generate.selectDocument')}
                    </label>
                    <select
                      id="document-select"
                      className="w-full bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-lg px-4 py-2.5 text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:border-light-accent-primary dark:focus:border-dark-accent-primary"
                    >
                      <option value="">
                        {t('dashboard.forms.generate.selectDocumentPlaceholder')}
                      </option>
                      {mockDocs.map(doc => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="proof-type-select"
                      className="block text-light-text-muted dark:text-dark-text-muted text-sm mb-2"
                    >
                      {t('dashboard.forms.generate.proofType')}
                    </label>
                    <select
                      id="proof-type-select"
                      className="w-full bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-lg px-4 py-2.5 text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:border-light-accent-primary dark:focus:border-dark-accent-primary"
                    >
                      <option value="ownership">
                        {t('dashboard.forms.generate.documentOwnership')}
                      </option>
                      <option value="integrity">
                        {t('dashboard.forms.generate.documentIntegrity')}
                      </option>
                      <option value="timeline">
                        {t('dashboard.forms.generate.timelineVerification')}
                      </option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsGenerating(true)}
                    className="w-full bg-light-accent-primary dark:bg-dark-accent-primary hover:bg-light-accent-secondary dark:hover:bg-dark-accent-secondary text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                  >
                    {isGenerating
                      ? t('dashboard.forms.generate.generating')
                      : t('dashboard.forms.generate.generateButton')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === 'validate' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
                {t('dashboard.forms.validate.title')}
              </h2>
              <div className="bg-light-bg-card dark:bg-dark-bg-card backdrop-blur-sm border border-light-border dark:border-dark-border rounded-lg p-6">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="proof-select"
                      className="block text-light-text-muted dark:text-dark-text-muted text-sm mb-2"
                    >
                      {t('dashboard.forms.validate.selectProof')}
                    </label>
                    <select
                      id="proof-select"
                      className="w-full bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-lg px-4 py-2.5 text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:border-light-accent-primary dark:focus:border-dark-accent-primary"
                    >
                      <option value="">
                        {t('dashboard.forms.validate.selectProofPlaceholder')}
                      </option>
                      {mockProofs.map(proof => (
                        <option key={proof.id} value={proof.id}>
                          {proof.doc} - {t(`dashboard.status.${proof.type.toLowerCase()}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="public-input"
                      className="block text-light-text-muted dark:text-dark-text-muted text-sm mb-2"
                    >
                      {t('dashboard.forms.validate.publicInput')}
                    </label>
                    <textarea
                      id="public-input"
                      className="w-full bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-lg px-4 py-2.5 text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:border-light-accent-primary dark:focus:border-dark-accent-primary"
                      rows={4}
                      placeholder={t('dashboard.forms.validate.publicInputPlaceholder')}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsValidating(true)}
                    className="w-full bg-light-accent-primary dark:bg-dark-accent-primary hover:bg-light-accent-secondary dark:hover:bg-dark-accent-secondary text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                  >
                    {isValidating
                      ? t('dashboard.forms.validate.validating')
                      : t('dashboard.forms.validate.validateButton')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === 'duimp-demo' && (
            <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-8">
              <ProofSimulationFlow />
            </div>
          )}

          {tab === 'help' && (
            <div>
              {/* <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">{t('dashboard.support.title')}</h2> */}
              <div className="bg-light-bg-card dark:bg-dark-bg-card backdrop-blur-sm border border-light-border dark:border-dark-border rounded-lg p-6">
                <p className="text-light-text-muted dark:text-dark-text-muted mb-4">
                  {t('dashboard.support.contactText')}{' '}
                  <a
                    href={`mailto:${t('dashboard.support.email')}`}
                    className="text-light-accent-primary dark:text-dark-accent-primary hover:text-light-accent-secondary dark:hover:text-dark-accent-secondary font-medium"
                  >
                    {t('dashboard.support.email')}
                  </a>
                </p>
                {/* <p className="text-light-text-muted dark:text-dark-text-muted mb-4">
                  {t('dashboard.support.documentationText')}{' '}
                  <a href="/documentation" className="text-light-accent-primary dark:text-dark-accent-primary hover:text-light-accent-secondary dark:hover:text-dark-accent-secondary font-medium">
                    {t('dashboard.support.documentationLink')}
                  </a>{' '}
                  {t('dashboard.support.documentationSuffix')}
                </p> */}
                {/* <div className="flex items-center space-x-2">
                  <span className="text-light-text-muted dark:text-dark-text-muted">{t('dashboard.support.platformStatusText')}</span>
                  <span className="text-green-400 font-medium">{t('dashboard.support.allSystemsOperational')}</span>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
