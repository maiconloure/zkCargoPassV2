import React from 'react';
import { Clock, Lock, FileCheck, Zap, BarChart, Bot } from 'lucide-react';
export const Features = () => {
  return <section id="features" className="w-full py-16 bg-[#081624]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Value Propositions
          </h2>
          <p className="text-[#8badc9] max-w-2xl mx-auto">
            zkCargoPass transforms customs document verification with blockchain
            technology and zero-knowledge proofs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={<Clock />} title="Speed" description="Accelerate cargo dispatch from weeks to hours/days by streamlining document verification through cryptographic proofs." />
          <FeatureCard icon={<Lock />} title="Privacy" description="Zero-knowledge proofs verify compliance without exposing sensitive business data, maintaining competitive advantage." />
          <FeatureCard icon={<FileCheck />} title="Simplicity" description="Our MVP integrates with SISCOMEX mock and DUIMP/DI homologation via PortalÚnico for seamless verification." />
          <FeatureCard icon={<Bot />} title="AI-Powered Automation" description="Our AI validates documents before generating evidence, reducing errors and ensuring compliance." />
          <FeatureCard icon={<BarChart />} title="Auditability" description="Cryptographic proof and immutable blockchain hash provide transparent, tamper-proof verification records." />
          <FeatureCard icon={<Zap />} title="Efficiency" description="Streamline customs clearance with automated verification, reducing manual checks and administrative overhead." />
        </div>
      </div>
    </section>;
};
const FeatureCard = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return <div className="bg-[#0a1929]/80 border border-[#172b44] rounded-xl p-6 hover:bg-[#102a43]/80 transition-colors">
      <div className="bg-[#102a43] w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-[#0055ff]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[#8badc9]">{description}</p>
    </div>;
};