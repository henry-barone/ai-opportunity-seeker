export function Footer() {
  return (
    <footer className="bg-dark-grey text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg">Powered by <span className="text-primary font-semibold">SPAIK</span></p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-medium-grey hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-medium-grey hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}