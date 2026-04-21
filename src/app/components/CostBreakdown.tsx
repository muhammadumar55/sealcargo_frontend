import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  DollarSign, Ship, FileText, TrendingUp,
  AlertCircle, ArrowRight, Download, Loader2,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from "recharts";
import logo from "../../imports/cropped-seal-guatemala.png";
import { api, CostBreakdownResult, Supplier } from "../../services/api";

// Icon map for cost items
const iconMap: Record<string, React.ElementType> = {
  "Product Cost": DollarSign,
  "Ocean Freight": Ship,
  "Import Duties": FileText,
  "VAT & Taxes": TrendingUp,
  Insurance: AlertCircle,
};

export function CostBreakdown() {
  const navigate = useNavigate();
  const location = useLocation();

  // Data passed from SupplierResults
  const passedSupplier: Supplier | null = location.state?.supplier || null;
  const passedQuantity: string = location.state?.quantity || "1000";
  const passedBudget: string = location.state?.budget || "50000";
  const passedDestination: string = location.state?.destination || "US";
  const passedProductType: string = location.state?.productType || "furniture";

  const [costData, setCostData] = useState<CostBreakdownResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCostBreakdown();
  }, []);

  const loadCostBreakdown = async () => {
    setIsLoading(true);
    setError("");

    try {
      if (passedSupplier) {
        // Use real API with selected supplier
        const result = await api.getCostBreakdown({
          supplier: passedSupplier,
          quantity: passedQuantity,
          budget: passedBudget,
          destination: passedDestination,
          productType: passedProductType,
        });
        setCostData(result);
      } else {
        // No supplier passed — use default mock calculation
        setCostData(getDefaultCostData());
      }
    } catch (err) {
      console.error("Cost breakdown failed:", err);
      setError("Could not calculate costs. Showing estimates.");
      setCostData(getDefaultCostData());
    } finally {
      setIsLoading(false);
    }
  };

  // Comparison data built from real supplier price
  const comparisonData = costData
    ? [
        { supplier: costData.supplier.split(" ")[0], total: costData.totalCost },
        { supplier: "Avg. Market", total: Math.round(costData.totalCost * 1.12) },
        { supplier: "Budget Option", total: Math.round(costData.totalCost * 0.95) },
        { supplier: "Premium", total: Math.round(costData.totalCost * 1.18) },
      ]
    : [];

  // ── Loading state ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[#0B3C5D] mb-2">
            Calculating Costs...
          </h2>
          <p className="text-slate-600">
            Analyzing duties, shipping, and taxes for your import
          </p>
        </div>
      </div>
    );
  }

  if (!costData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SEAL" className="h-10" />
            <span className="text-xl font-bold text-[#0B3C5D]">SmartTrade AI</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
            >
              ← Back to Suppliers
            </button>
            <button className="px-5 py-2.5 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm hover:shadow-md">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button
              onClick={() => navigate("/risk")}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white rounded-xl hover:from-blue-700 hover:to-[#0a2f47] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Risk Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B3C5D] mb-2">
            Total Landed Cost Analysis
          </h1>
          <p className="text-slate-600">
            Complete cost breakdown for your import from{" "}
            <span className="font-semibold text-[#0B3C5D]">
              {costData.supplier}
            </span>
            {" "}•{" "}
            {costData.quantity.toLocaleString()} units →{" "}
            {costData.destination}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {passedSupplier
              ? "✅ Dynamic calculation based on your selected supplier"
              : "⚠️ Showing default estimates — select a supplier for accurate costs"}
          </p>
        </div>

        {/* ── Total Cost Hero Card ──────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-[#0B3C5D] to-purple-700 rounded-3xl shadow-2xl p-10 mb-8 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="text-blue-100 mb-3 text-lg">Total Landed Cost</div>
              <div className="text-6xl font-bold drop-shadow-lg mb-3">
                ${costData.totalCost.toLocaleString()}
              </div>
              <div className="text-blue-100 text-lg">
                For {costData.quantity.toLocaleString()} units •{" "}
                <span className="font-bold text-white">
                  ${costData.perUnit} per unit
                </span>
              </div>
            </div>
            <div className="w-36 h-36 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
              <DollarSign className="w-20 h-20" />
            </div>
          </div>
        </div>

        {/* ── Charts ───────────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="font-semibold text-[#0B3C5D] mb-6">
              Cost Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costData.items}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  dataKey="amount"
                  nameKey="label"
                >
                  {costData.items.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="font-semibold text-[#0B3C5D] mb-6">
              Cost Comparison
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <XAxis dataKey="supplier" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Legend />
                <Bar
                  dataKey="total"
                  fill="#0B3C5D"
                  name="Total Landed Cost"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Detailed Breakdown Table ──────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
          <h2 className="font-semibold text-[#0B3C5D] mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Detailed Cost Breakdown
          </h2>

          <div className="space-y-4">
            {costData.items.map((item, i) => {
              const Icon = iconMap[item.label] || DollarSign;
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: item.color }}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-[#0B3C5D]">
                        {item.label}
                      </div>
                      <div className="text-sm text-slate-600">
                        {item.details}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#0B3C5D]">
                      ${item.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">
                      {((item.amount / costData.totalCost) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Row */}
          <div className="mt-6 pt-6 border-t-2 border-slate-200">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-xl text-[#0B3C5D]">
                Total Landed Cost
              </div>
              <div className="text-3xl font-bold text-[#0B3C5D]">
                ${costData.totalCost.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* ── Insights ─────────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Cost Savings Identified
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>
                  Consolidating shipment saves ~$1,200 vs. multiple containers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>
                  Selected supplier offers 5% discount for orders over 800 units
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>
                  Per-unit cost of ${costData.perUnit} is{" "}
                  {costData.perUnit < 50 ? "below" : "at"} market average
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Additional Considerations
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Payment terms: 30% deposit, 70% before shipment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>
                  Lead time: 15-20 days production + 25 days shipping
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>
                  Quality inspection recommended before final payment
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Default cost data (when no supplier selected) ─────────────────────────────
function getDefaultCostData(): CostBreakdownResult {
  return {
    supplier: "Selected Supplier",
    quantity: 1000,
    destination: "US",
    productType: "furniture",
    items: [
      { label: "Product Cost",   amount: 38750, details: "1,000 units × $38.75 per unit",                   color: "#0B3C5D" },
      { label: "Ocean Freight",  amount: 4200,  details: "Estimated shipping to US • ~25 days transit",     color: "#3B82F6" },
      { label: "Import Duties",  amount: 2325,  details: "6% duty rate for furniture",                      color: "#60A5FA" },
      { label: "VAT & Taxes",    amount: 775,   details: "Based on destination country regulations",        color: "#93C5FD" },
      { label: "Insurance",      amount: 450,   details: "Cargo insurance • Full coverage • 0.9% of value", color: "#BFDBFE" },
    ],
    totalCost: 46500,
    perUnit: 46.50,
  };
}