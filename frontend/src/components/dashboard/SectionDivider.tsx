interface SectionDividerProps {}

export const SectionDivider = ({}: SectionDividerProps) => {
  return (
    <div className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="border-t" style={{ borderColor: '#E5E7EB' }}></div>
      </div>
    </div>
  );
};