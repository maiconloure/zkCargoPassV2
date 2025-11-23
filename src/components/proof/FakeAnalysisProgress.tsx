import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AnalysisStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'completed';
  message?: string;
}

interface Props {
  onComplete: () => void;
}

export const FakeAnalysisProgress: React.FC<Props> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [steps, setSteps] = useState<AnalysisStep[]>([
    {
      id: 'receiving',
      label: t('proofSimulation.step2.steps.receiving'),
      status: 'pending',
    },
    {
      id: 'validating',
      label: t('proofSimulation.step2.steps.validating'),
      status: 'pending',
    },
    {
      id: 'extracting',
      label: t('proofSimulation.step2.steps.extracting'),
      status: 'pending',
    },
    {
      id: 'analyzing',
      label: t('proofSimulation.step2.steps.analyzing'),
      status: 'pending',
    },
    {
      id: 'hashing',
      label: t('proofSimulation.step2.steps.hashing'),
      status: 'pending',
    },
    {
      id: 'commitments',
      label: t('proofSimulation.step2.steps.commitments'),
      status: 'pending',
    },
    {
      id: 'circuit',
      label: t('proofSimulation.step2.steps.circuit'),
      status: 'pending',
    },
    {
      id: 'proof',
      label: t('proofSimulation.step2.steps.proof'),
      status: 'pending',
    },
    {
      id: 'verification',
      label: t('proofSimulation.step2.steps.verification'),
      status: 'pending',
    },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Simulate step-by-step progression with detailed messages
    const stepMessages = [
      t('proofSimulation.step2.stepMessages.receiving'),
      'Checking CNPJ format and validating document structure...',
      'Reading file metadata and document properties...',
      t('proofSimulation.step2.stepMessages.analyzing'),
      'Generating SHA-256 hashes for each document...',
      t('proofSimulation.step2.stepMessages.commitments'),
      'Building Merkle tree and zkSNARK circuit...',
      t('proofSimulation.step2.stepMessages.proof'),
      'Running verification checks on generated proof...',
    ];

    if (currentStepIndex < steps.length) {
      // Mark current step as processing
      setSteps(prev =>
        prev.map((step, idx) =>
          idx === currentStepIndex
            ? { ...step, status: 'processing', message: stepMessages[idx] }
            : step
        )
      );

      // Simulate processing time (2-4 seconds per step for more realistic feel)
      const delay = 2000 + Math.random() * 2000;
      const timer = setTimeout(() => {
        // Mark current step as completed
        setSteps(prev =>
          prev.map((step, idx) =>
            idx === currentStepIndex
              ? { ...step, status: 'completed' }
              : step
          )
        );

        // Move to next step
        setCurrentStepIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      // All steps completed - wait a moment then notify parent
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStepIndex, steps.length, onComplete, t]);

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
        {/* Compact Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-gray-900 dark:to-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
                {t('proofSimulation.step2.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('proofSimulation.step2.subtitle')}
              </p>
            </div>
            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-xs font-medium border border-blue-200 dark:border-blue-800">
              {t('proofSimulation.badges.processing')}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Technical Info Cards */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-sm p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-wide mb-1">Sistema ZK</p>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">zk-SNARK</p>
                  <p className="text-xs text-blue-700 dark:text-blue-500 mt-0.5">Groth16 Protocol</p>
                </div>
                <svg className="w-10 h-10 text-blue-600 dark:text-blue-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-sm p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-green-900 dark:text-green-300 uppercase tracking-wide mb-1">Privacidade</p>
                  <p className="text-sm font-bold text-green-600 dark:text-green-400">Dados Ocultos</p>
                  <p className="text-xs text-green-700 dark:text-green-500 mt-0.5">Zero Knowledge</p>
                </div>
                <svg className="w-10 h-10 text-green-600 dark:text-green-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-sm p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-purple-900 dark:text-purple-300 uppercase tracking-wide mb-1">Blockchain</p>
                  <p className="text-sm font-bold text-purple-600 dark:text-purple-400">zkVerify</p>
                  <p className="text-xs text-purple-700 dark:text-purple-500 mt-0.5">Horizen Network</p>
                </div>
                <svg className="w-10 h-10 text-purple-600 dark:text-purple-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          {/* Horizontal Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                {t('proofSimulation.step2.progress')}
              </span>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                {currentStepIndex} / {steps.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-blue-600 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(currentStepIndex / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Steps in Grid Layout - More Horizontal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center space-x-3 p-2.5 rounded-sm border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-700/30">
                <div className="flex-shrink-0">
                  {getStepIcon(step.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-xs font-semibold uppercase tracking-wide truncate ${
                    step.status === 'completed'
                      ? 'text-green-600 dark:text-green-400'
                      : step.status === 'processing'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.label}
                  </h3>
                  {step.message && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 truncate">
                      {step.message}
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
                {step.status === 'completed' && (
                  <div className="flex-shrink-0">
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
