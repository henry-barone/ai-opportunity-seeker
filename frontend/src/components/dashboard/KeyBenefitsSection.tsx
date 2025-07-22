interface KeyBenefitsSectionProps {}

export const KeyBenefitsSection = ({}: KeyBenefitsSectionProps) => {
  const benefits = [
    "Eliminate Manual Data Entry",
    "Reduce Processing Errors by 95%", 
    "Free Staff for Strategic Work",
    "Improve Cash Flow Management"
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="border rounded-lg p-12 bg-white" style={{ borderColor: '#E5E7EB' }}>
          
          <h2 className="text-2xl font-semibold text-center mb-12" style={{ color: '#1F2937' }}>
            Key Benefits of Automation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-medium" style={{ color: '#1F2937' }}>
                  {benefit}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};