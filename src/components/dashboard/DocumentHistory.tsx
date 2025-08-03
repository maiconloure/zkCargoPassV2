import { Check, Clock, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const mockDocuments = [
  { id: 1, name: 'cargo-manifest-123.pdf', status: 'verified', date: '2025-07-20', size: '2.4 MB' },
  { id: 2, name: 'invoice-456.pdf', status: 'pending', date: '2025-07-19', size: '1.1 MB' },
  { id: 3, name: 'bill-of-lading-789.pdf', status: 'verified', date: '2025-07-18', size: '3.2 MB' },
]

export const DocumentHistory = () => {
  const { t } = useTranslation()

  return (
    <div className="bg-light-bg-card dark:bg-dark-bg-card rounded-lg p-6 border border-light-border dark:border-dark-border transition-colors duration-300">
      <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">{t('dashboard.documentHistory')}</h2>
      <div className="space-y-4">
        {mockDocuments.map(doc => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg border border-light-border dark:border-dark-border transition-colors duration-300"
          >
            <div className="flex items-center space-x-4">
              <FileText className="text-light-text-muted dark:text-dark-text-muted" size={24} />
              <div>
                <p className="text-light-text-primary dark:text-dark-text-primary font-medium">{doc.name}</p>
                <p className="text-light-text-muted dark:text-dark-text-muted text-sm">
                  {doc.size} • {doc.date}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {doc.status === 'verified' ? (
                <Check className="text-green-400" size={20} />
              ) : (
                <Clock className="text-yellow-400" size={20} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
