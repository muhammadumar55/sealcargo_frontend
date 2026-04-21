import { useNavigate } from "react-router";
import { Shield, AlertTriangle, CheckCircle, FileText, Globe, TrendingDown, ArrowRight, AlertCircle } from "lucide-react";
import logo from "../../imports/cropped-seal-guatemala.png";

export function RiskCompliance() {
  const navigate = useNavigate();

  const riskScore = 32;
  const riskLevel = riskScore < 40 ? "LOW" : riskScore < 70 ? "MEDIUM" : "HIGH";
  const riskColor = riskScore < 40 ? "green" : riskScore < 70 ? "yellow" : "red";

  const documents = [
    { name: "Commercial Invoice", status: "required", completed: false },
    { name: "Packing List", status: "required", completed: false },
    { name: "Bill of Lading", status: "required", completed: false },
    { name: "Certificate of Origin", status: "required", completed: false },
    { name: "Import License", status: "optional", completed: false },
    { name: "Phytosanitary Certificate", status: "recommended", completed: false }
  ];

  const warnings = [
    {
      type: "pricing",
      severity: "medium",
      title: "Price Variance Detected",
      description: "Supplier pricing is 12% lower than market average. Request quality samples before large order.",
      recommendation: "Order sample units and conduct quality inspection"
    },
    {
      type: "compliance",
      severity: "low",
      title: "Formaldehyde Testing Required",
      description: "Wooden furniture must meet EPA formaldehyde emission standards for US import.",
      recommendation: "Request CARB certification or third-party test report"
    },
    {
      type: "customs",
      severity: "medium",
      title: "HS Code Classification",
      description: "Ensure correct HS code (9401.61) is used to avoid delays and incorrect duty calculation.",
      recommendation: "Verify with customs broker before shipment"
    }
  ];

  const complianceChecks = [
    { item: "Supplier verification completed", passed: true },
    { item: "Business license validated", passed: true },
    { item: "Export capability confirmed", passed: true },
    { item: "Trade assurance available", passed: true },
    { item: "Product certification reviewed", passed: false },
    { item: "Factory audit conducted", passed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SEAL" className="h-10" />
            <span className="text-xl font-bold text-[#0B3C5D]">SmartTrade AI</span>
          </div>
          <button
            onClick={() => navigate("/report")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white rounded-xl hover:from-blue-700 hover:to-[#0a2f47] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            Generate Report
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B3C5D] mb-2">Risk & Compliance Assessment</h1>
          <p className="text-slate-600">Comprehensive analysis of potential risks and regulatory requirements</p>
        </div>

        {/* Risk Score Card */}
        <div className={`bg-gradient-to-r from-${riskColor}-500 to-${riskColor}-600 rounded-2xl shadow-xl p-8 mb-8 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-${riskColor}-100 mb-2">Overall Risk Score</div>
              <div className="text-5xl font-bold">{riskScore}/100</div>
              <div className="text-${riskColor}-100 mt-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {riskLevel} RISK
              </div>
            </div>
            <div className="text-right">
              <div className="text-${riskColor}-100 mb-2">Risk Level</div>
              <div className="text-3xl font-bold">{riskLevel}</div>
              <div className="text-sm text-${riskColor}-100 mt-2">
                {riskLevel === "LOW" ? "Safe to proceed with caution" : "Review warnings carefully"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Warnings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="font-semibold text-[#0B3C5D] mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Risk Warnings
              </h2>

              <div className="space-y-4">
                {warnings.map((warning, i) => (
                  <div
                    key={i}
                    className={`border-l-4 ${
                      warning.severity === "high" ? "border-red-500 bg-red-50" :
                      warning.severity === "medium" ? "border-yellow-500 bg-yellow-50" :
                      "border-blue-500 bg-blue-50"
                    } rounded-lg p-4`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        warning.severity === "high" ? "text-red-600" :
                        warning.severity === "medium" ? "text-yellow-600" :
                        "text-blue-600"
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-semibold ${
                            warning.severity === "high" ? "text-red-900" :
                            warning.severity === "medium" ? "text-yellow-900" :
                            "text-blue-900"
                          }`}>{warning.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            warning.severity === "high" ? "bg-red-200 text-red-800" :
                            warning.severity === "medium" ? "bg-yellow-200 text-yellow-800" :
                            "bg-blue-200 text-blue-800"
                          }`}>
                            {warning.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className={`text-sm mb-2 ${
                          warning.severity === "high" ? "text-red-800" :
                          warning.severity === "medium" ? "text-yellow-800" :
                          "text-blue-800"
                        }`}>{warning.description}</p>
                        <div className={`text-xs font-medium ${
                          warning.severity === "high" ? "text-red-700" :
                          warning.severity === "medium" ? "text-yellow-700" :
                          "text-blue-700"
                        }`}>
                          ✓ Recommendation: {warning.recommendation}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="font-semibold text-[#0B3C5D] mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Required Documentation
              </h2>

              <div className="space-y-3">
                {documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        doc.completed ? "bg-green-500 border-green-500" : "border-slate-300"
                      }`}>
                        {doc.completed && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span className="font-medium text-slate-700">{doc.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      doc.status === "required" ? "bg-red-100 text-red-700" :
                      doc.status === "recommended" ? "bg-yellow-100 text-yellow-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance Checks */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="font-semibold text-[#0B3C5D] mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Compliance Checks
              </h2>

              <div className="space-y-3">
                {complianceChecks.map((check, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {check.passed ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${check.passed ? "text-slate-700" : "text-slate-400"}`}>
                      {check.item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {complianceChecks.filter(c => c.passed).length}/{complianceChecks.length}
                  </div>
                  <div className="text-sm text-slate-600">Checks Passed</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Regional Insights
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>China-US trade relations stable for furniture imports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Supplier located in established manufacturing hub</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Low political risk for this product category</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-green-900 mb-2">Overall Assessment</h3>
              <p className="text-sm text-green-800">
                This import has a <strong>low overall risk profile</strong>. Address the medium-priority warnings before proceeding, and ensure all required documentation is prepared.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
