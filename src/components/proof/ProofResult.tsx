import React from 'react';
import { useTranslation } from 'react-i18next';

export interface FakeProof {
  proofId: string;
  duimpId: string;
  commitmentHash: string;
  zkSystem: string;
  documents: {
    name: string;
    type: string;
    hash: string;
    status: string;
  }[];
  createdAt: string;
  status: string;
  disclaimer: string;
  metadata: {
    cnpj: string;
    incoterm: string;
    customsValue: number;
    itemCount: number;
  };
}

interface Props {
  proof: FakeProof;
  onDownload: () => void;
  onCopyLink: () => void;
  onStartIntegration?: () => void;
}

export const ProofResult: React.FC<Props> = ({ proof, onDownload, onCopyLink, onStartIntegration }) => {
  const { t } = useTranslation();
  const [showTechnicalJson, setShowTechnicalJson] = React.useState(false);

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

  return (
    <div className="w-full px-6 py-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm shadow-sm">
        {/* Compact Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-slate-50 dark:from-gray-900 dark:to-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
                {t('proofSimulation.step3.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('proofSimulation.step3.subtitle')}
              </p>
            </div>
            <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded text-xs font-medium border border-green-200 dark:border-green-800">
              {proof.status}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Key Impact Metrics */}
          {/* <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 rounded-sm p-3 text-center">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-green-900 dark:text-green-300 uppercase tracking-wide mb-1">Economia</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">-70%</p>
              <p className="text-xs text-green-700 dark:text-green-500">Custos</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-sm p-3 text-center">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-wide mb-1">Velocidade</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">10x</p>
              <p className="text-xs text-blue-700 dark:text-blue-500">Mais Rápido</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-sm p-3 text-center">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-purple-900 dark:text-purple-300 uppercase tracking-wide mb-1">Segurança</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">99.9%</p>
              <p className="text-xs text-purple-700 dark:text-purple-500">Confiável</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-2 border-orange-300 dark:border-orange-700 rounded-sm p-3 text-center">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-orange-900 dark:text-orange-300 uppercase tracking-wide mb-1">Alcance</p>
              <p className="text-xl font-bold text-orange-600 dark:text-orange-400">Global</p>
              <p className="text-xs text-orange-700 dark:text-orange-500">Escalável</p>
            </div>
          </div> */}

          {/* Compact Warning */}
          {/* <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-r">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              ⚠️ <strong>{t('proofSimulation.warnings.demoPrefix')}</strong> {proof.disclaimer}
            </p>
          </div> */}

          {/* Proof Summary - Horizontal Layout */}
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-900/10 dark:to-gray-800/50 border border-blue-200 dark:border-blue-800 rounded-sm p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
              {t('proofSimulation.step3.proofSummary')}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Proof ID */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                  {t('proofSimulation.step3.proofId')}
                </label>
                <p className="text-sm font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-800 px-2.5 py-1.5 rounded-sm border border-gray-200 dark:border-gray-700">
                  {proof.proofId}
                </p>
              </div>

              {/* DUIMP Reference */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                  {t('proofSimulation.step3.duimpReference')}
                </label>
                <p className="text-sm font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-800 px-2.5 py-1.5 rounded-sm border border-gray-200 dark:border-gray-700">
                  {proof.duimpId}
                </p>
              </div>

              {/* ZK System */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                  {t('proofSimulation.step3.zkSystem')}
                </label>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 px-2.5 py-1.5 rounded-sm border border-gray-200 dark:border-gray-700">
                  {proof.zkSystem}
                </p>
              </div>

              {/* Commitment Hash - Full Width */}
              <div className="lg:col-span-3">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                  {t('proofSimulation.step3.commitmentHash')}
                </label>
                <p className="text-xs font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-800 px-2.5 py-1.5 rounded-sm border border-gray-200 dark:border-gray-700 break-all">
                  {proof.commitmentHash}
                </p>
              </div>
            </div>
          </div>

          {/* DUIMP Metadata - Compact Grid */}
          <div className="mb-6 bg-slate-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700 rounded-sm p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
              {t('proofSimulation.step3.duimpMetadata')}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-gray-700 p-3 rounded-sm border border-gray-200 dark:border-gray-600">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  {t('proofSimulation.step3.cnpj')}
                </label>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {proof.metadata.cnpj}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-3 rounded-sm border border-gray-200 dark:border-gray-600">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  {t('proofSimulation.step3.incoterm')}
                </label>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {proof.metadata.incoterm}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-3 rounded-sm border border-gray-200 dark:border-gray-600">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  {t('proofSimulation.step3.customsValue')}
                </label>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(proof.metadata.customsValue)}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-3 rounded-sm border border-gray-200 dark:border-gray-600">
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  {t('proofSimulation.step3.items')}
                </label>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {proof.metadata.itemCount}
                </p>
              </div>
            </div>
          </div>

          {/* Documents - Compact List */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
              {t('proofSimulation.step3.documentCommitments')} ({proof.documents.length})
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {proof.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-sm border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-sm flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                        {doc.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {getDocumentTypeLabel(doc.type)}
                      </p>
                      <p className="text-xs font-mono text-gray-500 dark:text-gray-400 truncate">
                        {truncateHash(doc.hash)}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical JSON Preview */}
          <div className="mb-6">
            <button
              onClick={() => setShowTechnicalJson(!showTechnicalJson)}
              className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              <svg
                className={`w-4 h-4 transition-transform ${showTechnicalJson ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>{t('proofSimulation.step3.technicalJson')}</span>
            </button>
            {showTechnicalJson && (
              <div className="mt-3 p-3 bg-gray-900 rounded-sm overflow-x-auto">
                <pre className="text-xs text-green-400 font-mono">
                  {JSON.stringify(proof, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Primary Action: Portal Único Integration */}
            {onStartIntegration && (
              <button
                onClick={onStartIntegration}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-semibold rounded-sm transition-all duration-200 shadow-md hover:shadow-lg uppercase tracking-wide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>{t('proofSimulation.step3.sendToPortalUnico')}</span>
              </button>
            )}

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onDownload}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-sm transition-colors duration-200 border border-blue-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{t('proofSimulation.step3.downloadButton')}</span>
              </button>
              <button
                onClick={onCopyLink}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-sm transition-colors duration-200 border border-green-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{t('proofSimulation.step3.copyLinkButton')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
