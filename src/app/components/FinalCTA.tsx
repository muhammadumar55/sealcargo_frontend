import { useState } from "react";
import { useNavigate } from "react-router";
import { Download, FileText, Mail, Phone, CheckCircle, ArrowRight, Star, Users, TrendingUp, Target } from "lucide-react";
import logo from "../../imports/cropped-seal-guatemala.png";

export function FinalCTA() {
  const navigate = useNavigate();
  const [showLeadExport, setShowLeadExport] = useState(false);

  const leadStats = {
    totalAnalyzed: 15,
    filtered: 5,
    qualified: 9,
    topPicks: 3
  };

  const reportSections = [
    { name: "Executive Summary", pages: 2, completed: true },
    { name: "Supplier Analysis (10 Vendors)", pages: 8, completed: true },
    { name: "Cost Breakdown & Comparison", pages: 4, completed: true },
    { name: "Risk & Compliance Assessment", pages: 6, completed: true },
    { name: "Shipping & Logistics Plan", pages: 3, completed: true },
    { name: "Documentation Checklist", pages: 2, completed: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SEAL" className="h-10" />
            <span className="text-xl font-bold text-[#0B3C5D]">SmartTrade AI</span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 border-2 border-[#0B3C5D] text-[#0B3C5D] rounded-xl hover:bg-[#0B3C5D] hover:text-white transition-all font-medium shadow-sm hover:shadow-md"
          >
            Start New Analysis
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-[#0B3C5D] mb-3">Your Analysis is Complete!</h1>
          <p className="text-xl text-slate-600">AI filtered {leadStats.totalAnalyzed} suppliers → {leadStats.qualified} qualified leads</p>
        </div>

        {/* Lead Generation Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-[#0B3C5D] mb-1">{leadStats.totalAnalyzed}</div>
            <div className="text-sm text-slate-600">Suppliers Analyzed</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center">
            <Target className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-red-600 mb-1">{leadStats.filtered}</div>
            <div className="text-sm text-slate-600">Filtered Out (Low Quality)</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-green-600 mb-1">{leadStats.qualified}</div>
            <div className="text-sm text-slate-600">Qualified Leads</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-purple-600 mb-1">{leadStats.topPicks}</div>
            <div className="text-sm text-slate-600">AI Top Picks</div>
          </div>
        </div>

        {/* Report Preview */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0B3C5D] mb-2">Import Analysis Report</h2>
              <p className="text-slate-600">Comprehensive sourcing and cost analysis</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-600 mb-1">Report ID</div>
              <div className="font-mono text-[#0B3C5D] font-semibold">#SEAL-2026-0419</div>
            </div>
          </div>

          {/* Key Findings */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="text-sm text-blue-700 mb-2">Best Supplier</div>
              <div className="font-bold text-xl text-[#0B3C5D] mb-1">Foshan Elite</div>
              <div className="flex items-center gap-1 text-sm text-blue-700">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                4.9 rating • Verified
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="text-sm text-green-700 mb-2">Total Landed Cost</div>
              <div className="font-bold text-xl text-[#0B3C5D] mb-1">$46,500</div>
              <div className="text-sm text-green-700">$46.50 per unit</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="text-sm text-purple-700 mb-2">Risk Level</div>
              <div className="font-bold text-xl text-[#0B3C5D] mb-1">LOW</div>
              <div className="text-sm text-purple-700">32/100 risk score</div>
            </div>
          </div>

          {/* Report Sections */}
          <div className="mb-8">
            <h3 className="font-semibold text-[#0B3C5D] mb-4">Report Contents</h3>
            <div className="space-y-2">
              {reportSections.map((section, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-slate-700">{section.name}</span>
                  </div>
                  <span className="text-sm text-slate-600">{section.pages} pages</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <button className="py-4 bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white rounded-xl hover:from-blue-700 hover:to-[#0a2f47] transition-all flex items-center justify-center gap-3 font-semibold">
              <Download className="w-5 h-5" />
              Download Full Report
            </button>
            <button
              onClick={() => setShowLeadExport(true)}
              className="py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 font-semibold"
            >
              <Users className="w-5 h-5" />
              Export {leadStats.qualified} Leads
            </button>
          </div>
        </div>

        {/* Lead Export Success Modal */}
        {showLeadExport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#0B3C5D] mb-2">Leads Exported Successfully!</h2>
                <p className="text-slate-600">
                  {leadStats.qualified} qualified supplier leads have been prepared for your CRM
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-[#0B3C5D] mb-4">Export Includes:</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Complete supplier contact information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>AI quality scores and rankings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Pricing and MOQ details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Verification status and certifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Recommended next steps for each lead</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <button className="w-full px-6 py-3 bg-[#0B3C5D] text-white rounded-lg hover:bg-[#0a2f47] transition-all font-semibold flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download CSV for CRM Import
                </button>
                <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Leads to Team
                </button>
                <button
                  onClick={() => setShowLeadExport(false)}
                  className="w-full px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SEAL Service CTA */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#0B3C5D] via-blue-900 to-purple-900 rounded-3xl shadow-2xl p-10 text-white mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Let SEAL Handle Your Import</h2>
              <p className="text-blue-100 text-xl max-w-2xl mx-auto">
                Why manage logistics yourself? Let our experts handle everything from sourcing to delivery.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { title: "Supplier Negotiation", desc: "Get better prices and terms", icon: "💰" },
                { title: "Quality Control", desc: "Pre-shipment inspections included", icon: "✓" },
                { title: "Full Logistics", desc: "Door-to-door delivery management", icon: "🚢" }
              ].map((service, i) => (
                <div key={i} className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:bg-white/20 transition-all shadow-xl">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-blue-100">{service.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-white text-[#0B3C5D] rounded-xl hover:bg-blue-50 transition-all font-semibold flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105">
                <Mail className="w-5 h-5" />
                Request Quote
              </button>
              <button className="flex-1 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-xl hover:bg-white/30 transition-all font-semibold flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105">
                <Phone className="w-5 h-5" />
                Schedule Call
              </button>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="font-semibold text-[#0B3C5D] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Export This Analysis
            </h3>
            <div className="space-y-3">
              <button className="w-full py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download as Excel
              </button>
              <button className="w-full py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Email Report
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="font-semibold text-[#0B3C5D] mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              Next Steps
            </h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Review supplier details and contact top 3 matches</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Request product samples for quality verification</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Prepare required documentation from compliance list</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Consider SEAL full-service logistics for hassle-free import</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Start Over */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 border-2 border-[#0B3C5D] text-[#0B3C5D] rounded-lg hover:bg-[#0B3C5D] hover:text-white transition-all"
          >
            Start New Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
