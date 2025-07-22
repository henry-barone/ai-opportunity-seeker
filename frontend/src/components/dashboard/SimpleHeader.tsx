interface SimpleHeaderProps {}

export const SimpleHeader = ({}: SimpleHeaderProps) => {
  return (
    <header className="bg-white border-b shadow-sm" style={{ borderColor: '#E5E7EB' }}>
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* SPAIK Brand on far left */}
          <div className="text-2xl font-bold tracking-tight" style={{ color: '#2D1B69' }}>
            SPAIK
          </div>
          
          {/* Centered Tab Navigation */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center bg-gray-50 rounded-xl p-1" style={{ backgroundColor: '#F8FAFC' }}>
              <button 
                className="px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:text-gray-900"
                style={{ color: '#64748B' }}
              >
                Chat
              </button>
              <button 
                className="px-6 py-3 text-sm font-semibold rounded-lg text-white transition-all duration-300 shadow-md"
                style={{ backgroundColor: '#2D1B69' }}
              >
                AI Impact Analysis
              </button>
            </div>
          </div>
          
          {/* Right side spacer for balance */}
          <div className="w-16"></div>
        </div>
      </div>
    </header>
  );
};