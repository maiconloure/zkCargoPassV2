import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Pricing = () => {
  const { t } = useTranslation()

  return <section id="pricing" className="w-full py-16 bg-light-bg-primary dark:bg-dark-bg-primary transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
            {t('pricing.title')}
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-muted max-w-2xl mx-auto">
            {t('pricing.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title={t('pricing.saasEnterprise.title')}
            price={t('pricing.saasEnterprise.price')}
            period={t('pricing.saasEnterprise.period')}
            description={t('pricing.saasEnterprise.description')}
            features={t('pricing.saasEnterprise.features', { returnObjects: true }) as string[]}
            buttonText={t('common.contactSales')}
          />
          <PricingCard
            title={t('pricing.payPerProof.title')}
            price={t('pricing.payPerProof.price')}
            period={t('pricing.payPerProof.period')}
            description={t('pricing.payPerProof.description')}
            features={t('pricing.payPerProof.features', { returnObjects: true }) as string[]}
            buttonText={t('common.getStarted')}
            highlighted={true}
          />
          <PricingCard
            title={t('pricing.payPerContainer.title')}
            price={t('pricing.payPerContainer.price')}
            period={t('pricing.payPerContainer.period')}
            description={t('pricing.payPerContainer.description')}
            features={t('pricing.payPerContainer.features', { returnObjects: true }) as string[]}
            buttonText={t('common.learnMore')}
          />
        </div>
        <div className="mt-12 text-center">
          <p className="text-light-text-secondary dark:text-dark-text-muted mb-4">{t('pricing.customSolution')}</p>
          <button type="button" className="bg-light-bg-card dark:bg-dark-bg-secondary hover:bg-light-border dark:hover:bg-dark-border text-light-text-primary dark:text-dark-text-primary px-6 py-3 rounded-md font-medium border border-light-border dark:border-dark-border transition-colors">
            {t('common.contactTeam')}
          </button>
        </div>
      </div>
    </section>;
};

const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  highlighted = false
}: {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  buttonText: string
  highlighted?: boolean
}) => {
  const { t } = useTranslation()

  return <div className={`rounded-xl p-6 border relative shadow-lg ${highlighted ? 'bg-light-bg-card dark:bg-dark-bg-secondary/80 border-light-accent-primary dark:border-dark-accent-primary/50' : 'bg-light-bg-card dark:bg-dark-bg-primary/80 border-light-border dark:border-dark-border'}`}>
      {highlighted && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-light-accent-primary dark:bg-dark-accent-primary text-white text-xs font-bold px-3 py-1 rounded-full">
          {t('common.mostPopular')}
        </div>}
      <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">{price}</span>
        <span className="text-light-text-secondary dark:text-dark-text-muted">{period}</span>
      </div>
      <p className="text-light-text-secondary dark:text-dark-text-muted mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature) => <li key={feature} className="flex items-start">
            <Check size={18} className={`mr-2 mt-0.5 ${highlighted ? 'text-light-accent-secondary dark:text-blue-400' : 'text-light-accent-primary dark:text-dark-accent-primary'}`} />
            <span className="text-light-text-secondary dark:text-dark-text-secondary">{feature}</span>
          </li>)}
      </ul>
      <button
        type="button"
        className={`w-full py-2 rounded-md font-medium transition-colors ${highlighted ? 'bg-light-accent-primary dark:bg-dark-accent-primary hover:bg-light-accent-secondary dark:hover:bg-dark-accent-secondary text-white' : 'bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-border dark:hover:bg-dark-border text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border'}`}
      >
        {buttonText}
      </button>
    </div>;
};
