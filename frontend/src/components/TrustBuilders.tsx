import { Award, Clock, Users, CheckCircle, Star, Target, Shield, TrendingUp } from 'lucide-react';

interface TrustBuildersProps {
  implementationTimeline: string;
  confidence: number;
  solutionType: string;
}

export function TrustBuilders({ implementationTimeline, confidence, solutionType }: TrustBuildersProps) {
  const expertiseBadges = [
    {
      icon: Award,
      title: 'AI Implementation Expert',
      description: '50+ successful automation projects',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'SME Specialist',
      description: 'Focused on small-medium enterprises',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'Netherlands Certified',
      description: 'Local expertise & compliance',
      color: 'purple'
    },
    {
      icon: TrendingUp,
      title: 'ROI Guaranteed',
      description: 'Average 300%+ first-year returns',
      color: 'orange'
    }
  ];

  const implementationSteps = [
    {
      week: '1-2',
      title: 'Discovery & Planning',
      description: 'Process analysis and solution design',
      status: 'upcoming'
    },
    {
      week: '2-3',
      title: 'AI Development',
      description: 'Custom automation development',
      status: 'upcoming'
    },
    {
      week: '3-4',
      title: 'Testing & Training',
      description: 'System testing and team training',
      status: 'upcoming'
    },
    {
      week: '4',
      title: 'Launch & Support',
      description: 'Go-live and ongoing optimization',
      status: 'upcoming'
    }
  ];

  const similarProjects = [
    {
      industry: 'E-commerce',
      process: 'Order Processing',
      improvement: '85%',
      timeline: '3 weeks'
    },
    {
      industry: 'Professional Services',
      process: 'Client Onboarding',
      improvement: '70%',
      timeline: '4 weeks'
    },
    {
      industry: 'Healthcare',
      process: 'Appointment Scheduling',
      improvement: '90%',
      timeline: '2 weeks'
    },
    {
      industry: 'Manufacturing',
      process: 'Inventory Management',
      improvement: '75%',
      timeline: '3 weeks'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Choose SPAIK?</h2>
        <p className="text-gray-600">Proven expertise in AI automation for Dutch SMEs</p>
      </div>

      {/* Expertise Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {expertiseBadges.map((badge, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-lg bg-${badge.color}-100 w-fit mb-4`}>
              <badge.icon className={`h-6 w-6 text-${badge.color}-600`} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{badge.title}</h3>
            <p className="text-sm text-gray-600">{badge.description}</p>
          </div>
        ))}
      </div>

      {/* Implementation Timeline */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-blue-100">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Implementation Timeline</h3>
            <p className="text-sm text-gray-600">{implementationTimeline} to full automation</p>
          </div>
        </div>

        <div className="space-y-4">
          {implementationSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-700">{index + 1}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Week {step.week}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Confidence Indicator */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-green-800">Success Confidence</span>
            <span className="text-2xl font-bold text-green-700">{Math.round(confidence * 100)}%</span>
          </div>
          <div className="w-full bg-green-100 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
          <p className="text-sm text-green-700 mt-2">
            Based on 50+ similar implementations
          </p>
        </div>
      </div>

      {/* Similar Projects */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-purple-100">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Proven Track Record</h3>
            <p className="text-sm text-gray-600">Similar successful implementations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {similarProjects.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{project.industry}</span>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                  {project.improvement} improvement
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{project.process} automation</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>Completed in {project.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-blue-100 mb-6">
            Join 50+ Dutch SMEs who have already automated their processes with SPAIK. 
            Our experts will handle all the technical complexity while you focus on growing your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              📅 Book Free Consultation
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium">
              📞 Call +31 20 123 4567
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-blue-400">
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-blue-100">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">300%</div>
              <div className="text-sm text-blue-100">Average ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">2-4</div>
              <div className="text-sm text-blue-100">Weeks to Launch</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}