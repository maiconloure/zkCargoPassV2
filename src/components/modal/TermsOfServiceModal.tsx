import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface TermsOfServiceModalProps {
  isOpen: boolean
  onClose: () => void
}

export const TermsOfServiceModal = ({ isOpen, onClose }: TermsOfServiceModalProps) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-light-bg-primary dark:bg-dark-bg-secondary border-b border-light-border dark:border-dark-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Terms of Service
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
              1. Agreement to Terms
            </h3>
            <p>
              By accessing or using zkCargoPass, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              2. Service Description
            </h3>
            <p className="mb-3">
              zkCargoPass provides zero-knowledge proof-based cargo tracking and supply chain verification services, including:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Encrypted cargo tracking and monitoring</li>
              <li>Zero-knowledge proof generation and verification</li>
              <li>Blockchain-based immutable record keeping</li>
              <li>Supply chain transparency tools</li>
              <li>Integration APIs for enterprise systems</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              3. User Responsibilities
            </h3>
            <p className="mb-3">As a user, you agree to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Provide accurate and complete account information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the service only for lawful purposes</li>
              <li>Comply with all applicable export control and sanctions laws</li>
              <li>Not attempt to reverse engineer or compromise our security measures</li>
              <li>Report any security vulnerabilities or suspicious activities</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              4. Acceptable Use Policy
            </h3>
            <p className="mb-3">You may not use zkCargoPass to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Track illegal or prohibited goods</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malicious code or conduct cyber attacks</li>
              <li>Interfere with the operation of our services</li>
              <li>Create false or misleading tracking records</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              5. Blockchain and Cryptocurrency Terms
            </h3>
            <p className="mb-3">
              By using our blockchain-based services, you acknowledge:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Blockchain transactions are irreversible</li>
              <li>Network fees may apply for blockchain operations</li>
              <li>Service availability depends on blockchain network status</li>
              <li>You are responsible for securing your private keys and wallet access</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              6. Limitation of Liability
            </h3>
            <p>
              zkCargoPass shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities arising from your use of our services.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              7. Service Modifications
            </h3>
            <p>
              We reserve the right to modify, suspend, or discontinue our services at any time with reasonable notice. We may also update these terms periodically, and continued use constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
              8. Governing Law
            </h3>
            <p>
              These terms are governed by the laws of [Your Jurisdiction] without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration.
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
