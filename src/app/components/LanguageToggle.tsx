import { useLanguage } from "../context/LanguageContext";
import usFlag from "../../imports/usa-flag.webp";
import gtFlag from "../../imports/guatemala-flag.png";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 sm:gap-1 bg-white/90 backdrop-blur-sm rounded-full p-0.5 sm:p-1 shadow-lg border border-slate-200">
      <button
        onClick={() => setLanguage("es")}
        className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer ${
          language === "es"
            ? "bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white shadow-md"
            : "text-slate-600 hover:bg-slate-100"
        }`}
        title="Español"
      >
        <img src={gtFlag} alt="Español" className="w-4 sm:w-6 h-auto object-contain" />
        <span className="text-[10px] sm:text-sm font-medium">ES</span>
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer ${
          language === "en"
            ? "bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white shadow-md"
            : "text-slate-600 hover:bg-slate-100"
        }`}
        title="English"
      >
        <img src={usFlag} alt="English" className="w-4 sm:w-6 h-auto object-contain" />
        <span className="text-[10px] sm:text-sm font-medium">EN</span>
      </button>
    </div>
  );
}