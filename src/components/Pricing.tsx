import React from 'react';
import { Check } from 'lucide-react';
export const Pricing = () => {
  return <section id="pricing" className="w-full py-16 bg-[#0a1929]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pricing Models
          </h2>
          <p className="text-[#8badc9] max-w-2xl mx-auto">
            Flexible pricing options designed for businesses of all sizes, from
            small importers to large logistics operators.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard title="SaaS Enterprise" price="R$5,000" period="/month" description="Annual subscription for enterprises with regular import/export operations." features={['Unlimited document uploads', 'AI document validation', 'ZKP generation and verification', 'Blockchain storage', 'API access for integrations', '24/7 technical support']} buttonText="Contact Sales" />
          <PricingCard title="Pay-Per-Proof" price="R$30" period="/proof" description="Pay only for what you use. Ideal for businesses with irregular import volumes." features={['On-demand document processing', 'AI document validation', 'ZKP generation and verification', 'Blockchain storage', 'PDF reports and proof packages', 'Email support']} buttonText="Get Started" highlighted={true} />
          <PricingCard title="Pay-Per-Container" price="From R$60" period="/container" description="Pricing based on container value ranges for optimized cost management." features={['Up to 10,000 USD: R$60/container', '10,001-50,000 USD: R$120/container', 'Over 50,000 USD: R$250/container', 'Volume discounts available', 'Full verification workflow', 'Priority support']} buttonText="Learn More" />
        </div>
        <div className="mt-12 text-center">
          <p className="text-[#8badc9] mb-4">Need a custom solution?</p>
          <button className="bg-[#102a43] hover:bg-[#172b44] text-white px-6 py-3 rounded-md font-medium">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>;
};
const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  highlighted = false
}: {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
}) => {
  return <div className={`rounded-xl p-6 border ${highlighted ? 'bg-[#102a43]/80 border-[#0055ff]/50' : 'bg-[#0a1929]/80 border-[#172b44]'} relative`}>
      {highlighted && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#0055ff] text-white text-xs font-bold px-3 py-1 rounded-full">
          MOST POPULAR
        </div>}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-[#8badc9]">{period}</span>
      </div>
      <p className="text-[#8badc9] mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => <li key={index} className="flex items-start">
            <Check size={18} className={`mr-2 mt-0.5 ${highlighted ? 'text-[#66a3ff]' : 'text-[#0055ff]'}`} />
            <span className="text-[#a9c1d9]">{feature}</span>
          </li>)}
      </ul>
      <button className={`w-full py-2 rounded-md font-medium ${highlighted ? 'bg-[#0055ff] hover:bg-[#0044cc] text-white' : 'bg-[#102a43] hover:bg-[#172b44] text-white'}`}>
        {buttonText}
      </button>
    </div>;
};