import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-light-bg-primary dark:bg-dark-bg-secondary border-b border-light-border dark:border-dark-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Privacy Policy
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
              1. Information We Collect
            </h3>
            <p className="mb-3">
              zkCargoPass collects information to provide and improve our zero-knowledge proof-based cargo tracking services:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Account information (name, email, company details)</li>
              <li>Cargo tracking data (encrypted and anonymized)</li>
              <li>Transaction records on supported blockchains</li>
              <li>Usage analytics and performance metrics</li>
              <li>Communication preferences and support interactions</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              2. How We Use Your Information
            </h3>
            <p className="mb-3">We use collected information to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Provide cargo tracking and verification services</li>
              <li>Generate zero-knowledge proofs for supply chain validation</li>
              <li>Maintain platform security and prevent fraud</li>
              <li>Improve our services and develop new features</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              3. Data Protection and Privacy
            </h3>
            <p className="mb-3">
              Our zero-knowledge architecture ensures maximum privacy protection:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Cargo details are encrypted and never stored in plaintext</li>
              <li>Zero-knowledge proofs validate information without revealing sensitive data</li>
              <li>Blockchain records contain only cryptographic hashes</li>
              <li>Access controls limit data visibility to authorized parties only</li>
              <li>Regular security audits and penetration testing</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              4. Data Sharing and Disclosure
            </h3>
            <p className="mb-3">
              We do not sell or rent your personal information. We may share data only:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>With trusted service providers under strict confidentiality agreements</li>
              <li>In anonymized form for research and analytics</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              5. Your Rights
            </h3>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Access and review your personal data</li>
              <li>Request corrections to inaccurate information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Opt-out of non-essential communications</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              6. Contact Information
            </h3>
            <p>
              For privacy-related questions or requests, contact us at: privacy@zkcargopass.com
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
