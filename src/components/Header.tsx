import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { LoginModal } from './auth/LoginModal';
import { DemoRequestModal } from './demo/DemoRequestModal';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  return <header className="sticky top-0 z-50 bg-[#0a1929]/95 backdrop-blur-sm border-b border-[#172b44]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white flex items-center">
              <div className="mr-2 bg-[#0055ff] rounded-md p-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 22V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 6L12 10L4 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 14L12 18L20 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              zkCargoPass
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
            <button className="text-[#8badc9] hover:text-white mr-6" onClick={() => setIsLoginModalOpen(true)}>
              Log in
            </button>
            <button className="bg-[#0055ff] hover:bg-[#0044cc] text-white px-4 py-2 rounded-md" onClick={() => setIsDemoModalOpen(true)}>
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
              setIsLoginModalOpen(true);
            }}>
                  Log in
                </button>
                <button className="bg-[#0055ff] hover:bg-[#0044cc] text-white px-4 py-2 rounded-md" onClick={() => {
              setIsMenuOpen(false);
              setIsDemoModalOpen(true);
            }}>
                  Request Demo
                </button>
              </div>
            </nav>
          </div>}
      </div>
      {/* Modals */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <DemoRequestModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
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