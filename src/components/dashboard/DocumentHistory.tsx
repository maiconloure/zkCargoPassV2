import React from 'react';
import { FileText, Check, Clock } from 'lucide-react';

// Mock data - replace with actual data in production
const mockDocuments = [
  { id: 1, name: 'cargo-manifest-123.pdf', status: 'verified', date: '2025-07-20', size: '2.4 MB' },
  { id: 2, name: 'invoice-456.pdf', status: 'pending', date: '2025-07-19', size: '1.1 MB' },
  { id: 3, name: 'bill-of-lading-789.pdf', status: 'verified', date: '2025-07-18', size: '3.2 MB' },
];

export const DocumentHistory = () => {
  return (
    <div className="bg-[#0f2942] rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Document History</h2>
      <div className="space-y-4">
        {mockDocuments.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 bg-[#172b44] rounded-lg">
            <div className="flex items-center space-x-4">
              <FileText className="text-[#8badc9]" size={24} />
              <div>
                <p className="text-white font-medium">{doc.name}</p>
                <p className="text-[#8badc9] text-sm">{doc.size} • {doc.date}</p>
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
  );
};
