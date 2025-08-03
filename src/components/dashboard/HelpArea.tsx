import { ExternalLink, HelpCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const HelpArea = () => {
  const { t } = useTranslation()

  const helpResources = [
    {
      id: 1,
      title: t('dashboard.help.gettingStarted'),
      description: t('dashboard.help.gettingStartedDesc'),
      link: '#',
    },
    {
      id: 2,
      title: t('dashboard.help.documentation'),
      description: t('dashboard.help.documentationDesc'),
      link: '#',
    },
    {
      id: 3,
      title: t('dashboard.help.faq'),
      description: t('dashboard.help.faqDesc'),
      link: '#',
    },
  ]

  return (
    <div className="bg-light-bg-card dark:bg-dark-bg-card rounded-lg p-6 border border-light-border dark:border-dark-border transition-colors duration-300">
      <div className="flex items-center space-x-2 mb-6">
        <HelpCircle className="text-light-text-muted dark:text-dark-text-muted" size={24} />
        <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">{t('dashboard.helpResources')}</h2>
      </div>
      <div className="grid gap-4">
        {helpResources.map(resource => (
          <a
            key={resource.id}
            href={resource.link}
            className="block p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg hover:bg-light-bg-secondary/80 dark:hover:bg-dark-bg-secondary/80 border border-light-border dark:border-dark-border transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-light-text-primary dark:text-dark-text-primary font-medium mb-1">{resource.title}</h3>
                <p className="text-light-text-muted dark:text-dark-text-muted text-sm">{resource.description}</p>
              </div>
              <ExternalLink className="text-light-text-muted dark:text-dark-text-muted" size={20} />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
