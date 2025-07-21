import React, { useState } from 'react';
import { UserCircle, Settings, LogOut, Bell, ChevronDown } from 'lucide-react';
import zkCargoPassLogo from '../../assets/zkCargoPass.png';

// Mock user data - replace with real user data later
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Administrator',
  avatar: null // Add user avatar URL here if available
};

export const DashboardHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasNotifications] = useState(true); // Mock notification state

  return (
    <header className="sticky top-0 z-50 bg-[#0a1929]/95 backdrop-blur-sm border-b border-[#172b44]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src={zkCargoPassLogo} alt="zkCargoPass Logo" className="w-6 h-6 mr-3" />
            <h1 className="text-xl font-display font-bold text-white">Dashboard</h1>
          </div>

          {/* Right side - notifications and profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-[#8badc9] hover:text-white rounded-full hover:bg-[#172b44]/50 transition-colors">
              <Bell size={20} />
              {hasNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0055ff] rounded-full"></span>
              )}
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#172b44]/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#172b44] flex items-center justify-center text-[#8badc9]">
                    {mockUser.avatar ? (
                      <img src={mockUser.avatar} alt="" className="w-8 h-8 rounded-full" />
                    ) : (
                      <UserCircle size={24} />
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">{mockUser.name}</p>
                    <p className="text-xs text-[#8badc9]">{mockUser.role}</p>
                  </div>
                  <ChevronDown size={16} className="text-[#8badc9]" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-[#0f2942] rounded-lg border border-[#172b44] shadow-xl">
                  <div className="px-4 py-2 border-b border-[#172b44]">
                    <p className="text-sm font-medium text-white">{mockUser.name}</p>
                    <p className="text-xs text-[#8badc9]">{mockUser.email}</p>
                  </div>
                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-sm text-left text-[#8badc9] hover:text-white hover:bg-[#172b44]/50 flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-left text-[#8badc9] hover:text-white hover:bg-[#172b44]/50 flex items-center space-x-2">
                      <LogOut size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
