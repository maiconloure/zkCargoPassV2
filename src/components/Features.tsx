import { BarChart, Bot, Clock, FileCheck, Lock, Zap } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export const Features = () => {
  const { t } = useTranslation()

  return (
    <section
      id="features"
      className="w-full py-16 bg-light-bg-secondary dark:bg-dark-bg-primary transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
            {t('features.title')}
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-muted max-w-2xl mx-auto">
            {t('features.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileCheck />}
            title={t('features.simplicity.title')}
            description={t('features.simplicity.description')}
          />
          <FeatureCard
            icon={<Bot />}
            title={t('features.aiPowered.title')}
            description={t('features.aiPowered.description')}
          />
          <FeatureCard
            icon={<BarChart />}
            title={t('features.auditability.title')}
            description={t('features.auditability.description')}
          />
              <FeatureCard
            icon={<Lock />}
            title={t('features.privacy.title')}
            description={t('features.privacy.description')}
          />

          <FeatureCard
            icon={<Clock />}
            title={t('features.speed.title')}
            description={t('features.speed.description')}
          />



          {/* <FeatureCard
            icon={<Zap />}
            title={t('features.efficiency.title')}
            description={t('features.efficiency.description')}
          /> */}
        </div>
      </div>
    </section>
  )
}
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) => {
  return (
    <div className="bg-light-bg-card dark:bg-dark-bg-primary/80 border border-light-border dark:border-dark-border rounded-xl p-6 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary/80 transition-colors shadow-sm">
      <div className="bg-light-accent-muted/20 dark:bg-dark-bg-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-light-accent-primary dark:text-dark-accent-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
        {title}
      </h3>
      <p className="text-light-text-secondary dark:text-dark-text-muted">{description}</p>
    </div>
  )
}
