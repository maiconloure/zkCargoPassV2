import { ArrowLeft, Award, Globe, Target, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export const AboutUs = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary text-light-text-primary dark:text-dark-text-primary transition-colors duration-300">
      <Header onOpenLogin={() => {}} onOpenDemo={() => {}} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-light-accent-primary dark:text-dark-accent-primary hover:text-light-accent-secondary dark:hover:text-dark-accent-secondary transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            {t('aboutUs.backToHome')}
          </Link>
        </div>

        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-light-accent-primary to-light-accent-secondary dark:from-dark-accent-primary dark:to-dark-accent-secondary bg-clip-text text-transparent">
            {t('aboutUs.title')}
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-muted max-w-3xl mx-auto leading-relaxed">
            {t('aboutUs.subtitle')}
          </p>
        </section>

        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Target
                  className="mr-3 text-light-accent-primary dark:text-dark-accent-primary"
                  size={32}
                />
                {t('aboutUs.mission.title')}
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-muted text-lg leading-relaxed mb-4">
                {t('aboutUs.mission.description1')}
              </p>
              <p className="text-light-text-secondary dark:text-dark-text-muted text-lg leading-relaxed">
                {t('aboutUs.mission.description2')}
              </p>
            </div>
            <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">{t('aboutUs.benefits.title')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-light-accent-primary dark:bg-dark-accent-primary mt-2 mr-3 flex-shrink-0"></span>
                  <span>{t('aboutUs.benefits.privacy')}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-light-accent-primary dark:bg-dark-accent-primary mt-2 mr-3 flex-shrink-0"></span>
                  <span>{t('aboutUs.benefits.transparency')}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-light-accent-primary dark:bg-dark-accent-primary mt-2 mr-3 flex-shrink-0"></span>
                  <span>{t('aboutUs.benefits.compliance')}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-light-accent-primary dark:bg-dark-accent-primary mt-2 mr-3 flex-shrink-0"></span>
                  <span>{t('aboutUs.benefits.costs')}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <Users
                className="mr-3 text-light-accent-primary dark:text-dark-accent-primary"
                size={32}
              />
              {t('aboutUs.team.title')}
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-muted text-lg max-w-2xl mx-auto">
              {t('aboutUs.team.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-light-accent-primary to-light-accent-secondary dark:from-dark-accent-primary dark:to-dark-accent-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('aboutUs.team.blockchain.title')}</h3>
              <p className="text-light-text-secondary dark:text-dark-text-muted">
                {t('aboutUs.team.blockchain.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-light-accent-primary to-light-accent-secondary dark:from-dark-accent-primary dark:to-dark-accent-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Globe size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('aboutUs.team.logistics.title')}</h3>
              <p className="text-light-text-secondary dark:text-dark-text-muted">
                {t('aboutUs.team.logistics.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-light-accent-primary to-light-accent-secondary dark:from-dark-accent-primary dark:to-dark-accent-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('aboutUs.team.privacy.title')}</h3>
              <p className="text-light-text-secondary dark:text-dark-text-muted">
                {t('aboutUs.team.privacy.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-12">{t('aboutUs.values.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-light-accent-primary dark:bg-dark-accent-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('aboutUs.values.privacy.title')}</h3>
                <p className="text-light-text-secondary dark:text-dark-text-muted text-sm">
                  {t('aboutUs.values.privacy.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-light-accent-primary dark:bg-dark-accent-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('aboutUs.values.innovation.title')}</h3>
                <p className="text-light-text-secondary dark:text-dark-text-muted text-sm">
                  {t('aboutUs.values.innovation.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-light-accent-primary dark:bg-dark-accent-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('aboutUs.values.trust.title')}</h3>
                <p className="text-light-text-secondary dark:text-dark-text-muted text-sm">
                  {t('aboutUs.values.trust.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-light-accent-primary dark:bg-dark-accent-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('aboutUs.values.excellence.title')}</h3>
                <p className="text-light-text-secondary dark:text-dark-text-muted text-sm">
                  {t('aboutUs.values.excellence.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-light-accent-primary to-light-accent-secondary dark:from-dark-accent-primary dark:to-dark-accent-secondary rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">{t('aboutUs.cta.title')}</h2>
            <p className="text-xl mb-8 opacity-90">
              {t('aboutUs.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-white text-light-accent-primary dark:text-dark-accent-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('aboutUs.cta.exploreFeatures')}
              </Link>
              <button
                type="button"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-light-accent-primary dark:hover:text-dark-accent-primary transition-colors"
              >
                {t('aboutUs.cta.contactUs')}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
