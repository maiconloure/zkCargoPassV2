import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

export interface DUIMPFormData {
  cnpj: string;
  duimpId: string;
  incoterm: string;
  customsValue: number;
  itemCount: number;
  files: FileMetadata[];
}

interface Props {
  onSubmit: (data: DUIMPFormData) => void;
  isLoading?: boolean;
}

export const DUIMPDataForm: React.FC<Props> = ({ onSubmit, isLoading = false }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<DUIMPFormData>({
    cnpj: '',
    duimpId: '',
    incoterm: 'FOB',
    customsValue: 0,
    itemCount: 0,
    files: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'customsValue' || name === 'itemCount' ? Number(value) : value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileMetadata: FileMetadata[] = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type || file.name.split('.').pop() || 'unknown'
    }));

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...fileMetadata]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate auto DUIMP ID if not provided
    const submissionData = {
      ...formData,
      duimpId: formData.duimpId || `DUIMP-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    };

    onSubmit(submissionData);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toUpperCase() || 'FILE';
  };

  return (
    <div className="w-full px-6 py-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm shadow-sm">
        {/* Compact Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
                {t('proofSimulation.step1.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('proofSimulation.step1.subtitle')}
              </p>
            </div>
            <div className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded text-xs font-medium border border-yellow-200 dark:border-yellow-800">
              {t('proofSimulation.badges.demoMode')}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Key Metrics Banner */}
          {/* <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-sm p-3">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-wide">Segurança ZK</p>
              </div>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">256-bit</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-sm p-3">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-xs font-semibold text-green-900 dark:text-green-300 uppercase tracking-wide">Tempo Médio</p>
              </div>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">~2.5s</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-sm p-3">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-xs font-semibold text-purple-900 dark:text-purple-300 uppercase tracking-wide">Conformidade</p>
              </div>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">100%</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800 rounded-sm p-3">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                <p className="text-xs font-semibold text-orange-900 dark:text-orange-300 uppercase tracking-wide">Cloud Ready</p>
              </div>
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">AWS</p>
            </div>
          </div> */}

          {/* Grid layout for horizontal organization */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* CNPJ */}
            <div>
              <label htmlFor="cnpj" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                {t('proofSimulation.step1.cnpj.label')} *
              </label>
              <input
                type="text"
                id="cnpj"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
                placeholder={t('proofSimulation.step1.cnpj.placeholder')}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* DUIMP ID */}
            <div>
              <label htmlFor="duimpId" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                {t('proofSimulation.step1.duimpId.label')}
              </label>
              <input
                type="text"
                id="duimpId"
                name="duimpId"
                value={formData.duimpId}
                onChange={handleInputChange}
                placeholder={t('proofSimulation.step1.duimpId.placeholder')}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Incoterm */}
            <div>
              <label htmlFor="incoterm" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                {t('proofSimulation.step1.incoterm.label')} *
              </label>
              <select
                id="incoterm"
                name="incoterm"
                value={formData.incoterm}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
              <option value="FOB">{t('proofSimulation.step1.incoterm.options.FOB')}</option>
              <option value="CIF">{t('proofSimulation.step1.incoterm.options.CIF')}</option>
              <option value="CFR">{t('proofSimulation.step1.incoterm.options.CFR')}</option>
              <option value="EXW">{t('proofSimulation.step1.incoterm.options.EXW')}</option>
              <option value="FCA">{t('proofSimulation.step1.incoterm.options.FCA')}</option>
              <option value="CPT">{t('proofSimulation.step1.incoterm.options.CPT')}</option>
              <option value="CIP">{t('proofSimulation.step1.incoterm.options.CIP')}</option>
              <option value="DAP">{t('proofSimulation.step1.incoterm.options.DAP')}</option>
              <option value="DPU">{t('proofSimulation.step1.incoterm.options.DPU')}</option>
              <option value="DDP">{t('proofSimulation.step1.incoterm.options.DDP')}</option>
              </select>
            </div>
          </div>

          {/* Second row - Customs value and Item count */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Customs Value */}
            <div>
              <label htmlFor="customsValue" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                {t('proofSimulation.step1.customsValue.label')}
              </label>
              <input
                type="number"
                id="customsValue"
                name="customsValue"
                value={formData.customsValue}
                onChange={handleInputChange}
                placeholder={t('proofSimulation.step1.customsValue.placeholder')}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Item Count */}
            <div>
              <label htmlFor="itemCount" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                {t('proofSimulation.step1.itemCount.label')}
              </label>
              <input
                type="number"
                id="itemCount"
                name="itemCount"
                value={formData.itemCount}
                onChange={handleInputChange}
                placeholder={t('proofSimulation.step1.itemCount.placeholder')}
                min="0"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <label htmlFor="files" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              {t('proofSimulation.step1.files.label')} *
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              {t('proofSimulation.step1.files.accepted')}
            </p>
              <input
              type="file"
              id="files"
              multiple
              accept=".xml,.pdf,.xls,.xlsx,.csv,.docx,.doc,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 text-sm border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all"
            />
          </div>

          {/* Uploaded Files List */}
          {formData.files.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                {t('proofSimulation.step1.files.uploadedFiles')} ({formData.files.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {formData.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-slate-50 dark:bg-gray-700/50 rounded-sm border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                        <span className="text-xs font-bold text-white uppercase">
                          {getFileExtension(file.name)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
            <button
              type="submit"
              disabled={isLoading || formData.files.length === 0}
              className="w-full px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-semibold rounded-sm transition-colors duration-200 disabled:cursor-not-allowed uppercase tracking-wide"
            >
              {isLoading ? t('proofSimulation.step1.processing') : t('proofSimulation.step1.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
