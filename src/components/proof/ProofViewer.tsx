import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { FakeProof } from './ProofResult';

export const ProofViewer: React.FC = () => {
  const { t } = useTranslation();
  const { proofId } = useParams<{ proofId: string }>();
  const navigate = useNavigate();
  const [proof, setProof] = useState<FakeProof | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTechnicalJson, setShowTechnicalJson] = useState(false);

  useEffect(() => {
    const fetchProof = async () => {
      if (!proofId) {
        setError('No proof ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8787/api/proof/${proofId}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Proof not found');
          } else {
            setError('Failed to load proof');
          }
          setIsLoading(false);
          return;
        }

        const result = await response.json();
        setProof(result.proof);
      } catch (err) {
        console.error('Error fetching proof:', err);
        setError('Failed to load proof. Make sure the backend is running.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProof();
  }, [proofId]);

  const formatDate = (isoDate: string): string => {
    return new Date(isoDate).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const truncateHash = (hash: string): string => {
    if (hash.length <= 20) return hash;
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 10)}`;
  };

  const getDocumentTypeLabel = (type: string): string => {
    return t(`proofSimulation.documentTypes.${type}`, type);
  };

  const handleDownloadProof = () => {
    if (!proof) return;

    const dataStr = JSON.stringify(proof, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fake-proof-${proof.proofId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{t('proofSimulation.viewer.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !proof) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {error || t('proofSimulation.viewer.notFound')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('proofSimulation.viewer.notFoundMessage')}
          </p>
          <button
            onClick={() => navigate('/dashboard?tab=duimp-demo')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
          >
            {t('proofSimulation.viewer.createNewButton')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/dashboard?tab=duimp-demo')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mb-4 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('proofSimulation.step3.backButton')}
            </button>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('proofSimulation.viewer.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('proofSimulation.viewer.viewingProof')} {proofId}
            </p>
          </div>

          {/* Warning Banner */}
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ <strong>Important:</strong> {proof.disclaimer}
            </p>
          </div>

          {/* Proof Summary */}
          <div className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {t('proofSimulation.step3.proofSummary')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('proofSimulation.step3.generatedAt')} {formatDate(proof.createdAt)}
                </p>
              </div>
              <div className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full text-sm font-semibold">
                {proof.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t('proofSimulation.step3.proofId')}
                </label>
                <p className="text-lg font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-800 px-3 py-2 rounded border border-gray-200 dark:border-gray-700">
                  {proof.proofId}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t('proofSimulation.step3.duimpReference')}
                </label>
                <p className="text-lg font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-800 px-3 py-2 rounded border border-gray-200 dark:border-gray-700">
                  {proof.duimpId}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t('proofSimulation.step3.commitmentHash')}
                </label>
                <p className="text-sm font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-800 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 break-all">
                  {proof.commitmentHash}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t('proofSimulation.step3.zkSystem')}
                </label>
                <p className="text-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 px-3 py-2 rounded border border-gray-200 dark:border-gray-700">
                  {proof.zkSystem}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t('proofSimulation.step3.documentsIncluded')}
                </label>
                <p className="text-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 px-3 py-2 rounded border border-gray-200 dark:border-gray-700">
                  {proof.documents.length} {t('proofSimulation.step3.fileCount')}
                </p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('proofSimulation.step3.metadata')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t('proofSimulation.step3.cnpj')}
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {proof.metadata.cnpj}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t('proofSimulation.step3.incoterm')}
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {proof.metadata.incoterm}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t('proofSimulation.step3.customsValue')}
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(proof.metadata.customsValue)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t('proofSimulation.step3.items')}
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {proof.metadata.itemCount}
                </p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('proofSimulation.step3.documentCommitments')}
            </h3>
            <div className="space-y-3">
              {proof.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t('proofSimulation.step3.type')}: {getDocumentTypeLabel(doc.type)} • {t('proofSimulation.step3.status')}: {doc.status}
                        </p>
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">
                          {t('proofSimulation.step3.hash')}: {truncateHash(doc.hash)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical JSON */}
          <div className="mb-8">
            <button
              onClick={() => setShowTechnicalJson(!showTechnicalJson)}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              <svg
                className={`w-5 h-5 transition-transform ${showTechnicalJson ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>{t('proofSimulation.step3.technicalJson')}</span>
            </button>
            {showTechnicalJson && (
              <div className="mt-4 p-4 bg-gray-900 rounded-lg overflow-x-auto">
                <pre className="text-xs text-green-400 font-mono">
                  {JSON.stringify(proof, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Download Button */}
          <div>
            <button
              onClick={handleDownloadProof}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{t('proofSimulation.step3.downloadButton')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
