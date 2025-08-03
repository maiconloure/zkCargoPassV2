import { useTranslation } from 'react-i18next'

export const Partnerships = () => {
  const { t } = useTranslation()

  return <section id="partners" className="w-full py-16 bg-light-bg-secondary dark:bg-dark-bg-primary transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
            {t('partnerships.title')}
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-muted max-w-2xl mx-auto">
            {t('partnerships.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PartnerCard
            name={t('partnerships.partners.federalRevenue.name')}
            role={t('partnerships.partners.federalRevenue.role')}
            description={t('partnerships.partners.federalRevenue.description')}
          />
          <PartnerCard
            name={t('partnerships.partners.serpro.name')}
            role={t('partnerships.partners.serpro.role')}
            description={t('partnerships.partners.serpro.description')}
          />
          <PartnerCard
            name={t('partnerships.partners.tradeAssociations.name')}
            role={t('partnerships.partners.tradeAssociations.role')}
            description={t('partnerships.partners.tradeAssociations.description')}
          />
        </div>
      </div>
    </section>;
};

const PartnerCard = ({
  name,
  role,
  description
}: {
  name: string;
  role: string;
  description: string;
}) => {
  return <div className="bg-light-bg-card dark:bg-dark-bg-primary/80 border border-light-border dark:border-dark-border rounded-xl p-6 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary/80 transition-colors shadow-sm">
      <div className="mb-4 h-12 flex items-center">
        <div className="bg-light-accent-muted/20 dark:bg-dark-bg-secondary px-3 py-1 rounded text-light-accent-primary dark:text-dark-text-muted text-sm inline-block">
          {role}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">{name}</h3>
      <p className="text-light-text-secondary dark:text-dark-text-muted">{description}</p>
    </div>;
};
