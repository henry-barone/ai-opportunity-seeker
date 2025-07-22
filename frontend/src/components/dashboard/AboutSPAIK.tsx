interface AboutSPAIKProps {}

export const AboutSPAIK = ({}: AboutSPAIKProps) => {
  const credibilityPoints = [
    "2+ years in AP automation",
    "50+ successful implementations", 
    "95-98% accuracy improvement",
    "2-4 week implementation timeline"
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#2D1B69' }}>
          About SPAIK
        </h2>
        
        <p className="text-xl mb-12 max-w-2xl mx-auto" style={{ color: '#1F2937' }}>
          We specialize in accounts payable automation for European businesses
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {credibilityPoints.map((point, index) => (
            <div key={index} className="text-lg" style={{ color: '#1F2937' }}>
              • {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};