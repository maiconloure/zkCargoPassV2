import { AlertCircle, Check, Clock, FileText, Loader2, UploadCloud } from 'lucide-react'
import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'
import { apiClient, type Document } from '../../utils/apiClient'

const SUPPORTED_FILE_TYPES = ['xml', 'pdf', 'xls', 'xlsx', 'csv', 'jpg', 'jpeg', 'png', 'docx']
const MAX_FILE_SIZE = 10 * 1024 * 1024

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export const DocumentHistory = () => {
  const { t, i18n } = useTranslation()
  const { isAuthenticated } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState<Document['documentType']>('customs_declaration')
  const [documentNumber, setDocumentNumber] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadFeedback, setUploadFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [uploadWarnings, setUploadWarnings] = useState<string[]>([])
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null)

  const documentTypeOptions = useMemo(
    () => [
      { value: 'customs_declaration', label: t('dashboard.documentsModule.types.customs_declaration') },
      { value: 'cargo_manifest', label: t('dashboard.documentsModule.types.cargo_manifest') },
      { value: 'bill_of_lading', label: t('dashboard.documentsModule.types.bill_of_lading') },
      { value: 'invoice', label: t('dashboard.documentsModule.types.invoice') },
      { value: 'certificate', label: t('dashboard.documentsModule.types.certificate') },
      { value: 'other', label: t('dashboard.documentsModule.types.other') },
    ],
    [t],
  )

  const statusLabel = useCallback(
    (status: Document['status']) => {
      switch (status) {
        case 'verified':
          return t('dashboard.status.verified')
        case 'rejected':
          return t('dashboard.status.rejected')
        case 'processing':
          return t('dashboard.status.processing')
        default:
          return t('dashboard.status.pending')
      }
    },
    [t],
  )

  const fetchDocuments = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false)
      setDocuments([])
      setLastUpdatedAt(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { documents: fetchedDocuments } = await apiClient.getDocuments()
      setDocuments(fetchedDocuments)
      setLastUpdatedAt(new Date())
    } catch (err) {
      console.error('Failed to load documents:', err)
      setError(t('dashboard.documentsModule.errors.load'))
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated, t])

  useEffect(() => {
    void fetchDocuments()
  }, [fetchDocuments])

  const validateAndSetFile = useCallback(
    (file: File | null) => {
      if (!file) {
        setSelectedFile(null)
        return
      }

      const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
      if (!SUPPORTED_FILE_TYPES.includes(extension)) {
        setUploadFeedback({ type: 'error', message: t('dashboard.documentsModule.errors.unsupportedType') })
        setSelectedFile(null)
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        setUploadFeedback({ type: 'error', message: t('dashboard.documentsModule.errors.fileTooLarge') })
        setSelectedFile(null)
        return
      }

      setUploadFeedback(null)
      setUploadWarnings([])
      setSelectedFile(file)
    },
    [t],
  )

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    validateAndSetFile(file)
    event.target.value = ''
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0] ?? null
    validateAndSetFile(file)
  }

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
  }

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedFile) {
      setUploadFeedback({ type: 'error', message: t('dashboard.documentsModule.errors.missingFile') })
      return
    }

    if (!isAuthenticated) {
      setUploadFeedback({ type: 'error', message: t('dashboard.documentsModule.errors.requiresAuth') })
      return
    }

    setIsUploading(true)
    setUploadFeedback(null)
    setUploadWarnings([])

    try {
      const response = await apiClient.uploadDocument({
        file: selectedFile,
        documentType,
        documentNumber: documentNumber.trim() || undefined,
      })

      setUploadFeedback({
        type: 'success',
        message: response.message || t('dashboard.documentsModule.messages.uploadSuccess'),
      })
      setUploadWarnings(response.warnings ?? [])
      setSelectedFile(null)
      setDocumentNumber('')
      await fetchDocuments()
    } catch (err) {
      console.error('Upload failed:', err)
      setUploadFeedback({ type: 'error', message: t('dashboard.documentsModule.errors.upload') })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRefresh = () => {
    void fetchDocuments()
  }

  const renderStatusIcon = (status: Document['status']) => {
    if (status === 'verified') {
      return <Check className="text-green-400" size={20} />
    }

    if (status === 'rejected') {
      return <AlertCircle className="text-red-400" size={20} />
    }

    if (status === 'processing') {
      return <Loader2 className="text-light-text-muted dark:text-dark-text-muted animate-spin" size={20} />
    }

    return <Clock className="text-yellow-400" size={20} />
  }

  return (
    <div className="bg-light-bg-card dark:bg-dark-bg-card rounded-lg p-4 sm:p-6 border border-light-border dark:border-dark-border transition-colors duration-300">
      <div className="flex flex-col gap-2 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
          {t('dashboard.documentHistory')}
        </h2>
        <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
          {t('dashboard.documentsModule.description')}
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <form
          className="rounded-lg border border-light-border dark:border-dark-border bg-light-bg-secondary dark:bg-dark-bg-secondary p-4 sm:p-5 space-y-4 sm:space-y-5"
          onSubmit={handleUpload}
        >
          <div className="space-y-1 sm:space-y-2">
            <h3 className="text-base sm:text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
              {t('dashboard.documentsModule.upload.title')}
            </h3>
            <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
              {t('dashboard.documentsModule.upload.subtitle')}
            </p>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="document-upload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-light-border dark:border-dark-border bg-light-bg-primary/60 dark:bg-dark-bg-primary/60 px-4 py-6 sm:py-8 text-center cursor-pointer hover:border-light-accent-primary dark:hover:border-dark-accent-primary transition-colors"
            >
              <UploadCloud className="text-light-text-muted dark:text-dark-text-muted" size={24} />
              <span className="text-xs sm:text-sm font-medium text-light-text-primary dark:text-dark-text-primary px-2 break-words max-w-full">
                {selectedFile ? selectedFile.name : t('dashboard.documentsModule.upload.dropInstruction')}
              </span>
              <span className="text-[10px] sm:text-xs text-light-text-muted dark:text-dark-text-muted px-2">
                {selectedFile
                  ? formatFileSize(selectedFile.size)
                  : t('dashboard.documentsModule.upload.supportedTypes', {
                      types: SUPPORTED_FILE_TYPES.map(type => type.toUpperCase()).join(', '),
                    })}
              </span>
            </label>
            <input
              id="document-upload"
              type="file"
              accept={SUPPORTED_FILE_TYPES.map(type => `.${type}`).join(',')}
              className="hidden"
              onChange={handleFileInput}
            />
          </div>

          <div className="grid gap-3 sm:gap-4">
            <div className="text-left">
              <label
                htmlFor="document-type"
                className="block text-xs sm:text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1.5 sm:mb-2"
              >
                {t('dashboard.documentsModule.upload.documentType')}
              </label>
              <select
                id="document-type"
                value={documentType}
                onChange={event => setDocumentType(event.target.value as Document['documentType'])}
                className="w-full rounded-md border border-light-border dark:border-dark-border bg-light-bg-primary dark:bg-dark-bg-primary px-2.5 sm:px-3 py-2 text-xs sm:text-sm text-light-text-primary dark:text-dark-text-primary focus:border-light-accent-primary focus:outline-none focus:ring-1 focus:ring-light-accent-primary dark:focus:border-dark-accent-primary dark:focus:ring-dark-accent-primary"
              >
                {documentTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-left">
              <label
                htmlFor="document-number"
                className="block text-xs sm:text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1.5 sm:mb-2"
              >
                {t('dashboard.documentsModule.upload.documentNumber')}
              </label>
              <input
                id="document-number"
                type="text"
                value={documentNumber}
                onChange={event => setDocumentNumber(event.target.value)}
                placeholder={t('dashboard.documentsModule.upload.documentNumberPlaceholder')}
                className="w-full rounded-md border border-light-border dark:border-dark-border bg-light-bg-primary dark:bg-dark-bg-primary px-2.5 sm:px-3 py-2 text-xs sm:text-sm text-light-text-primary dark:text-dark-text-primary placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted focus:border-light-accent-primary focus:outline-none focus:ring-1 focus:ring-light-accent-primary dark:focus:border-dark-accent-primary dark:focus:ring-dark-accent-primary"
              />
            </div>
          </div>

          {uploadFeedback && (
            <div
              className={`flex items-start gap-2 rounded-md px-2.5 sm:px-3 py-2 text-xs sm:text-sm ${
                uploadFeedback.type === 'success'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}
            >
              {uploadFeedback.type === 'success' ? (
                <Check size={14} className="mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
              )}
              <span>{uploadFeedback.message}</span>
            </div>
          )}

          {uploadWarnings.length > 0 && (
            <div className="rounded-md border border-yellow-200 dark:border-yellow-500/40 bg-yellow-50 dark:bg-yellow-900/20 px-2.5 sm:px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200 space-y-1">
              <div className="font-medium">
                {t('dashboard.documentsModule.warningsTitle')}
              </div>
              <ul className="list-disc list-inside space-y-1">
                {uploadWarnings.map((warning, index) => (
                  <li key={`${warning}-${index}`}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={isUploading || !selectedFile}
            className="inline-flex items-center justify-center gap-2 w-full rounded-md bg-light-accent-primary dark:bg-dark-accent-primary px-3 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? <Loader2 className="animate-spin" size={14} /> : <UploadCloud size={14} />}
            <span>
              {isUploading
                ? t('dashboard.documentsModule.upload.uploading')
                : t('dashboard.documentsModule.upload.button')}
            </span>
          </button>

          <p className="text-[10px] sm:text-xs text-light-text-muted dark:text-dark-text-muted">
            {t('dashboard.documentsModule.upload.maxSize', {
              size: formatFileSize(MAX_FILE_SIZE),
            })}
          </p>
        </form>

        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
              {t('dashboard.documentsModule.listTitle')}
            </h3>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isLoading}
              className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors disabled:opacity-60"
            >
              {t('dashboard.documentsModule.refresh')}
            </button>
          </div>

          {error && (
            <div className="rounded-md border border-red-200 dark:border-red-500/40 bg-red-50 dark:bg-red-900/20 px-2.5 sm:px-3 py-2 text-xs sm:text-sm text-red-700 dark:text-red-200">
              {error}
            </div>
          )}

          {!isAuthenticated && !isLoading && (
            <div className="rounded-md border border-light-border dark:border-dark-border bg-light-bg-secondary dark:bg-dark-bg-secondary px-3 sm:px-4 py-5 sm:py-6 text-center text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
              {t('dashboard.documentsModule.requiresAuth')}
            </div>
          )}

          {isAuthenticated && (
            <div className="space-y-3 sm:space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-10 sm:py-12 text-light-text-muted dark:text-dark-text-muted">
                  <Loader2 className="animate-spin" size={20} />
                </div>
              ) : documents.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-lg border border-light-border dark:border-dark-border bg-light-bg-secondary dark:bg-dark-bg-secondary px-3 sm:px-4 py-8 sm:py-10 text-center">
                  <UploadCloud className="text-light-text-muted dark:text-dark-text-muted" size={28} />
                  <p className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
                    {t('dashboard.documentsModule.emptyState')}
                  </p>
                </div>
              ) : (
                documents.map(document => (
                  <div
                    key={document.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 rounded-lg border border-light-border dark:border-dark-border bg-light-bg-secondary dark:bg-dark-bg-secondary px-3 sm:px-4 py-3 sm:py-4"
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                      <FileText className="text-light-text-muted dark:text-dark-text-muted flex-shrink-0 mt-0.5 sm:mt-0" size={20} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-light-text-primary dark:text-dark-text-primary truncate">
                          {document.metadata?.originalFileName ?? document.title}
                        </p>
                        <p className="text-[10px] sm:text-xs text-light-text-muted dark:text-dark-text-muted break-words">
                          {document.documentNumber
                            ? `${t('dashboard.documentsModule.labels.documentNumber')}: ${document.documentNumber} • `
                            : ''}
                          {new Date(document.createdAt).toLocaleString(i18n.language)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                      {renderStatusIcon(document.status)}
                      <span className="text-xs sm:text-sm font-medium text-light-text-primary dark:text-dark-text-primary whitespace-nowrap">
                        {statusLabel(document.status)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {lastUpdatedAt && isAuthenticated && (
            <p className="text-[10px] sm:text-xs text-light-text-muted dark:text-dark-text-muted">
              {t('dashboard.documentsModule.lastUpdated', {
                date: lastUpdatedAt.toLocaleString(i18n.language),
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
