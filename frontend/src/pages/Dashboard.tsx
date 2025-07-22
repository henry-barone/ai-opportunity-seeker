import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { ProfessionalHeader } from '@/components/dashboard/ProfessionalHeader';
import { RecommendationHeader } from '@/components/dashboard/RecommendationHeader';
import { ProcessAndFinancial } from '@/components/dashboard/ProcessAndFinancial';
import { AboutAndActions } from '@/components/dashboard/AboutAndActions';
import { decodeDashboardData, getTestData, DashboardData } from '@/utils/dashboardHelpers';

const Dashboard = () => {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = () => {
      setIsLoading(true);
      setError(null);

      // Get encoded data from URL parameters
      const searchParams = new URLSearchParams(location.search);
      const encodedData = searchParams.get('d');

      // Try to decode the data
      const decodedData = decodeDashboardData(encodedData);

      if (decodedData) {
        // Validate that the ID matches
        if (id && decodedData.id !== id) {
          console.warn('URL ID does not match data ID');
        }
        setData(decodedData);
      } else {
        // Check if this is the test URL
        if (id === 'test' || (id && id.includes('test'))) {
          setData(getTestData());
        } else {
          setError('Unable to load dashboard data. The link may be invalid or expired.');
        }
      }

      setIsLoading(false);
    };

    loadDashboardData();
  }, [id, location.search]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F9FA' }}>
        <Card className="border shadow-sm bg-white" style={{ borderColor: '#E5E7EB' }}>
          <CardContent className="p-8 text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: '#2D1B69' }} />
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#1F2937' }}>Loading Your Analysis</h2>
            <p style={{ color: '#6B7280' }}>Preparing your AI automation impact report...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#F8F9FA' }}>
        <Card className="border shadow-sm bg-white max-w-md" style={{ borderColor: '#E5E7EB' }}>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4" style={{ color: '#DC2626' }} />
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F2937' }}>Unable to Load Dashboard</h2>
            <p className="mb-6" style={{ color: '#6B7280' }}>
              {error || 'The dashboard data could not be loaded. This may be due to an invalid or expired link.'}
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.reload()}
                className="w-full text-white"
                style={{ backgroundColor: '#2D1B69' }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/dashboard/test?d=eyJpZCI6InRlc3QiLCJob3Vyc1NhdmVkIjoyMCwibW9udGhseVNhdmluZ3MiOjEyMDAwLCJyZWNvbW1lbmRhdGlvbiI6IlRlc3QgQXV0b21hdGlvbiJ9'}
                variant="outline"
                className="w-full"
                style={{ borderColor: '#E5E7EB', color: '#1F2937' }}
              >
                View Demo Dashboard
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/'}
                variant="ghost"
                className="w-full"
                style={{ color: '#6B7280' }}
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Professional Header with SPAIK Branding */}
      <ProfessionalHeader />

      {/* Professional Dashboard Structure */}
      <main>
        {/* 1. AI Recommendation Header */}
        <RecommendationHeader data={data} />
        
        {/* 2. Process Transformation & Financial Impact */}
        <ProcessAndFinancial data={data} />
        
        {/* 3. About SPAIK & Actions */}
        <AboutAndActions data={data} />
      </main>
    </div>
  );
};

export default Dashboard;