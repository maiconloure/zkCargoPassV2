import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
}

export const LegalModal = ({ isOpen, onClose }: LegalModalProps) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-light-bg-primary dark:bg-dark-bg-secondary border-b border-light-border dark:border-dark-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Legal Information
          </h2>
          <button
            onClick={onClose}
            className="text-light-text-secondary dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-6 text-light-text-secondary dark:text-dark-text-secondary">
          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              Company Information
            </h3>
            <div className="space-y-2">
              <p><strong>Company Name:</strong> zkCargoPass Ltd.</p>
              <p><strong>Registration Number:</strong> [Your Company Registration]</p>
              <p><strong>Registered Address:</strong> [Your Business Address]</p>
              <p><strong>Legal Contact:</strong> legal@zkcargopass.com</p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              Regulatory Compliance
            </h3>
            <p className="mb-3">
              zkCargoPass operates in compliance with applicable regulations including:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>General Data Protection Regulation (GDPR)</li>
              <li>California Consumer Privacy Act (CCPA)</li>
              <li>International Maritime Organization (IMO) guidelines</li>
              <li>Customs-Trade Partnership Against Terrorism (C-TPAT)</li>
              <li>Export Administration Regulations (EAR)</li>
              <li>Anti-Money Laundering (AML) requirements</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              Intellectual Property
            </h3>
            <p className="mb-3">
              All content, technology, and materials provided through zkCargoPass are protected by intellectual property laws:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Proprietary zero-knowledge proof algorithms</li>
              <li>Trademark: "zkCargoPass" and associated logos</li>
              <li>Copyrighted software and documentation</li>
              <li>Trade secrets and confidential methodologies</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              Open Source Components
            </h3>
            <p className="mb-3">
              zkCargoPass incorporates various open source libraries and components:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>React (MIT License)</li>
              <li>Ethereum blockchain protocols (Various licenses)</li>
              <li>cryptographic libraries (Apache 2.0, MIT)</li>
              <li>Full attribution available in our GitHub repository</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              Export Control Notice
            </h3>
            <p>
              zkCargoPass technology may be subject to export control regulations. Users are responsible for ensuring compliance with all applicable export control laws and regulations in their jurisdiction.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              Liability and Insurance
            </h3>
            <p className="mb-3">
              zkCargoPass maintains appropriate insurance coverage including:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Professional liability insurance</li>
              <li>Cyber liability and data breach coverage</li>
              <li>Errors and omissions insurance</li>
              <li>General commercial liability</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              Dispute Resolution
            </h3>
            <p>
              Legal disputes shall be resolved through binding arbitration under the rules of [Arbitration Organization]. The arbitration shall be conducted in English and the seat of arbitration shall be [Location].
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              Accessibility Statement
            </h3>
            <p>
              zkCargoPass is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience and apply relevant accessibility standards.
            </p>
          </section>

          <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
            Last updated: August 18, 2025
          </p>
        </div>
      </div>
    </div>
  )
}
