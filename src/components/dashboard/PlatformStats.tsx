import React from 'react';
import { Activity, DollarSign, HelpCircle, Zap } from 'lucide-react';

const mockStats = {
  budget: {
    used: 850,
    total: 1000,
    currency: 'USD'
  },
  platform: {
    status: 'Operational',
    uptime: '99.99%',
    lastIncident: 'None'
  }
};

export const PlatformStats = () => {
  const budgetPercentage = (mockStats.budget.used / mockStats.budget.total) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#0f2942] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Budget Usage</h2>
          <DollarSign className="text-[#8badc9]" size={24} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#8badc9]">Used: ${mockStats.budget.used}</span>
            <span className="text-[#8badc9]">Total: ${mockStats.budget.total}</span>
          </div>
          <div className="w-full h-2 bg-[#172b44] rounded-full">
            <div
              className="h-full bg-[#0055ff] rounded-full"
              style={{ width: `${budgetPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-[#0f2942] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Platform Status</h2>
          <Activity className="text-green-400" size={24} />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#8badc9]">Status</span>
            <span className="text-green-400 font-medium">{mockStats.platform.status}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8badc9]">Uptime</span>
            <span className="text-white">{mockStats.platform.uptime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8badc9]">Last Incident</span>
            <span className="text-white">{mockStats.platform.lastIncident}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
