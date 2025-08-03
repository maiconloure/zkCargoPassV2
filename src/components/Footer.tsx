import { Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="w-full bg-light-bg-secondary dark:bg-dark-bg-primary border-t border-light-border dark:border-dark-border transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary flex items-center mb-4 hover:opacity-80 transition-opacity">
              <div className="mr-2 bg-light-accent-primary dark:bg-dark-accent-primary rounded-md p-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>zkCargoPass Logo</title>
                  <path
                    d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22V16"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 6L12 10L4 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 14L12 18L20 14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              zkCargoPass
            </Link>
            <p className="text-light-text-secondary dark:text-dark-text-muted mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 9H2V21H6V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              {t('footer.product')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
                >
                  {t('footer.features')}
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
                >
                  {t('footer.howItWorks')}
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
                >
                  {t('footer.pricing')}
                </a>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
                >
                  Case Studies
                </a>
              </li> */}
              {/* <li>
                <a
                  href="#"
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
                >
                  Documentation
                </a>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
                >
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <a
                  href="#partners"
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
                >
                  {t('footer.partners')}
                </a>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
                >
                  Careers
                </a>
              </li> */}
              {/* <li>
                <a
                  href="#"
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
                >
                  Blog
                </a>
              </li> */}
              <li>
                <a
                  href="#"
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
                >
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="text-light-accent-primary dark:text-dark-accent-primary mr-2 mt-0.5"
                />
                <span className="text-light-text-secondary dark:text-dark-text-muted">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-center">
                <Mail
                  size={18}
                  className="text-light-accent-primary dark:text-dark-accent-primary mr-2"
                />
                <a
                  href={`mailto:${t('footer.email')}`}
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
                >
                  {t('footer.email')}
                </a>
              </li>
              {/* <li className="flex items-center">
                <Phone
                  size={18}
                  className="text-light-accent-primary dark:text-dark-accent-primary mr-2"
                />
                <a
                  href="tel:+551399999999"
                  className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-secondary transition-colors"
                >
                  +55 99 9999-9999
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-light-text-muted dark:text-dark-text-muted mb-4 md:mb-0">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-light-text-muted dark:text-dark-text-muted hover:text-light-text-secondary dark:hover:text-dark-text-secondary text-sm transition-colors"
            >
              {t('footer.privacyPolicy')}
            </a>
            <a
              href="#"
              className="text-light-text-muted dark:text-dark-text-muted hover:text-light-text-secondary dark:hover:text-dark-text-secondary text-sm transition-colors"
            >
              {t('footer.termsOfService')}
            </a>
            <a
              href="#"
              className="text-light-text-muted dark:text-dark-text-muted hover:text-light-text-secondary dark:hover:text-dark-text-secondary text-sm transition-colors"
            >
              {t('footer.legal')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
