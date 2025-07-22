import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { DashboardData } from '@/utils/dashboardHelpers';

interface EnhancedFooterProps {
  data: DashboardData;
}

export const EnhancedFooter = ({ data }: EnhancedFooterProps) => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* SPAIK Branding */}
          <div>
            <div className="font-bold text-2xl mb-4 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              SPAIK.ai
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Specializing in intelligent business automation solutions. 
              We transform back-office operations through AI-powered process optimization.
            </p>
            <div className="text-lg font-semibold text-blue-300 mb-2">
              Trusted by 50+ businesses across Europe
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:hello@spaik.ai" className="text-gray-300 hover:text-white transition-colors">
                  hello@spaik.ai
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:+31612345678" className="text-gray-300 hover:text-white transition-colors">
                  +31 6 1234 5678
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Netherlands</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-blue-400" />
                <a href="https://spaik.ai" className="text-gray-300 hover:text-white transition-colors">
                  www.spaik.ai
                </a>
              </div>
            </div>
          </div>

          {/* Analysis Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Your Analysis</h3>
            <div className="space-y-2 text-sm">
              <div className="text-gray-300">
                Analysis ID: <span className="font-mono text-blue-300">{data.id}</span>
              </div>
              <div className="text-gray-300">
                Generated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="text-gray-300">
                Recommendation: <span className="text-white">Accounts Payable Process Automation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer and Legal */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-sm text-gray-400">
              <p className="mb-2">
                <strong>Important:</strong> Results vary by business size and current processes. 
                Calculations are estimates based on industry benchmarks and similar implementations.
              </p>
              <p>
                This analysis is provided for informational purposes and does not constitute 
                a guarantee of specific results or savings.
              </p>
            </div>
            
            <div className="text-sm text-gray-500 md:text-right">
              <div className="flex flex-col md:items-end gap-2">
                <div className="flex gap-6">
                  <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
                <div>
                  © 2024 SPAIK.ai. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};