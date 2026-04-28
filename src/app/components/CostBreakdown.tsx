import { useNavigate, useLocation } from "react-router";
import {
  DollarSign, Ship, FileText, TrendingUp,
  AlertCircle, ArrowRight, Download
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from "recharts";
import logo from "../../imports/ChatGPT_Image_Apr_27,_2026,_10_59_16_AM.png";
import { useLanguage } from "../context/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

// ─── Constants ────────────────────────────────────────────────────────────────
const DUTY_RATES: Record<string, number> = {
  furniture: 0.06,
  electronics: 0.00,
  textiles: 0.12,
  machinery: 0.02,
  other: 0.05,
};

const SHIPPING_COSTS: Record<string, number> = {
  US: 4200,
  GT: 3800,
  MX: 3500,
  CA: 4800,
  other: 5000,
};

// ─── Calculate all costs ──────────────────────────────────────────────────────
function calculateCosts(
  price: number,
  quantity: number,
  destination: string,
  productType: string
) {
  const productCost = Math.round(price * quantity);
  const shipping = SHIPPING_COSTS[destination] || 4200;
  const dutyRate = DUTY_RATES[productType] || 0.06;
  const importDuties = Math.round(productCost * dutyRate);
  const taxes = Math.round((productCost + importDuties) * 0.015);
  const insurance = Math.round(productCost * 0.009);
  const totalCost = productCost + shipping + importDuties + taxes + insurance;

  return {
    productCost,
    shipping,
    importDuties,
    taxes,
    insurance,
    totalCost,
    perUnit: parseFloat((totalCost / quantity).toFixed(2)),
    dutyRate,
  };
}

export function CostBreakdown() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  // ── Read state passed from SupplierResults ────────────────────────────────
  const stateSupplier = location.state?.supplier ?? null;
  const stateQuantity = location.state?.quantity ?? "1000";
  const stateBudget = location.state?.budget ?? "50000";
  const stateDestination = location.state?.destination ?? "US";
  const stateProductType = location.state?.productType ?? "furniture";

  const quantity = parseInt(String(stateQuantity)) || 1000;
  const budget = parseFloat(String(stateBudget)) || 50000;
  const destination = String(stateDestination);
  const productType = String(stateProductType);

  // ── Use real supplier price OR fallback default ───────────────────────────
  const price = stateSupplier?.price > 0 ? stateSupplier.price : 38.75;
  const supplierName = stateSupplier?.name || "Selected Supplier";
  const isLiveData = !!stateSupplier;

  // ── Calculate ─────────────────────────────────────────────────────────────
  const costs = calculateCosts(price, quantity, destination, productType);

  // ── Chart data ────────────────────────────────────────────────────────────
  const costData = [
    { name: "Product Cost", value: costs.productCost, color: "#0B3C5D" },
    { name: "Shipping", value: costs.shipping, color: "#3B82F6" },
    { name: "Import Duties", value: costs.importDuties, color: "#60A5FA" },
    { name: "Taxes", value: costs.taxes, color: "#93C5FD" },
    { name: "Insurance", value: costs.insurance, color: "#BFDBFE" },
  ];

  const comparisonData = [
    { supplier: supplierName.split(" ")[0], total: costs.totalCost },
    { supplier: "Avg Market", total: Math.round(costs.totalCost * 1.14) },
    { supplier: "Budget Alt", total: Math.round(costs.totalCost * 0.92) },
    { supplier: "Premium Alt", total: Math.round(costs.totalCost * 1.20) },
  ];

  const breakdownRows = [
    {
      icon: DollarSign,
      labelKey: "cost.productCost",
      amount: costs.productCost,
      details: `${quantity.toLocaleString()} unidades × $${Number(price).toFixed(2)} por unidad`,
      color: "blue",
    },
    {
      icon: Ship,
      labelKey: "cost.oceanFreight",
      amount: costs.shipping,
      details: `Envío estimado a ${destination} • ~25 días de tránsito`,
      color: "cyan",
    },
    {
      icon: FileText,
      labelKey: "cost.importDuties",
      amount: costs.importDuties,
      details: `Tasa arancelaria ${(costs.dutyRate * 100).toFixed(0)}% para ${productType}`,
      color: "purple",
    },
    {
      icon: TrendingUp,
      labelKey: "cost.vatTaxes",
      amount: costs.taxes,
      details: "Basado en regulaciones del país de destino",
      color: "green",
    },
    {
      icon: AlertCircle,
      labelKey: "cost.insurance",
      amount: costs.insurance,
      details: "Seguro de carga • Cobertura completa • 0.9% del valor",
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SEAL" className="h-[85px]" />
            <span className="text-xl font-bold text-[#0B3C5D]">SmartTrade AI</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
            >
              ← Proveedores
            </button>
            <button className="px-5 py-2.5 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm hover:shadow-md">
              <Download className="w-4 h-4" />
              {t("cost.exportPDF")}
            </button>
            <button
              onClick={() => navigate("/risk", {
                state: {
                  supplier: stateSupplier,
                  quantity: stateQuantity,
                  budget: stateBudget,
                  destination: stateDestination,
                  productType: stateProductType,
                }
              })}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white rounded-xl hover:from-blue-700 hover:to-[#0a2f47] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              {t("cost.riskAssessment")}
              <ArrowRight className="w-4 h-4" />
            </button>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B3C5D] mb-2">
            {t("cost.title")}
          </h1>
          <p className="text-slate-600">
            {t("cost.subtitle")}{" "}
            <span className="font-semibold text-[#0B3C5D]">{supplierName}</span>
          </p>
          <p className="text-xs mt-1 font-medium">
            {isLiveData ? (
              <span className="text-green-600">
                ✅ Cálculo dinámico — {quantity.toLocaleString()} unidades ×
                ${Number(price).toFixed(2)} → destino: {destination}
              </span>
            ) : (
              <span className="text-yellow-600">
                ⚠️ Estimados de demostración — selecciona un proveedor para cálculo real
              </span>
            )}
          </p>
        </div>

        {/* ── Total Cost Hero ───────────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-[#0B3C5D] to-purple-700 rounded-3xl shadow-2xl p-10 mb-8 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="text-blue-100 mb-3 text-lg">{t("cost.totalLandedCost")}</div>
              <div className="text-6xl font-bold drop-shadow-lg mb-3">
                ${costs.totalCost.toLocaleString()}
              </div>
              <div className="text-blue-100 text-lg">
                {quantity.toLocaleString()} unidades •{" "}
                <span className="font-bold text-white">${costs.perUnit} por unidad</span>
              </div>
            </div>
            <div className="w-36 h-36 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
              <DollarSign className="w-20 h-20" />
            </div>
          </div>
        </div>

        {/* ── Charts ───────────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="font-semibold text-[#0B3C5D] mb-6">{t("cost.costDistribution")}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%" cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="font-semibold text-[#0B3C5D] mb-6">{t("cost.supplierComparison")}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <XAxis dataKey="supplier" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="total" fill="#0B3C5D" name="Total Landed Cost" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Detailed Breakdown ────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
          <h2 className="font-semibold text-[#0B3C5D] mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {t("cost.detailedBreakdown")}
          </h2>

          <div className="space-y-4">
            {breakdownRows.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-${item.color}-100 flex items-center justify-center`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                  </div>
                  <div>
                    <div className="font-medium text-[#0B3C5D]">{t(item.labelKey)}</div>
                    <div className="text-sm text-slate-600">{item.details}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#0B3C5D]">
                    ${item.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600">
                    {((item.amount / costs.totalCost) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t-2 border-slate-200">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-xl text-[#0B3C5D]">{t("cost.totalLandedCost")}</div>
              <div className="text-3xl font-bold text-[#0B3C5D]">
                ${costs.totalCost.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* ── Insights ─────────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {t("cost.savingsTitle")}
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>{t("cost.saving1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>
                  Precio por unidad ${costs.perUnit} es{" "}
                  {costs.perUnit < budget / quantity ? "menor ✅" : "mayor ⚠️"} que
                  el presupuesto por unidad de ${(budget / quantity).toFixed(2)}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>{t("cost.saving3")}</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {t("cost.considerationsTitle")}
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{t("cost.consideration1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{t("cost.consideration2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{t("cost.consideration3")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}