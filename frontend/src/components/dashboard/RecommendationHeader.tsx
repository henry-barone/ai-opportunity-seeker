import { DashboardData } from '@/utils/dashboardHelpers';

interface RecommendationHeaderProps {
  data: DashboardData;
}

export const RecommendationHeader = ({ data }: RecommendationHeaderProps) => {
  return (
    <section 
      className="py-12 px-6" 
      style={{ 
        background: 'linear-gradient(135deg, #F8F9FA 0%, #EEF2FF 50%, #F8F9FA 100%)'
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div 
          className="bg-white rounded-lg border p-12 text-center"
          style={{ 
            borderColor: '#2D1B69',
            borderWidth: '3px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)'
          }}
        >
          
          <div 
            className="inline-flex items-center px-4 py-2 rounded-lg mb-4"
            style={{ 
              backgroundColor: '#F8F9FA',
              border: '1px solid #E5E7EB'
            }}
          >
            <div 
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: '#10B981' }}
            ></div>
            <span className="text-sm font-medium" style={{ color: '#6B7280' }}>
              Personalized Analysis
            </span>
          </div>
          
          <div className="flex items-center justify-center mb-6 px-4">
            <span className="text-base mr-2 flex-shrink-0" style={{ color: '#10B981' }}>✓</span>
            <span className="text-sm font-medium text-center sm:text-left" style={{ color: '#4B5563' }}>
              Based on 25+ successful implementations with Dutch manufacturers
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 leading-tight" style={{ color: '#1F2937' }}>
            {data.recommendation || 'Accounts Payable Process'}
          </h1>
          
          <h2 
            className="text-4xl font-bold mb-8 leading-tight"
            style={{ 
              color: '#2D1B69',
              textShadow: '0 2px 4px rgba(45, 27, 105, 0.1)'
            }}
          >
            Automation
          </h2>
          
          <div 
            className="max-w-2xl mx-auto p-6 rounded-lg border-l-4"
            style={{ 
              backgroundColor: '#F8F9FA',
              borderColor: '#2D1B69'
            }}
          >
            <p className="text-lg leading-relaxed font-medium" style={{ color: '#1F2937' }}>
              Transform your manual invoice processing into an automated, error-free system
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};