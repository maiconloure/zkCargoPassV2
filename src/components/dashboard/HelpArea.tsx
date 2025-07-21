import React from 'react';
import { HelpCircle, ExternalLink } from 'lucide-react';

const helpResources = [
  {
    id: 1,
    title: 'Getting Started Guide',
    description: 'Learn the basics of zkCargoPass and how to use our platform',
    link: '#'
  },
  {
    id: 2,
    title: 'Documentation',
    description: 'Detailed technical documentation and API references',
    link: '#'
  },
  {
    id: 3,
    title: 'FAQ',
    description: 'Frequently asked questions about our services',
    link: '#'
  }
];

export const HelpArea = () => {
  return (
    <div className="bg-[#0f2942] rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <HelpCircle className="text-[#8badc9]" size={24} />
        <h2 className="text-xl font-semibold text-white">Help & Resources</h2>
      </div>
      <div className="grid gap-4">
        {helpResources.map((resource) => (
          <a
            key={resource.id}
            href={resource.link}
            className="block p-4 bg-[#172b44] rounded-lg hover:bg-[#1f3655] transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-medium mb-1">{resource.title}</h3>
                <p className="text-[#8badc9] text-sm">{resource.description}</p>
              </div>
              <ExternalLink className="text-[#8badc9]" size={20} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
