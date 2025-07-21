import React, { useState } from 'react';
import { UserCircle, Settings, LogOut, Bell, ChevronDown } from 'lucide-react';
import zkCargoPassLogo from '../../assets/zkCargoPass.png';

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Administrator',
  budgetUsed: 42,
  budgetTotal: 100,
};

const mockDocs = [
  { id: 1, name: 'Invoice_123.pdf', date: '2025-07-20', status: 'Uploaded' },
  { id: 2, name: 'Manifest_456.pdf', date: '2025-07-18', status: 'Uploaded' },
];

const mockProofs = [
  { id: 1, doc: 'Invoice_123.pdf', date: '2025-07-20', type: 'Generated' },
  { id: 2, doc: 'Manifest_456.pdf', date: '2025-07-18', type: 'Verified' },
];

const platformStatus = {
  api: 'Online',
  proofs: 'Operational',
  storage: 'Online',
};

export const Dashboard = () => {
  const [tab, setTab] = useState('documents');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasNotifications] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a1929] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f2942]/95 backdrop-blur-sm border-r border-[#172b44] min-h-screen">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <img src={zkCargoPassLogo} alt="zkCargoPass" className="w-6 h-6" />
            <span className="text-xl font-display font-bold text-white">zkCargoPass</span>
          </div>
          
          <nav className="space-y-2">
            <button
              onClick={() => setTab('documents')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                tab === 'documents' 
                  ? 'bg-[#172b44] text-white' 
                  : 'text-[#8badc9] hover:bg-[#172b44]/50 hover:text-white'
              }`}
            >
              <span>Documents</span>
            </button>
            <button
              onClick={() => setTab('proofs')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                tab === 'proofs' 
                  ? 'bg-[#172b44] text-white' 
                  : 'text-[#8badc9] hover:bg-[#172b44]/50 hover:text-white'
              }`}
            >
              <span>Proofs</span>
            </button>
            <button
              onClick={() => setTab('generate')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                tab === 'generate' 
                  ? 'bg-[#172b44] text-white' 
                  : 'text-[#8badc9] hover:bg-[#172b44]/50 hover:text-white'
              }`}
            >
              <span>ZK Proof Generation</span>
            </button>
            <button
              onClick={() => setTab('validate')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                tab === 'validate' 
                  ? 'bg-[#172b44] text-white' 
                  : 'text-[#8badc9] hover:bg-[#172b44]/50 hover:text-white'
              }`}
            >
              <span>ZK Proof Validation</span>
            </button>
            <button
              onClick={() => setTab('help')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                tab === 'help' 
                  ? 'bg-[#172b44] text-white' 
                  : 'text-[#8badc9] hover:bg-[#172b44]/50 hover:text-white'
              }`}
            >
              <span>Help</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Dashboard Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex-1 flex flex-col">
        {/* Dashboard Header */}
        <header className="sticky top-0 z-50 bg-[#0f2942]/95 backdrop-blur-sm border-b border-[#172b44] mb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                {/* <img src={zkCargoPassLogo} alt="zkCargoPass" className="w-6 h-6" /> */}
                {/* <span className="text-xl font-display font-bold text-white">Dashboard</span> */}
              </div>
              
              {/* Page Title */}
              <div className="text-xl font-display font-bold text-white">
                {tab === 'documents' && 'Documents'}
                {tab === 'proofs' && 'Proofs'}
                {tab === 'generate' && 'ZK Proof Generation'}
                {tab === 'validate' && 'ZK Proof Validation'}
                {tab === 'help' && 'Help & Support'}
              </div>
            </div>

            {/* Right Section - Notifications & Profile */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-[#8badc9] hover:text-white rounded-full hover:bg-[#172b44]/50 transition-colors">
                <Bell size={20} />
                {hasNotifications && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0055ff] rounded-full"></span>
                )}
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#172b44]/50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#172b44] flex items-center justify-center text-[#8badc9] group-hover:text-white transition-colors">
                    <UserCircle size={24} />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">{mockUser.name}</p>
                    <p className="text-xs text-[#8badc9]">{mockUser.role}</p>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-[#8badc9] transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0f2942] rounded-lg border border-[#172b44] shadow-xl animate-fadeIn">
                    <div className="px-4 py-3 border-b border-[#172b44]">
                      <p className="text-sm font-medium text-white">{mockUser.name}</p>
                      <p className="text-xs text-[#8badc9]">{mockUser.email}</p>
                    </div>
                    <div className="py-1">
                      <button className="w-full px-4 py-2 text-sm text-left text-[#8badc9] hover:text-white hover:bg-[#172b44]/50 flex items-center space-x-2 transition-colors">
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                      <button className="w-full px-4 py-2 text-sm text-left text-[#8badc9] hover:text-white hover:bg-[#172b44]/50 flex items-center space-x-2 transition-colors">
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
      </div>

        <div className="max-w-7xl mx-auto">
          {/* Status Cards */}
          <div className="mb-8 grid md:grid-cols-2 gap-6">
            {/* Budget Card */}
            <div className="bg-[#0f2942] backdrop-blur-sm border border-[#172b44] rounded-lg p-6">
              <div className="text-[#8badc9] text-sm mb-2">Budget Consumption</div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl font-bold text-white">{mockUser.budgetUsed} / {mockUser.budgetTotal}</div>
                <span className="text-sm text-[#8badc9]">credits</span>
              </div>
              <div className="w-full bg-[#172b44] rounded-full h-2">
                <div className="bg-[#0055ff] h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(mockUser.budgetUsed / mockUser.budgetTotal) * 100}%` }}></div>
              </div>
            </div>
            
            {/* Platform Status Card */}
            <div className="bg-[#0f2942] backdrop-blur-sm border border-[#172b44] rounded-lg p-6">
              <div className="text-[#8badc9] text-sm mb-4">Platform Status</div>
              <ul className="text-white space-y-3">
                <li className="flex justify-between items-center">
                  <span className="text-[#8badc9]">API</span>
                  <span className="text-green-400 font-medium">{platformStatus.api}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-[#8badc9]">Proofs</span>
                  <span className="text-green-400 font-medium">{platformStatus.proofs}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-[#8badc9]">Storage</span>
                  <span className="text-green-400 font-medium">{platformStatus.storage}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Page Content */}

        {tab === 'documents' && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-white">Uploaded Documents</h2>
            <div className="bg-[#0f2942] backdrop-blur-sm border border-[#172b44] rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#172b44]">
                    <th className="py-4 px-6 text-[#8badc9] font-medium">Name</th>
                    <th className="py-4 px-6 text-[#8badc9] font-medium">Date</th>
                    <th className="py-4 px-6 text-[#8badc9] font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDocs.map(doc => (
                    <tr key={doc.id} className="border-b border-[#172b44] last:border-b-0 hover:bg-[#172b44]/50 transition-colors">
                      <td className="py-4 px-6 text-white">{doc.name}</td>
                      <td className="py-4 px-6 text-[#8badc9]">{doc.date}</td>
                      <td className="py-4 px-6 text-green-400">{doc.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {tab === 'proofs' && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-white">Proofs History</h2>
            <div className="bg-[#0f2942] backdrop-blur-sm border border-[#172b44] rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#172b44]">
                    <th className="py-4 px-6 text-[#8badc9] font-medium">Document</th>
                    <th className="py-4 px-6 text-[#8badc9] font-medium">Date</th>
                    <th className="py-4 px-6 text-[#8badc9] font-medium">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProofs.map(proof => (
                    <tr key={proof.id} className="border-b border-[#172b44] last:border-b-0 hover:bg-[#172b44]/50 transition-colors">
                      <td className="py-4 px-6 text-white">{proof.doc}</td>
                      <td className="py-4 px-6 text-[#8badc9]">{proof.date}</td>
                      <td className="py-4 px-6">
                        <span className={proof.type === 'Verified' ? 'text-green-400' : 'text-[#0055ff]'}>
                          {proof.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'generate' && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-white">Generate ZK Proof</h2>
            <div className="bg-[#0f2942] backdrop-blur-sm border border-[#172b44] rounded-lg p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-[#8badc9] text-sm mb-2">Select Document</label>
                  <select className="w-full bg-[#172b44] border border-[#172b44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0055ff]">
                    <option value="">Choose a document...</option>
                    {mockDocs.map(doc => (
                      <option key={doc.id} value={doc.id}>{doc.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#8badc9] text-sm mb-2">Proof Type</label>
                  <select className="w-full bg-[#172b44] border border-[#172b44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0055ff]">
                    <option value="ownership">Document Ownership</option>
                    <option value="integrity">Document Integrity</option>
                    <option value="timeline">Timeline Verification</option>
                  </select>
                </div>
                <button 
                  onClick={() => setIsGenerating(true)}
                  className="w-full bg-[#0055ff] hover:bg-[#4d8bff] text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                >
                  {isGenerating ? 'Generating...' : 'Generate Proof'}
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === 'validate' && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-white">Validate ZK Proof</h2>
            <div className="bg-[#0f2942] backdrop-blur-sm border border-[#172b44] rounded-lg p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-[#8badc9] text-sm mb-2">Select Proof</label>
                  <select className="w-full bg-[#172b44] border border-[#172b44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0055ff]">
                    <option value="">Choose a proof...</option>
                    {mockProofs.map(proof => (
                      <option key={proof.id} value={proof.id}>{proof.doc} - {proof.type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#8badc9] text-sm mb-2">Public Input (Optional)</label>
                  <textarea 
                    className="w-full bg-[#172b44] border border-[#172b44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#0055ff]"
                    rows={4}
                    placeholder="Enter public input data..."
                  />
                </div>
                <button 
                  onClick={() => setIsValidating(true)}
                  className="w-full bg-[#0055ff] hover:bg-[#4d8bff] text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                >
                  {isValidating ? 'Validating...' : 'Validate Proof'}
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === 'help' && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-white">Help & Support</h2>
            <div className="bg-[#0f2942] backdrop-blur-sm border border-[#172b44] rounded-lg p-6">
              <p className="text-[#8badc9] mb-4">
                Need assistance? Contact our support team at{' '}
                <a href="mailto:support@zkcargopass.com" className="text-[#0055ff] hover:text-[#4d8bff] font-medium">
                  support@zkcargopass.com
                </a>
              </p>
              <p className="text-[#8badc9] mb-4">
                Check our{' '}
                <a href="#" className="text-[#0055ff] hover:text-[#4d8bff] font-medium">
                  documentation
                </a>
                {' '}for guides and FAQs.
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-[#8badc9]">Platform status:</span>
                <span className="text-green-400 font-medium">All systems operational</span>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
    </div>
  );
};
