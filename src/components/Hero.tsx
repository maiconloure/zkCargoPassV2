import React from 'react';
import { ShieldCheck, Clock, Lock } from 'lucide-react';
export const Hero = () => {
  return <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-block px-4 py-1.5 bg-[#102a43]/80 rounded-full text-sm font-medium text-[#8badc9] mb-2">
              Revolutionizing Customs Clearance
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Secure Document Verification with Zero-Knowledge Proofs
            </h1>
            <p className="text-lg md:text-xl text-[#a9c1d9] max-w-[600px]">
              zkCargoPass enables importers and customs agents to verify
              documents through blockchain technology while preserving data
              privacy and accelerating cargo release.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="bg-[#0055ff] hover:bg-[#0044cc] text-white px-6 py-3 rounded-md font-medium">
                Get Started
              </button>
              <button className="bg-[#102a43]/80 hover:bg-[#102a43] text-white px-6 py-3 rounded-md font-medium">
                Schedule Demo
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-[#0055ff]" size={20} />
                <span className="text-[#a9c1d9]">Secure Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-[#0055ff]" size={20} />
                <span className="text-[#a9c1d9]">Faster Clearance</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="text-[#0055ff]" size={20} />
                <span className="text-[#a9c1d9]">Data Privacy</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#102a43]/70 backdrop-blur-sm border border-[#172b44] rounded-xl p-6 shadow-xl">
              <div className="bg-[#081624]/80 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-3">
                  <div className="h-3 w-3 rounded-full bg-[#0055ff] mr-2"></div>
                  <span className="text-sm text-[#8badc9]">
                    Document Verification Process
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#102a43]/80 rounded p-3 flex items-start gap-3">
                    <div className="bg-[#172b44] rounded-full p-1 mt-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 3V7C14 7.55228 14.4477 8 15 8H19" stroke="#8badc9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z" stroke="#8badc9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Import Declaration
                      </div>
                      <div className="text-xs text-[#8badc9]">
                        DUIMP #2023-005781
                      </div>
                    </div>
                    <div className="ml-auto bg-green-800/20 text-green-400 text-xs px-2 py-0.5 rounded">
                      Verified
                    </div>
                  </div>
                  <div className="bg-[#102a43]/80 rounded p-3 flex items-start gap-3">
                    <div className="bg-[#172b44] rounded-full p-1 mt-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="18" height="16" rx="2" stroke="#8badc9" strokeWidth="2" />
                        <path d="M3 10H21" stroke="#8badc9" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Invoice
                      </div>
                      <div className="text-xs text-[#8badc9]">
                        INV-2023-1234
                      </div>
                    </div>
                    <div className="ml-auto bg-[#0055ff]/20 text-[#66a3ff] text-xs px-2 py-0.5 rounded">
                      Processing
                    </div>
                  </div>
                  <div className="bg-[#102a43]/80 rounded p-3 flex items-start gap-3">
                    <div className="bg-[#172b44] rounded-full p-1 mt-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="#8badc9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        ZK Proof Generation
                      </div>
                      <div className="text-xs text-[#8badc9]">
                        Generating cryptographic proof
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-[#8badc9] mb-2">
                Verification Progress
              </div>
              <div className="w-full bg-[#081624]/80 rounded-full h-2 mb-4">
                <div className="bg-[#0055ff] h-2 rounded-full" style={{
                width: '65%'
              }}></div>
              </div>
              <div className="text-center text-sm text-[#8badc9]">
                Estimated time to completion:{' '}
                <span className="font-medium text-white">3 minutes</span>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0055ff]/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0055ff]/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-[#0055ff]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[#0055ff]/5 rounded-full blur-3xl"></div>
      </div>
    </section>;
};