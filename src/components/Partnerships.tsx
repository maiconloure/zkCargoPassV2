import React from 'react';
export const Partnerships = () => {
  return <section id="partners" className="w-full py-16 bg-[#081624]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Key Partnerships
          </h2>
          <p className="text-[#8badc9] max-w-2xl mx-auto">
            We collaborate with leading organizations to ensure regulatory
            compliance and operational excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PartnerCard name="Federal Revenue" role="Customs Authority" description="Oversees document verification and cargo clearance processes, ensuring regulatory compliance." />
          <PartnerCard name="SERPRO" role="Tech Provider" description="Provides the PortalÚnico/Siscomex approval environment for document processing and verification." />
          <PartnerCard name="Pilot Company" role="Implementation Partner" description="Validates with real data, collects feedback and measures KPIs like reduced cargo release times." />
          <PartnerCard name="Foreign Trade Associations" role="Industry Partners" description="ABEC, Sindaportos, and others provide industry insights and support adoption." />
          <PartnerCard name="Port Authority of Santos" role="Regulatory Partner" description="Regulatory alignment and operational acceptance for Latin America's largest port." />
          <PartnerCard name="Port of Itajaí" role="Operational Partner" description="Implementation site for scaling zkCargoPass across Brazil's major ports." />
        </div>
      </div>
    </section>;
};
const PartnerCard = ({
  name,
  role,
  description
}: {
  name: string;
  role: string;
  description: string;
}) => {
  return <div className="bg-[#0a1929]/80 border border-[#172b44] rounded-xl p-6 hover:bg-[#102a43]/80 transition-colors">
      <div className="mb-4 h-12 flex items-center">
        <div className="bg-[#102a43] px-3 py-1 rounded text-[#8badc9] text-sm inline-block">
          {role}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-[#8badc9]">{description}</p>
    </div>;
};