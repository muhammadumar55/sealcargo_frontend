import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Send, MessageSquare, FileText, ArrowRight, Loader2 } from "lucide-react";
import logo from "../../imports/cropped-seal-guatemala.png";
import { useLanguage } from "../context/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { api } from "../../services/api";

interface Message {
  role: "user" | "ai";
  content: string;
  loading?: boolean;
}

export function ChatInterface() {
  const navigate = useNavigate();
  const location = useLocation();
  const { query, name, email } = location.state || {};
  const { t } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: `${name ? `¡Hola ${name}!` : "¡Hola!"} Soy tu experto en abastecimiento y aduanas impulsado por IA. Déjame ayudarte con: "${query || "tu solicitud de importación"}". ¿En qué puedo ayudarte?`,
    },
    {
      role: "ai",
      content:
        "Puedo ayudarte a encontrar proveedores, calcular costos de importación, entender aranceles y documentación aduanera. ¿Qué necesitas saber?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversations] = useState([
    "Importación de sillas de madera",
    "Electrónica desde China",
    "Proveedores de textiles",
  ]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Show typing indicator
    setIsTyping(true);
    setMessages((prev) => [
      ...prev,
      { role: "ai", content: "", loading: true },
    ]);

    try {
      const { reply } = await api.chat(userMessage, {
        userName: name,
        userEmail: email,
        currentQuery: query,
        page: "chat",
      });

      // Replace loading message with real reply
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", content: reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "ai",
          content:
            "Lo siento, tuve un problema al procesar tu mensaje. Por favor intenta de nuevo.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 to-blue-50">

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <div className="w-64 bg-white/80 backdrop-blur-lg border-r border-slate-200 flex flex-col shadow-xl">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="SEAL" className="h-8" />
            <span className="font-bold text-[#0B3C5D]">SmartTrade AI</span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white rounded-xl hover:from-blue-700 hover:to-[#0a2f47] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <MessageSquare className="w-4 h-4" />
            {t("chat.newAnalysis")}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
            {t("chat.conversations")}
          </h3>
          {conversations.map((conv, i) => (
            <div
              key={i}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-sm text-slate-700 mb-1 transition-colors"
            >
              {conv}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200">
          <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
            {t("chat.savedReports")}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-[#0B3C5D] transition-colors">
              <FileText className="w-4 h-4" />
              <span>Informe #1234</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Chat Area ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 py-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#0B3C5D]">
                {t("chat.title")}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {t("chat.subtitle")} •{" "}
                
              </p>
            </div>
            <LanguageToggle />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-2xl ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white shadow-lg"
                    : "bg-white border border-slate-200 shadow-md"
                } rounded-2xl px-6 py-4`}
              >
                {msg.role === "ai" && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-[#0B3C5D]">AI</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      SEAL Assistant
                    </span>
                  </div>
                )}

                {/* Loading dots */}
                {msg.loading ? (
                  <div className="flex items-center gap-1 py-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                ) : (
                  <p
                    className={
                      msg.role === "user" ? "text-white" : "text-slate-700"
                    }
                  >
                    {msg.content}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* CTA Card */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 max-w-2xl">
            <h3 className="font-semibold text-[#0B3C5D] mb-2">
              {t("chat.ctaTitle")}
            </h3>
            <p className="text-sm text-slate-600 mb-4">{t("chat.ctaDesc")}</p>
            <button
              onClick={() =>
                navigate("/qualify", {
                  state: { query, name, email },
                })
              }
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white rounded-xl hover:from-blue-700 hover:to-[#0a2f47] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              {t("chat.ctaButton")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white/80 backdrop-blur-lg border-t border-slate-200 p-6 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center gap-3 bg-white rounded-xl px-5 py-4 border-2 border-slate-200 shadow-md focus-within:border-blue-500 focus-within:shadow-lg transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSend()
              }
              placeholder={t("chat.placeholder")}
              disabled={isTyping}
              className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-[#0B3C5D] text-white hover:from-blue-700 hover:to-[#0a2f47] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {isTyping ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">
           Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
}
