import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import zkCargoPassLogo from '../assets/zkCargoPass.png';

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenDemo: () => void;
}

export const Header = ({ onOpenLogin, onOpenDemo }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="sticky top-0 z-50 bg-[#0a1929]/95 backdrop-blur-sm border-b border-[#172b44]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white flex items-center">
              <img src={zkCargoPassLogo} alt="zkCargoPass Logo" className="w-6 h-6 mr-4" />
              <h1 className="font-display">zkCargoPass</h1>
            </div>
          </div>
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-10">
            <NavItem label="Features" />
            <NavItem label="How It Works" />
            <NavItem label="Partners" />
            <NavItem label="Pricing" />
          </nav>
          <div className="hidden md:flex items-center">
            <button className="text-[#8badc9] hover:text-white mr-6" onClick={onOpenLogin}>
              Log in
            </button>
            <button className="bg-[#0055ff] hover:bg-[#0044cc] text-white px-4 py-2 rounded-md" onClick={onOpenDemo}>
              Request Demo
            </button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-[#8badc9]">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile navigation */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-[#172b44]">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-white hover:text-[#8badc9] py-2" onClick={() => setIsMenuOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" className="text-white hover:text-[#8badc9] py-2" onClick={() => setIsMenuOpen(false)}>
                How It Works
              </a>
              <a href="#partners" className="text-white hover:text-[#8badc9] py-2" onClick={() => setIsMenuOpen(false)}>
                Partners
              </a>
              <a href="#pricing" className="text-white hover:text-[#8badc9] py-2" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </a>
              <div className="pt-4 border-t border-[#172b44] flex flex-col space-y-4">
                <button className="text-[#8badc9] hover:text-white" onClick={() => {
                  setIsMenuOpen(false);
                  onOpenLogin();
                }}>
                  Log in
                </button>
                <button className="bg-[#0055ff] hover:bg-[#0044cc] text-white px-4 py-2 rounded-md" onClick={() => {
                  setIsMenuOpen(false);
                  onOpenDemo();
                }}>
                  Request Demo
                </button>
              </div>
            </nav>
          </div>}
      </div>
      {/* Modals moved to App.tsx */}
    </header>;
};
const NavItem = ({
  label
}: {
  label: string;
}) => {
  return <a href={`#${label.toLowerCase().replace(/\s+/g, '-')}`} className="text-white hover:text-[#8badc9]">
      {label}
    </a>;
};