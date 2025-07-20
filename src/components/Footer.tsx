import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
export const Footer = () => {
  return <footer className="w-full bg-[#081624] border-t border-[#172b44]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-white flex items-center mb-4">
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
            <p className="text-[#8badc9] mb-4">
              Secure document verification through zero-knowledge proofs and
              blockchain technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#partners" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-[#0055ff] mr-2 mt-0.5" />
                <span className="text-[#8badc9]">
                  Santos Port, Terminal 1<br />
                  Santos, SP, Brazil
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-[#0055ff] mr-2" />
                <a href="mailto:contact@zkcargopass.com" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  contact@zkcargopass.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-[#0055ff] mr-2" />
                <a href="tel:+551399999999" className="text-[#8badc9] hover:text-[#a9c1d9]">
                  +55 13 9999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#172b44] flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#6d8fb5] mb-4 md:mb-0">
            © 2023 zkCargoPass. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-[#6d8fb5] hover:text-[#8badc9] text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-[#6d8fb5] hover:text-[#8badc9] text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-[#6d8fb5] hover:text-[#8badc9] text-sm">
              Legal
            </a>
          </div>
        </div>
      </div>
    </footer>;
};