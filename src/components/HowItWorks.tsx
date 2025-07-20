import React from 'react';
import { FileText, Shield, Database, Check, ArrowRight } from 'lucide-react';
export const HowItWorks = () => {
  return <section id="how-it-works" className="w-full py-16 bg-[#0a1929]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How zkCargoPass Works
          </h2>
          <p className="text-[#8badc9] max-w-2xl mx-auto">
            Our platform uses zero-knowledge proofs and blockchain to securely
            verify customs documents without exposing sensitive information.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              <WorkflowStep number="1" title="Document Upload" description="Import/export companies upload customs documents to the zkCargoPass Enterprise Portal." />
              <WorkflowStep number="2" title="AI Validation" description="Our AI validates document format and content before processing, ensuring compliance with regulations." />
              <WorkflowStep number="3" title="Zero-Knowledge Proof Generation" description="The system generates cryptographic proofs that verify document validity without revealing sensitive data." />
              <WorkflowStep number="4" title="Blockchain Verification" description="Proof hashes are stored on blockchain for immutable verification and auditability." />
              <WorkflowStep number="5" title="Customs Clearance" description="Customs authorities verify proofs through the Verifier Portal, accelerating cargo release." />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="bg-[#102a43]/70 border border-[#172b44] rounded-xl p-6 relative">
              <div className="absolute -top-4 -right-4 bg-[#0055ff] text-white text-xs font-bold px-2 py-1 rounded">
                SECURE WORKFLOW
              </div>
              <div className="space-y-6">
                <div className="bg-[#081624] rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-2 w-2 rounded-full bg-[#0055ff] mr-2"></div>
                    <span className="text-sm text-[#8badc9]">
                      Document Verification
                    </span>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <div className="bg-[#102a43] w-10 h-10 rounded-full flex items-center justify-center mr-4">
                        <FileText size={20} className="text-[#8badc9]" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-[#102a43] rounded-full w-full mb-1">
                          <div className="h-2 bg-green-500 rounded-full" style={{
                          width: '100%'
                        }}></div>
                        </div>
                        <div className="text-xs text-[#8badc9]">
                          Import Declaration
                        </div>
                      </div>
                      <Check size={16} className="text-green-500 ml-2" />
                    </div>
                    <ArrowIcon />
                    <div className="flex items-center">
                      <div className="bg-[#102a43] w-10 h-10 rounded-full flex items-center justify-center mr-4">
                        <Shield size={20} className="text-[#8badc9]" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-[#102a43] rounded-full w-full mb-1">
                          <div className="h-2 bg-green-500 rounded-full" style={{
                          width: '100%'
                        }}></div>
                        </div>
                        <div className="text-xs text-[#8badc9]">
                          ZKP Generation
                        </div>
                      </div>
                      <Check size={16} className="text-green-500 ml-2" />
                    </div>
                    <ArrowIcon />
                    <div className="flex items-center">
                      <div className="bg-[#102a43] w-10 h-10 rounded-full flex items-center justify-center mr-4">
                        <Database size={20} className="text-[#8badc9]" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-[#102a43] rounded-full w-full mb-1">
                          <div className="h-2 bg-[#0055ff] rounded-full" style={{
                          width: '75%'
                        }}></div>
                        </div>
                        <div className="text-xs text-[#8badc9]">
                          Blockchain Verification
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#081624] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-[#8badc9]">
                      Zero-Knowledge Proof
                    </span>
                    <span className="text-xs bg-[#102a43] text-[#8badc9] px-2 py-0.5 rounded">
                      Generated
                    </span>
                  </div>
                  <div className="font-mono text-xs bg-[#0a1929] p-3 rounded text-[#8badc9] overflow-x-auto">
                    {'{'}
                    <br />
                    &nbsp;&nbsp;"proof": "0x7f9a2c5b8d3e1f0a...",
                    <br />
                    &nbsp;&nbsp;"publicInputs": {'{'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;"documentHash": "0x3a1b2c...",
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;"timestamp": 1678234567,
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;"validationStatus": true
                    <br />
                    &nbsp;&nbsp;{'}'},<br />
                    &nbsp;&nbsp;"blockchainTx": "0x8c7b6a..."
                    <br />
                    {'}'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
const WorkflowStep = ({
  number,
  title,
  description
}: {
  number: string;
  title: string;
  description: string;
}) => {
  return <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0055ff] flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-[#8badc9]">{description}</p>
      </div>
    </div>;
};
const ArrowIcon = () => <div className="flex justify-center">
    <ArrowRight size={16} className="text-[#0055ff] rotate-90" />
  </div>;