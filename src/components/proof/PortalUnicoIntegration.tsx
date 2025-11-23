import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IntegrationStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  message?: string;
  details?: string;
}

interface Props {
  proofId: string;
  onComplete: () => void;
  onCancel: () => void;
}

export const PortalUnicoIntegration: React.FC<Props> = ({ proofId, onComplete, onCancel }) => {
  const { t } = useTranslation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<IntegrationStep[]>([
    {
      id: 'authentication',
      label: t('portalUnicoIntegration.steps.authentication'),
      status: 'pending',
    },
    {
      id: 'validation',
      label: t('portalUnicoIntegration.steps.validation'),
      status: 'pending',
    },
    {
      id: 'formatting',
      label: t('portalUnicoIntegration.steps.formatting'),
      status: 'pending',
    },
    {
      id: 'transmission',
      label: t('portalUnicoIntegration.steps.transmission'),
      status: 'pending',
    },
    {
      id: 'receiptVerification',
      label: t('portalUnicoIntegration.steps.receiptVerification'),
      status: 'pending',
    },
    {
      id: 'protocolGeneration',
      label: t('portalUnicoIntegration.steps.protocolGeneration'),
      status: 'pending',
    },
  ]);

  const [protocolNumber, setProtocolNumber] = useState('');
  const [integrationComplete, setIntegrationComplete] = useState(false);

  useEffect(() => {
    if (currentStepIndex < steps.length && !integrationComplete) {
      const stepMessages: { [key: string]: { message: string; details: string } } = {
        authentication: {
          message: t('portalUnicoIntegration.messages.authentication'),
          details: 'OAuth 2.0 • Certificado Digital A1',
        },
        validation: {
          message: t('portalUnicoIntegration.messages.validation'),
          details: 'Schema XSD 2.0 • Proof Format Validation',
        },
        formatting: {
          message: t('portalUnicoIntegration.messages.formatting'),
          details: 'XML Structure • ZK Proof Attachment',
        },
        transmission: {
          message: t('portalUnicoIntegration.messages.transmission'),
          details: 'HTTPS • TLS 1.3 • serpro.gov.br',
        },
        receiptVerification: {
          message: t('portalUnicoIntegration.messages.receiptVerification'),
          details: 'Recibo Digital • Timestamp • Hash Validation',
        },
        protocolGeneration: {
          message: t('portalUnicoIntegration.messages.protocolGeneration'),
          details: 'Protocolo de Recepção Gerado',
        },
      };

      // Mark current step as processing
      setSteps((prevSteps) =>
        prevSteps.map((step, idx) =>
          idx === currentStepIndex
            ? {
                ...step,
                status: 'processing',
                message: stepMessages[step.id]?.message,
                details: stepMessages[step.id]?.details
              }
            : step
        )
      );

      // Simulate processing time (1.5-3 seconds per step)
      const delay = Math.random() * 1500 + 1500;

      const timer = setTimeout(() => {
        // Mark current step as completed
        setSteps((prevSteps) =>
          prevSteps.map((step, idx) =>
            idx === currentStepIndex ? { ...step, status: 'completed' } : step
          )
        );

        // Generate protocol number on last step
        if (currentStepIndex === steps.length - 1) {
          const protocol = `PU-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Math.floor(Math.random() * 10000)}`;
          setProtocolNumber(protocol);
          setIntegrationComplete(true);
        } else {
          setCurrentStepIndex((prev) => prev + 1);
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, steps.length, integrationComplete, t]);

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'processing':
        return (
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        );
      case 'error':
        return (
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
          </div>
        );
    }
  };

  return (
    <div className="w-full px-6 py-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
                {t('portalUnicoIntegration.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('portalUnicoIntegration.subtitle')}
              </p>
            </div>
            <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded text-xs font-medium border border-purple-200 dark:border-purple-800">
              {integrationComplete ? t('portalUnicoIntegration.badges.completed') : t('portalUnicoIntegration.badges.integrating')}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Integration Statistics */}
          <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-sm p-3 text-center">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-wide mb-1">Criptografia</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">TLS 1.3</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-sm p-3 text-center">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-green-900 dark:text-green-300 uppercase tracking-wide mb-1">Certificado</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">A1/A3</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-sm p-3 text-center">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-purple-900 dark:text-purple-300 uppercase tracking-wide mb-1">Latência</p>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">&lt;100ms</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 rounded-sm p-3 text-center">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-orange-900 dark:text-orange-300 uppercase tracking-wide mb-1">Servidor</p>
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">GOV.BR</p>
            </div>
          </div>

          {/* Proof ID Reference */}
          <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {t('portalUnicoIntegration.proofReference')}
                </p>
                <p className="text-sm font-mono text-gray-900 dark:text-white mt-1">
                  {proofId}
                </p>
              </div>
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                {t('portalUnicoIntegration.progress')}
              </span>
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                {integrationComplete ? steps.length : currentStepIndex} / {steps.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((integrationComplete ? steps.length : currentStepIndex) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Integration Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-start space-x-3 p-3 rounded-sm border ${
                  step.status === 'completed'
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                    : step.status === 'processing'
                    ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
                    : 'bg-slate-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getStepIcon(step.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-xs font-semibold uppercase tracking-wide ${
                      step.status === 'completed'
                        ? 'text-green-600 dark:text-green-400'
                        : step.status === 'processing'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step.label}
                  </h3>
                  {step.message && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {step.message}
                    </p>
                  )}
                  {step.details && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5 font-mono">
                      {step.details}
                    </p>
                  )}
                </div>
                {step.status === 'processing' && (
                  <div className="flex-shrink-0">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Protocol Result */}
          {integrationComplete && protocolNumber && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-200 dark:border-green-800 rounded-sm">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 uppercase tracking-wide">
                    {t('portalUnicoIntegration.success.title')}
                  </h3>
                  <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                    {t('portalUnicoIntegration.success.message')}
                  </p>
                  <div className="mt-3 p-2 bg-white dark:bg-gray-800 rounded-sm border border-green-200 dark:border-green-700">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      {t('portalUnicoIntegration.protocolNumber')}
                    </p>
                    <p className="text-sm font-mono text-gray-900 dark:text-white mt-1 font-semibold">
                      {protocolNumber}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{new Date().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mb-6 p-3 bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-400 dark:border-purple-600 rounded-r">
            <p className="text-xs text-purple-800 dark:text-purple-200">
              ℹ️ <strong>{t('portalUnicoIntegration.disclaimer.prefix')}</strong> {t('portalUnicoIntegration.disclaimer.message')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            {!integrationComplete ? (
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm font-semibold rounded-sm transition-colors uppercase tracking-wide"
              >
                {t('portalUnicoIntegration.buttons.cancel')}
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(protocolNumber);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-sm transition-colors uppercase tracking-wide"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>{t('portalUnicoIntegration.buttons.copyProtocol')}</span>
                </button>
                <button
                  onClick={onComplete}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-sm transition-colors uppercase tracking-wide"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('portalUnicoIntegration.buttons.continue')}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
