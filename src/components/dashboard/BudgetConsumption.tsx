import { useTranslation } from 'react-i18next';

interface BudgetConsumptionProps {
  budgetUsed: number;
  budgetTotal: number;
}

export const BudgetConsumption = ({ budgetUsed, budgetTotal }: BudgetConsumptionProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light-bg-card dark:bg-dark-bg-card backdrop-blur-sm border border-light-border dark:border-dark-border rounded-lg p-6 transition-colors duration-300">
      <div className="text-light-text-muted dark:text-dark-text-muted text-sm mb-2">{t('dashboard.budgetConsumption')}</div>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">{budgetUsed} / {budgetTotal}</div>
        <span className="text-sm text-light-text-muted dark:text-dark-text-muted">{t('dashboard.credits')}</span>
      </div>
      <div className="w-full bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-full h-2">
        <div
          className="bg-light-accent-primary dark:bg-dark-accent-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(budgetUsed / budgetTotal) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
