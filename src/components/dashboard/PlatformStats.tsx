import { Activity, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const mockStats = {
  budget: {
    used: 850,
    total: 1000,
    currency: 'USD'
  },
  platform: {
    status: 'Operational',
    uptime: '99.99%',
    lastIncident: 'None'
  }
};

export const PlatformStats = () => {
  const { t } = useTranslation();
  const budgetPercentage = (mockStats.budget.used / mockStats.budget.total) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div className="bg-light-bg-card dark:bg-dark-bg-card rounded-lg p-4 sm:p-6 border border-light-border dark:border-dark-border transition-colors duration-300">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">{t('dashboard.budgetUsage')}</h2>
          <DollarSign className="text-light-text-muted dark:text-dark-text-muted" size={20} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-light-text-muted dark:text-dark-text-muted">{t('dashboard.used')}: ${mockStats.budget.used}</span>
            <span className="text-light-text-muted dark:text-dark-text-muted">{t('dashboard.total')}: ${mockStats.budget.total}</span>
          </div>
          <div className="w-full h-2 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-full">
            <div
              className="h-full bg-light-accent-primary dark:bg-dark-accent-primary rounded-full"
              style={{ width: `${budgetPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-light-bg-card dark:bg-dark-bg-card rounded-lg p-4 sm:p-6 border border-light-border dark:border-dark-border transition-colors duration-300">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">{t('dashboard.platformStatus')}</h2>
          <Activity className="text-green-400" size={20} />
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">{t('dashboard.status')}</span>
            <span className="text-xs sm:text-sm text-green-400 font-medium">{t('dashboard.operational')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">{t('dashboard.uptime')}</span>
            <span className="text-xs sm:text-sm text-light-text-primary dark:text-dark-text-primary">{mockStats.platform.uptime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">{t('dashboard.lastIncident')}</span>
            <span className="text-xs sm:text-sm text-light-text-primary dark:text-dark-text-primary">{t('dashboard.none')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
