import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DUIMPDataForm, type DUIMPFormData } from './DUIMPDataForm';
import { FakeAnalysisProgress } from './FakeAnalysisProgress';
import { ProofResult, type FakeProof } from './ProofResult';
import { PortalUnicoIntegration } from './PortalUnicoIntegration';

type FlowStep = 'form' | 'analysis' | 'result' | 'integration';

export const ProofSimulationFlow: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<FlowStep>('form');
  const [proof, setProof] = useState<FakeProof | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleFormSubmit = async (data: DUIMPFormData) => {
    setIsSubmitting(true);

    try {
      // Call backend API to generate fake proof
      const response = await fetch('http://localhost:8787/api/proof/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate proof');
      }

      const result = await response.json();
      setProof(result.proof);

      // Move to analysis step
      setCurrentStep('analysis');
    } catch (error) {
      console.error('Error generating proof:', error);
      showToastMessage('Error: Failed to generate proof. Make sure the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnalysisComplete = () => {
    setCurrentStep('result');
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

    showToastMessage(t('proofSimulation.step3.toastMessages.downloaded'));
  };

  const handleCopyLink = () => {
    if (!proof) return;

    const fakeUrl = `https://demo.cargopass.app/proofs/${proof.proofId}`;
    navigator.clipboard.writeText(fakeUrl).then(() => {
      showToastMessage(t('proofSimulation.step3.toastMessages.linkCopied'));
    }).catch(() => {
      showToastMessage(t('proofSimulation.step3.toastMessages.linkFailed'));
    });
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleReset = () => {
    setCurrentStep('form');
    setProof(null);
    setIsSubmitting(false);
  };

  const handleStartIntegration = () => {
    setCurrentStep('integration');
  };

  const handleIntegrationComplete = () => {
    setCurrentStep('result');
    showToastMessage(t('portalUnicoIntegration.success.title'));
  };

  const handleCancelIntegration = () => {
    setCurrentStep('result');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}

      {/* Step indicator */}
      <div className="max-w-4xl mx-auto mb-8 px-6">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center ${currentStep === 'form' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              currentStep === 'form' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white dark:bg-gray-800'
            }`}>
              1
            </div>
            <span className="ml-2 font-medium hidden sm:inline">{t('proofSimulation.flowSteps.dataInput')}</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300" />
          <div className={`flex items-center ${currentStep === 'analysis' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              currentStep === 'analysis' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white dark:bg-gray-800'
            }`}>
              2
            </div>
            <span className="ml-2 font-medium hidden sm:inline">{t('proofSimulation.flowSteps.analysis')}</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300" />
          <div className={`flex items-center ${currentStep === 'result' || currentStep === 'integration' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              currentStep === 'result' || currentStep === 'integration' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white dark:bg-gray-800'
            }`}>
              3
            </div>
            <span className="ml-2 font-medium hidden sm:inline">{t('proofSimulation.flowSteps.result')}</span>
          </div>
          {currentStep === 'integration' && (
            <>
              <div className="w-16 h-0.5 bg-gray-300" />
              <div className="flex items-center text-purple-600 dark:text-purple-400">
                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-purple-600 bg-purple-600 text-white">
                  4
                </div>
                <span className="ml-2 font-medium hidden sm:inline">{t('proofSimulation.flowSteps.integration')}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Render current step */}
      {currentStep === 'form' && (
        <DUIMPDataForm onSubmit={handleFormSubmit} isLoading={isSubmitting} />
      )}

      {currentStep === 'analysis' && (
        <FakeAnalysisProgress onComplete={handleAnalysisComplete} />
      )}

      {currentStep === 'integration' && proof && (
        <PortalUnicoIntegration
          proofId={proof.proofId}
          onComplete={handleIntegrationComplete}
          onCancel={handleCancelIntegration}
        />
      )}

      {currentStep === 'result' && proof && (
        <>
          <ProofResult
            proof={proof}
            onDownload={handleDownloadProof}
            onCopyLink={handleCopyLink}
            onStartIntegration={handleStartIntegration}
          />
          <div className="max-w-6xl mx-auto px-6 mt-6">
                      <button
            onClick={handleReset}
            className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors duration-200"
          >
            {t('proofSimulation.step3.startNewButton')}
          </button>
          </div>
        </>
      )}
    </div>
  );
};
