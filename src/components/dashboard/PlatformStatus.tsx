import { Activity } from 'lucide-react';

interface PlatformStatusProps {
  api: string;
  proofs: string;
  storage: string;
}

export const PlatformStatus = ({ api, proofs, storage }: PlatformStatusProps) => {
  return (
    <div className="fixed bottom-4 right-4">
      <button type="button" className="relative group">
        <Activity className="w-6 h-6 text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors" />

        <div className="absolute bottom-full right-0 mb-2 w-64 hidden group-hover:block">
          <div className="bg-light-bg-card dark:bg-dark-bg-card backdrop-blur-sm border border-light-border dark:border-dark-border rounded-lg p-4 shadow-xl transition-colors duration-300">
            <div className="text-light-text-muted dark:text-dark-text-muted text-sm mb-4">Platform Status</div>
            <ul className="text-light-text-primary dark:text-dark-text-primary space-y-3">
              <li className="flex justify-between items-center">
                <span className="text-light-text-muted dark:text-dark-text-muted">API</span>
                <span className="text-green-400 font-medium">{api}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-light-text-muted dark:text-dark-text-muted">Proofs</span>
                <span className="text-green-400 font-medium">{proofs}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-light-text-muted dark:text-dark-text-muted">Storage</span>
                <span className="text-green-400 font-medium">{storage}</span>
              </li>
            </ul>
          </div>
        </div>
      </button>
    </div>
  );
};
