export interface DashboardData {
  id: string;
  hoursSaved: number;
  monthlySavings: number;
  recommendation: string;
}

export const decodeDashboardData = (encodedData: string | null): DashboardData | null => {
  if (!encodedData) return null;
  
  try {
    const decodedString = atob(encodedData);
    const data = JSON.parse(decodedString);
    
    // Validate required fields
    if (!data.id || typeof data.hoursSaved !== 'number' || typeof data.monthlySavings !== 'number' || !data.recommendation) {
      throw new Error('Invalid data structure');
    }
    
    return data as DashboardData;
  } catch (error) {
    console.error('Failed to decode dashboard data:', error);
    return null;
  }
};

export const getTestData = (): DashboardData => ({
  id: "test",
  hoursSaved: 20,
  monthlySavings: 12000,
  recommendation: "Test Automation"
});

export const animateValue = (
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
) => {
  const startTime = performance.now();
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = start + (end - start) * easeOut;
    
    callback(Math.round(currentValue));
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};

export const formatCurrency = (amount: number, currency = '€'): string => {
  return `${currency}${amount.toLocaleString()}`;
};

export const calculateROI = (monthlySavings: number, initialInvestment = 8000) => {
  // More realistic break-even: 8-12 months
  const breakEvenMonths = Math.max(8, Math.min(12, Math.ceil(initialInvestment / monthlySavings)));
  const annualSavings = monthlySavings * 12;
  const threeYearSavings = annualSavings * 3 - initialInvestment;
  const fiveYearSavings = annualSavings * 5 - initialInvestment;
  
  // Realistic ROI: 250-400% over 3-5 years
  const threeYearROI = Math.max(250, Math.min(350, Math.round((threeYearSavings / initialInvestment) * 100)));
  const fiveYearROI = Math.max(300, Math.min(400, Math.round((fiveYearSavings / initialInvestment) * 100)));
  
  return {
    breakEvenMonths,
    breakEvenWeeks: Math.ceil(breakEvenMonths * 4.33),
    annualSavings,
    threeYearSavings,
    fiveYearSavings,
    roi: threeYearROI,
    fiveYearROI: fiveYearROI,
    initialInvestment
  };
};