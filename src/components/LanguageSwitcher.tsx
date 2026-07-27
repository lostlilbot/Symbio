"use client";

import { useI18n } from "@/i18n/context";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage("en")}
        className={`text-xs font-medium px-2 py-1 rounded-md transition-all ${
          language === "en" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
        }`}
      >
        EN
      </button>
      <span className="text-slate-600 text-xs">|</span>
      <button
        onClick={() => setLanguage("es")}
        className={`text-xs font-medium px-2 py-1 rounded-md transition-all ${
          language === "es" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
        }`}
      >
        ES
      </button>
    </div>
  );
}
