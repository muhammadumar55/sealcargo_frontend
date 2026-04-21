import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Star, MapPin, Package, TrendingUp, CheckCircle, AlertCircle,
  ArrowRight, Filter, Mail, Phone, Heart, X, Zap, Award, Shield
} from "lucide-react";
import logo from "../../imports/cropped-seal-guatemala.png";
import { useLanguage } from "../context/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Supplier {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  moq: number;
  price: number;
  verified: boolean;
  location: string;
  yearsInBusiness: number;
  responseRate: number;
  tags: string[];
  aiScore: number;
  qualityScore: number;
  reliabilityScore: number;
  priceScore: number;
  contactEmail: string;
  contactPhone: string;
  isQualified?: boolean;
}

interface FilteredOutSupplier {
  name: string;
  reason: string;
  rating: number;
  responseRate?: number;
  yearsInBusiness?: number;
  verified?: boolean;
  reviews?: number;
  price?: number;
}

// ─── Mock Data (Fallback) ─────────────────────────────────────────────────────
const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 1,
    name: "Guangzhou Premium Furniture Co., Ltd",
    rating: 4.8,
    reviews: 1247,
    moq: 500,
    price: 45.50,
    verified: true,
    location: "Guangzhou, China",
    yearsInBusiness: 12,
    responseRate: 98,
    tags: ["Gold Supplier", "Verified", "Trade Assurance"],
    aiScore: 92,
    qualityScore: 95,
    reliabilityScore: 88,
    priceScore: 85,
    contactEmail: "sales@gzpremium.com",
    contactPhone: "+86 20 8888 9999",
  },
  {
    id: 2,
    name: "Shanghai Wooden Products Factory",
    rating: 4.6,
    reviews: 892,
    moq: 300,
    price: 42.00,
    verified: true,
    location: "Shanghai, China",
    yearsInBusiness: 8,
    responseRate: 95,
    tags: ["Verified", "Trade Assurance"],
    aiScore: 87,
    qualityScore: 88,
    reliabilityScore: 90,
    priceScore: 92,
    contactEmail: "info@shwoodenproducts.com",
    contactPhone: "+86 21 5555 6666",
  },
  {
    id: 3,
    name: "Foshan Elite Furniture Manufacturing",
    rating: 4.9,
    reviews: 2134,
    moq: 1000,
    price: 38.75,
    verified: true,
    location: "Foshan, China",
    yearsInBusiness: 15,
    responseRate: 99,
    tags: ["Gold Supplier", "Verified", "Audited"],
    aiScore: 98,
    qualityScore: 98,
    reliabilityScore: 99,
    priceScore: 98,
    contactEmail: "export@foshanelite.com",
    contactPhone: "+86 757 8888 1234",
  },
  {
    id: 4,
    name: "Shenzhen Modern Chairs Ltd",
    rating: 4.5,
    reviews: 567,
    moq: 200,
    price: 48.20,
    verified: true,
    location: "Shenzhen, China",
    yearsInBusiness: 6,
    responseRate: 92,
    tags: ["Verified"],
    aiScore: 82,
    qualityScore: 85,
    reliabilityScore: 84,
    priceScore: 75,
    contactEmail: "sales@szmodernchairs.com",
    contactPhone: "+86 755 3333 4444",
  },
  {
    id: 5,
    name: "Dongguan Quality Furniture Group",
    rating: 4.7,
    reviews: 1456,
    moq: 800,
    price: 40.30,
    verified: true,
    location: "Dongguan, China",
    yearsInBusiness: 10,
    responseRate: 96,
    tags: ["Gold Supplier", "Trade Assurance"],
    aiScore: 90,
    qualityScore: 91,
    reliabilityScore: 92,
    priceScore: 94,
    contactEmail: "contact@dgquality.com",
    contactPhone: "+86 769 7777 8888",
  },
  {
    id: 6,
    name: "Hangzhou Premium Wood Products",
    rating: 4.8,
    reviews: 1089,
    moq: 600,
    price: 44.80,
    verified: true,
    location: "Hangzhou, China",
    yearsInBusiness: 9,
    responseRate: 97,
    tags: ["Verified", "Audited"],
    aiScore: 89,
    qualityScore: 92,
    reliabilityScore: 88,
    priceScore: 86,
    contactEmail: "export@hzpremiumwood.com",
    contactPhone: "+86 571 6666 7777",
  },
  {
    id: 7,
    name: "Ningbo Furniture Export Center",
    rating: 4.6,
    reviews: 734,
    moq: 350,
    price: 46.50,
    verified: true,
    location: "Ningbo, China",
    yearsInBusiness: 7,
    responseRate: 94,
    tags: ["Gold Supplier", "Verified"],
    aiScore: 85,
    qualityScore: 86,
    reliabilityScore: 87,
    priceScore: 81,
    contactEmail: "sales@nbfurniture.com",
    contactPhone: "+86 574 8888 9999",
  },
  {
    id: 8,
    name: "Suzhou Classic Furniture Manufacturing",
    rating: 4.7,
    reviews: 981,
    moq: 450,
    price: 43.20,
    verified: true,
    location: "Suzhou, China",
    yearsInBusiness: 11,
    responseRate: 96,
    tags: ["Gold Supplier", "Trade Assurance", "Verified"],
    aiScore: 88,
    qualityScore: 89,
    reliabilityScore: 90,
    priceScore: 89,
    contactEmail: "info@suzhouclassic.com",
    contactPhone: "+86 512 5555 6666",
  },
  {
    id: 9,
    name: "Xiamen Wooden Chair Specialists",
    rating: 4.5,
    reviews: 612,
    moq: 250,
    price: 47.90,
    verified: true,
    location: "Xiamen, China",
    yearsInBusiness: 6,
    responseRate: 93,
    tags: ["Verified", "Trade Assurance"],
    aiScore: 83,
    qualityScore: 84,
    reliabilityScore: 85,
    priceScore: 78,
    contactEmail: "sales@xmwoodenchairs.com",
    contactPhone: "+86 592 3333 4444",
  },
  {
    id: 10,
    name: "Qingdao Budget Furniture Ltd",
    rating: 4.1,
    reviews: 234,
    moq: 100,
    price: 35.50,
    verified: false,
    location: "Qingdao, China",
    yearsInBusiness: 3,
    responseRate: 78,
    tags: [],
    aiScore: 45,
    qualityScore: 52,
    reliabilityScore: 48,
    priceScore: 95,
    contactEmail: "info@qdbudget.com",
    contactPhone: "+86 532 1111 2222",
  },
];

const MOCK_FILTERED_OUT: FilteredOutSupplier[] = [
  { name: "Wuhan Cheap Chairs Co.", reason: "Tasa de respuesta por debajo del 80%", rating: 3.8, responseRate: 65 },
  { name: "Tianjin Furniture Factory", reason: "Menos de 5 años en el negocio", rating: 4.2, yearsInBusiness: 2 },
  { name: "Chengdu Wood Products", reason: "Proveedor no verificado", rating: 4.0, verified: false },
  { name: "Zhengzhou Furniture Export", reason: "Reseñas insuficientes (< 400)", rating: 4.3, reviews: 187 },
  { name: "Shenyang Chair Manufacturing", reason: "Precio 25% por encima del promedio del mercado", rating: 4.5, price: 62.00 },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function SupplierResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  // ── Resolve data: use real API data if passed, otherwise use mock ──────────
  const apiData = location.state?.suppliers;

  const displaySuppliers: Supplier[] = apiData?.topSuppliers
    ? apiData.topSuppliers
    : MOCK_SUPPLIERS.filter((s) => s.aiScore >= 80).slice(0, 9);

  const filteredList: FilteredOutSupplier[] = apiData?.filteredOut
    ? apiData.filteredOut
    : MOCK_FILTERED_OUT;

  const totalAnalyzed: number = apiData?.totalAnalyzed ?? 15;

  // ── State ─────────────────────────────────────────────────────────────────
  // Initialize selectedSupplier safely from displaySuppliers
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>(
    displaySuppliers[0]
  );
  const [showFiltered, setShowFiltered] = useState(false);
  const [savedSuppliers, setSavedSuppliers] = useState<number[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [leadNotes, setLeadNotes] = useState("");

  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState("");
  const [contactError, setContactError] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // ── Handlers ──────────────────────────────────────────────────────────────
  const toggleSave = (id: number) => {
    setSavedSuppliers((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleContactSupplier = async () => {
    setContactLoading(true);
    setContactError("");

    try {
      const result = await api.contactSupplier({
        supplier: selectedSupplier,
        notes: leadNotes,
        userName,
        userEmail,
        quantity: location.state?.quantity || "1000",
        budget: location.state?.budget || "50000",
      });

      setContactSuccess(result.leadId);
      setLeadNotes("");
      setUserName("");
      setUserEmail("");
    } catch (err) {
      console.error("Contact failed:", err);
      setContactError("Failed to save lead. Please try again.");
    } finally {
      setContactLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      {/* ── Header Nav ─────────────────────────────────────────────────────── */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SEAL" className="h-10" />
            <span className="text-xl font-bold text-[#0B3C5D]">SmartTrade AI</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                navigate("/costs", {
                  state: {
                    supplier: selectedSupplier,
                    quantity: location.state?.quantity || "1000",
                    budget: location.state?.budget || "50000",
                    destination: location.state?.destination || "US",
                    productType: location.state?.productType || "furniture",
                  },
                })
              }
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white rounded-lg hover:from-blue-700 hover:to-[#0a2f47] transition-all flex items-center justify-center gap-2"
            >
              {t("suppliers.viewCostBreakdown")}
              <ArrowRight className="w-4 h-4" />
            </button>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* ── Page Content ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#0B3C5D] mb-2">
            {t("suppliers.title")}
          </h1>
          <p className="text-slate-600">
            {displaySuppliers.length} {t("suppliers.found")} •{" "}
            {filteredList.length} {t("suppliers.filtered")}
            <button
              onClick={() => setShowFiltered(!showFiltered)}
              className="ml-2 text-blue-600 hover:underline text-sm"
            >
              {showFiltered ? t("suppliers.hide") : t("suppliers.show")}{" "}
              {t("suppliers.filteredSuppliers")}
            </button>
          </p>
          {/* Show whether data is live or mock */}
          <p className="text-xs text-slate-400 mt-1">
            {apiData
              ? "✅ Live data from API"
              : "⚠️ Showing demo data — connect backend to see real suppliers"}
          </p>
        </div>

        {/* ── Filter Badge Row ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-900">
                {t("suppliers.qualityFilter")}
              </span>
            </div>
            <p className="text-sm text-green-700">{t("suppliers.qualityDesc")}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">
                {t("suppliers.trustFilter")}
              </span>
            </div>
            <p className="text-sm text-blue-700">{t("suppliers.trustDesc")}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-900">
                {t("suppliers.experienceFilter")}
              </span>
            </div>
            <p className="text-sm text-purple-700">
              {t("suppliers.experienceDesc")}
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-orange-900">
                {t("suppliers.aiScore")}
              </span>
            </div>
            <p className="text-sm text-orange-700">{t("suppliers.aiScoreDesc")}</p>
          </div>
        </div>

        {/* ── Filtered-Out Panel ────────────────────────────────────────────── */}
        {showFiltered && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-red-900 mb-4 flex items-center gap-2">
              <X className="w-5 h-5" />
              {filteredList.length} {t("suppliers.filteredOut")}
            </h3>
            <div className="space-y-2">
              {filteredList.map((supplier, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <span className="font-medium text-slate-700">
                      {supplier.name}
                    </span>
                    <span className="text-sm text-red-600 ml-3">
                      ⚠️ {supplier.reason}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {t("suppliers.notRecommended")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Main Grid ─────────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Left: Supplier Cards ──────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Sort Bar */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 flex items-center gap-4">
              <Filter className="w-5 h-5 text-slate-400" />
              <select className="flex-1 outline-none text-sm bg-transparent">
                <option>{t("suppliers.aiRecommended")}</option>
                <option>{t("suppliers.lowestPrice")}</option>
                <option>{t("suppliers.highestAI")}</option>
                <option>{t("suppliers.highestRating")}</option>
                <option>{t("suppliers.lowestMOQ")}</option>
              </select>
              <span className="text-sm text-slate-500">
                {displaySuppliers.length} {t("suppliers.results")}
              </span>
            </div>

            {/* Supplier Cards */}
            {displaySuppliers.map((supplier, index) => (
              <div
                key={supplier.id}
                className={`bg-white rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg relative ${selectedSupplier.id === supplier.id
                  ? "border-blue-500 shadow-lg"
                  : "border-slate-200"
                  }`}
              >
                {/* Gold / Silver / Bronze Badge */}
                {index < 3 && (
                  <div
                    className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg z-10 ${index === 0
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                      : index === 1
                        ? "bg-gradient-to-br from-slate-300 to-slate-400"
                        : "bg-gradient-to-br from-amber-600 to-amber-700"
                      }`}
                  >
                    #{index + 1}
                  </div>
                )}

                {/* Card Body */}
                <div
                  onClick={() => setSelectedSupplier(supplier)}
                  className="p-6"
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-[#0B3C5D]">
                          {supplier.name}
                        </h3>
                        {supplier.verified && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>

                      {/* AI Score Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-600">
                            {t("suppliers.matchScore")}
                          </span>
                          <span
                            className={`font-bold ${supplier.aiScore >= 90
                              ? "text-green-600"
                              : supplier.aiScore >= 80
                                ? "text-blue-600"
                                : "text-yellow-600"
                              }`}
                          >
                            {supplier.aiScore}/100
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${supplier.aiScore >= 90
                              ? "bg-gradient-to-r from-green-500 to-green-600"
                              : supplier.aiScore >= 80
                                ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                : "bg-gradient-to-r from-yellow-500 to-yellow-600"
                              }`}
                            style={{ width: `${supplier.aiScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Location & Rating */}
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {supplier.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {supplier.rating} ({supplier.reviews.toLocaleString()})
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-[#0B3C5D]">
                        ${supplier.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-slate-600">
                        {t("suppliers.perUnit")}
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <div className="text-xs text-slate-600 mb-1">
                        {t("suppliers.moq")}
                      </div>
                      <div className="font-semibold text-[#0B3C5D] text-sm">
                        {supplier.moq.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <div className="text-xs text-slate-600 mb-1">
                        {t("suppliers.experience")}
                      </div>
                      <div className="font-semibold text-[#0B3C5D] text-sm">
                        {supplier.yearsInBusiness}yr
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <div className="text-xs text-slate-600 mb-1">
                        {t("suppliers.response")}
                      </div>
                      <div className="font-semibold text-[#0B3C5D] text-sm">
                        {supplier.responseRate}%
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-xs text-green-700 mb-1">
                        {t("suppliers.quality")}
                      </div>
                      <div className="font-semibold text-green-700 text-sm">
                        {supplier.qualityScore}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {supplier.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {supplier.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Actions */}
                <div className="border-t border-slate-200 p-4 bg-slate-50 rounded-b-xl flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSupplier(supplier);
                      setShowContactModal(true);
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white rounded-lg hover:from-blue-700 hover:to-[#0a2f47] transition-all flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <Mail className="w-4 h-4" />
                    {t("suppliers.contact")}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(supplier.id);
                    }}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${savedSuppliers.includes(supplier.id)
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-slate-300 text-slate-600 hover:border-red-300 hover:bg-red-50"
                      }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${savedSuppliers.includes(supplier.id)
                        ? "fill-red-500 text-red-500"
                        : ""
                        }`}
                    />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-lg border-2 border-slate-300 text-slate-600 hover:bg-slate-100 transition-all"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Right: AI Insights Panel ──────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-6">
              <h2 className="font-semibold text-[#0B3C5D] mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                {t("suppliers.aiRanking")}
              </h2>

              {/* Selected Supplier Scores */}
              <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
                <div className="font-semibold text-[#0B3C5D] mb-3 text-sm leading-tight">
                  {selectedSupplier.name}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{t("suppliers.qualityScore")}</span>
                    <span className="font-semibold text-green-600">
                      {selectedSupplier.qualityScore}/100
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">
                      {t("suppliers.reliabilityScore")}
                    </span>
                    <span className="font-semibold text-blue-600">
                      {selectedSupplier.reliabilityScore}/100
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{t("suppliers.priceScore")}</span>
                    <span className="font-semibold text-purple-600">
                      {selectedSupplier.priceScore}/100
                    </span>
                  </div>
                  <div className="pt-2 border-t border-blue-300 flex items-center justify-between">
                    <span className="font-semibold text-[#0B3C5D]">
                      {t("suppliers.overallScore")}
                    </span>
                    <span className="text-2xl font-bold text-[#0B3C5D]">
                      {selectedSupplier.aiScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Insight Cards */}
              <div className="space-y-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-900 mb-1">
                        {t("suppliers.bestValue")}
                      </div>
                      <div className="text-sm text-green-700">
                        {displaySuppliers[0]?.name} {t("suppliers.bestValueDesc")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-900 mb-1">
                        {t("suppliers.moqAnalysis")}
                      </div>
                      <div className="text-sm text-blue-700">
                        3 {t("suppliers.moqAnalysisDesc")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-900 mb-1">
                        {t("suppliers.priceAlert")}
                      </div>
                      <div className="text-sm text-yellow-700">
                        {t("suppliers.priceAlertDesc")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Estimate */}
              <div className="pt-4 border-t border-slate-200 mb-6">
                <h3 className="font-medium text-[#0B3C5D] mb-3">
                  {t("suppliers.selectedSupplier")}
                </h3>
                <div className="text-sm text-slate-600 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>{t("suppliers.baseCost")}</span>
                    <span className="font-medium">
                      ${(selectedSupplier.price * 1000).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t("suppliers.estShipping")}</span>
                    <span className="font-medium">$4,200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t("suppliers.estDuties")}</span>
                    <span className="font-medium">$3,100</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 font-semibold text-[#0B3C5D]">
                    <span>{t("suppliers.totalEstimate")}</span>
                    <span>
                      ${(selectedSupplier.price * 1000 + 4200 + 3100).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                // Replace onClick={() => navigate("/costs")}
                onClick={() =>
                  navigate("/costs", {
                    state: {
                      supplier: selectedSupplier,
                      quantity: location.state?.quantity || "1000",
                      budget: location.state?.budget || "50000",
                      destination: location.state?.destination || "US",
                      productType: location.state?.productType || "furniture",
                    },
                  })
                }
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white rounded-lg hover:from-blue-700 hover:to-[#0a2f47] transition-all flex items-center justify-center gap-2"
              >
                {t("suppliers.viewCostBreakdown")}
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Saved Leads */}
              {savedSuppliers.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="font-semibold text-[#0B3C5D] mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                    {t("suppliers.savedLeads")} ({savedSuppliers.length})
                  </h3>
                  <div className="space-y-2">
                    {displaySuppliers
                      .filter((s) => savedSuppliers.includes(s.id))
                      .map((supplier) => (
                        <div
                          key={supplier.id}
                          className="text-sm p-2 bg-slate-50 rounded flex items-center justify-between"
                        >
                          <span className="text-slate-700 truncate">
                            {supplier.name.split(" ")[0]}
                          </span>
                          <span className="text-xs text-green-600 font-semibold">
                            {supplier.aiScore}
                          </span>
                        </div>
                      ))}
                  </div>
                  <button className="w-full mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold">
                    {t("suppliers.exportLeads")} ({savedSuppliers.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Contact / Lead Modal ──────────────────────────────────────────────── */}
      {/* ── Contact / Lead Modal ─────────────────────────────────────────────────── */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0B3C5D]">
                {t("suppliers.generateLead")}
              </h2>
              <button
                onClick={() => {
                  setShowContactModal(false);
                  setContactSuccess("");
                  setContactError("");
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* ── Success State ──────────────────────────────────────────────────── */}
            {contactSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0B3C5D] mb-2">
                  ¡Lead Guardado!
                </h3>
                <p className="text-slate-600 mb-2">
                  Nuestro equipo hará seguimiento dentro de 24 horas.
                </p>
                <p className="text-xs text-slate-400 font-mono mb-6">
                  ID: {contactSuccess}
                </p>
                <button
                  onClick={() => {
                    setShowContactModal(false);
                    setContactSuccess("");
                  }}
                  className="px-6 py-3 bg-[#0B3C5D] text-white rounded-lg hover:bg-[#0a2f47] transition-colors font-semibold"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                {/* Supplier Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="font-semibold text-[#0B3C5D] mb-2">
                    {selectedSupplier.name}
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      {selectedSupplier.contactEmail}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {selectedSupplier.contactPhone}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Award className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-600">
                        AI Score: {selectedSupplier.aiScore}/100
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t("suppliers.leadNotes")}
                    </label>
                    <textarea
                      value={leadNotes}
                      onChange={(e) => setLeadNotes(e.target.value)}
                      placeholder={t("suppliers.leadNotesPlaceholder")}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
                    />
                  </div>
                </div>

                {/* Error */}
                {contactError && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
                    ⚠️ {contactError}
                  </p>
                )}

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleContactSupplier}
                    disabled={contactLoading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white rounded-lg hover:from-blue-700 hover:to-[#0a2f47] transition-all font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {contactLoading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10"
                            stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Saving Lead...
                      </>
                    ) : (
                      t("suppliers.saveLead")
                    )}
                  </button>
                  <button
                    onClick={() => setShowContactModal(false)}
                    disabled={contactLoading}
                    className="w-full px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-60"
                  >
                    {t("suppliers.cancel")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}