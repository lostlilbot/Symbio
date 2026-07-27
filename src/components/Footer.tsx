"use client";

import { useI18n } from "@/i18n/context";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold text-sm">
              S
            </div>
            <span className="font-semibold text-sm text-slate-300">Symbio AI Academy</span>
          </div>
          <p className="text-xs text-slate-500 text-center md:text-right">
            &copy; {new Date().getFullYear()} Symbio AI Academy. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
