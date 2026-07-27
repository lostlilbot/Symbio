"use client";

import { useI18n } from "@/i18n/context";

const pillars = [
  {
    id: "ai-mastery",
    name: "AI Mastery & Tech Literacy",
    weight: 35,
    color: "cyan",
    description: "Advanced AI fluency, coding, and autonomous systems",
    labs: ["Multi-Persona Fact-Checking", "Autonomous Agent Swarms", "RAG Knowledge Bases"],
  },
  {
    id: "human-edge",
    name: "Human Edge Skills",
    weight: 25,
    color: "emerald",
    description: "Critical thinking, creativity, and emotional intelligence",
    labs: ["Biomimetic Innovation Challenges", "Collaborative Problem Solving"],
  },
  {
    id: "ethics-leadership",
    name: "Ethics, Society & Leadership",
    weight: 20,
    color: "violet",
    description: "Responsible AI stewardship and global citizenship",
    labs: ["AI Policy Simulation", "Ethical AI Red-Teaming"],
  },
  {
    id: "interdisciplinary",
    name: "Interdisciplinary Domains",
    weight: 20,
    color: "amber",
    description: "AI applied across science, arts, and real-world domains",
    labs: ["AI in Climate Science", "Computational Art & Music"],
  },
];

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">{t("home.tagline")}</span>
        </div>

        <div className="mx-auto mb-8 w-40 h-40 sm:w-56 sm:h-56 relative animate-scale-in">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-emerald-400/30 blur-2xl" />
          <div className="relative w-full h-full rounded-full overflow-hidden ring-[0.5px] ring-white/40 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <img src="/symbio-logo.jpg" alt="Symbio AI Academy Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {t("home.heroTitle")}{" "}
          <span className="glow-text">AI Academy</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {t("home.heroSubtitle")}
        </p>

        <p className="text-base text-slate-400 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {t("home.heroDescription")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <a
            href="/curriculum"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-semibold hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300"
          >
            {t("home.ctaExplore")}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
          <a
            href="#admissions"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full glass hover:bg-white/10 transition-all duration-300"
          >
            {t("home.ctaApply")}
          </a>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">The Four Pillars</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                className="glass rounded-2xl p-5 text-left group hover:border-cyan-500/30 transition-all duration-300"
                style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={
                    pillar.id === 'ai-mastery' ? 'text-cyan-400' :
                    pillar.id === 'human-edge' ? 'text-emerald-400' :
                    pillar.id === 'ethics-leadership' ? 'text-violet-400' :
                    'text-amber-400'
                  }>
                    {pillar.name.split(" ")[0]}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{pillar.weight}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-3">
                  <div
                    className={
                      `h-full rounded-full transition-all duration-1000 ease-out ` +
                      (pillar.id === 'ai-mastery' ? 'bg-gradient-to-r from-cyan-500 to-emerald-400' :
                       pillar.id === 'human-edge' ? 'bg-gradient-to-r from-emerald-500 to-cyan-400' :
                       pillar.id === 'ethics-leadership' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-400' :
                       'bg-gradient-to-r from-amber-500 to-orange-400')
                    }
                    style={{ width: `${pillar.weight}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
