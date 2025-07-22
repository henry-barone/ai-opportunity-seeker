interface ProfessionalHeaderProps {}

export const ProfessionalHeader = ({}: ProfessionalHeaderProps) => {
  return (
    <header className="bg-white border-b" style={{ borderColor: '#F8F9FA' }}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* SPAIK Logo/Brand */}
          <div className="text-2xl font-bold" style={{ color: '#2D1B69' }}>
            SPAIK
          </div>
          
          {/* Tab Navigation */}
          <div className="flex items-center bg-white border rounded-lg" style={{ borderColor: '#F8F9FA' }}>
            <button 
              className="px-6 py-3 text-sm font-medium rounded-l-lg transition-all duration-200 hover:bg-gray-50"
              style={{ color: '#6B7280' }}
            >
              Chat
            </button>
            <div className="w-px h-8" style={{ backgroundColor: '#F8F9FA' }}></div>
            <button 
              className="px-6 py-3 text-sm font-medium rounded-r-lg text-white transition-all duration-200"
              style={{ backgroundColor: '#2D1B69' }}
            >
              AI Recommendation
            </button>
          </div>
          
        </div>
      </div>
    </header>
  );
};