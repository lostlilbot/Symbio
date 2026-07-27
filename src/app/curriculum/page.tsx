"use client";

import React, { useState } from "react";
import { pillars, gradesData, pillarMeta, levelStyles, type PillarId, type GradeLevel } from "@/data/curriculum";
import { PillarIcons } from "@/components/icons";
import { useI18n } from "@/i18n/context";

const pillarColorMap: Record<PillarId, { from: string; to: string; border: string; text: string; bg: string; light: string }> = {
  "ai-mastery": { from: "from-cyan-500", to: "to-emerald-400", border: "border-cyan-500/30", text: "text-cyan-400", bg: "bg-cyan-500/10", light: "bg-cyan-500/5" },
  "human-edge": { from: "from-emerald-500", to: "to-cyan-400", border: "border-emerald-500/30", text: "text-emerald-400", bg: "bg-emerald-500/10", light: "bg-emerald-500/5" },
  "ethics-leadership": { from: "from-violet-500", to: "to-fuchsia-400", border: "border-violet-500/30", text: "text-violet-400", bg: "bg-violet-500/10", light: "bg-violet-500/5" },
  "interdisciplinary": { from: "from-amber-500", to: "to-orange-400", border: "border-amber-500/30", text: "text-amber-400", bg: "bg-amber-500/10", light: "bg-amber-500/5" },
};

const gradeThemes: Record<GradeLevel, string> = {
  9: "Foundations of Intelligence",
  10: "Intermediate Intelligence",
  11: "Advanced Intelligence",
  12: "Capstone & Mastery",
};

export default function CurriculumPage() {
  const { t } = useI18n();
  const [activePillar, setActivePillar] = useState<PillarId>("ai-mastery");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const activePillarData = pillars.find((p) => p.id === activePillar)!;
  const activeCourses = gradesData
    .map((g) => ({
      grade: g.grade,
      theme: g.theme,
      courses: g.courses.filter((c) => c.pillar === activePillar),
    }))
    .filter((g) => g.courses.length > 0);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">Full Curriculum</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              The Four <span className="glow-text">Pillars</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              {t("curriculum.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {pillars.map((pillar, idx) => {
              const colors = pillarColorMap[pillar.id];
              const isActive = activePillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => { setActivePillar(pillar.id); setExpandedCourse(null); }}
                  className={`glass rounded-2xl p-6 text-left transition-all duration-300 group ${
                    isActive ? `glow-border ${colors.light}` : "hover:border-white/20"
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-xl ${colors.bg} ${colors.text}`}>
                      {pillar.id === "ai-mastery" && <PillarIcons.AIMastery className="w-6 h-6" />}
                      {pillar.id === "human-edge" && <PillarIcons.HumanEdge className="w-6 h-6" />}
                      {pillar.id === "ethics-leadership" && <PillarIcons.EthicsLeadership className="w-6 h-6" />}
                      {pillar.id === "interdisciplinary" && <PillarIcons.Interdisciplinary className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-mono text-slate-400">{pillar.weight}%</span>
                  </div>

                  <h3 className={`text-base font-semibold mb-2 ${isActive ? colors.text : "text-white"}`}>
                    {pillar.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{pillar.description}</p>

                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${colors.from} ${colors.to} transition-all duration-1000 ease-out`}
                      style={{ width: `${pillar.weight}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {pillar.labs.map((lab) => (
                      <span key={lab} className="px-2 py-1 rounded-md bg-slate-950/40 text-slate-400 text-[10px] font-medium border border-white/5">
                        {lab}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${pillarColorMap[activePillar].bg} ${pillarColorMap[activePillar].text} border ${pillarColorMap[activePillar].border} mb-4`}>
              {activePillar === "ai-mastery" && <PillarIcons.AIMastery className="w-4 h-4" />}
              {activePillar === "human-edge" && <PillarIcons.HumanEdge className="w-4 h-4" />}
              {activePillar === "ethics-leadership" && <PillarIcons.EthicsLeadership className="w-4 h-4" />}
              {activePillar === "interdisciplinary" && <PillarIcons.Interdisciplinary className="w-4 h-4" />}
              <span className="text-xs font-bold uppercase tracking-wider">{activePillarData.name}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              {activePillarData.name}
            </h2>
            <p className="text-slate-400 max-w-2xl">
              {activePillarData.description}. Below is every subject in this pillar, organized by grade level, with full lab specifications and learning outcomes.
            </p>
          </div>

          <div className="space-y-12">
            {activeCourses.map((group) => (
              <div key={group.grade}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Grade {group.grade} — {group.theme}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {group.courses.map((course) => {
                    const meta = pillarMeta[course.pillar];
                    const style = levelStyles[course.level];
                    const isExpanded = expandedCourse === course.id;
                    const colors = pillarColorMap[course.pillar];

                    return (
                      <div
                        key={course.id}
                        className={`glass rounded-2xl transition-all duration-300 ${
                          isExpanded ? `glow-border ${colors.light}` : "hover:border-white/20"
                        }`}
                      >
                        <div
                          className="p-6 cursor-pointer"
                          onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${style.bg} ${style.text} border ${style.border}`}>
                                  {course.level}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-medium text-slate-400 bg-slate-900/60 border border-slate-800">
                                  {course.duration}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-medium text-slate-500 bg-slate-950/40 border border-white/5">
                                  Grade {group.grade}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{course.title}</h3>
                              <p className="text-xs text-red-400 font-medium mb-2">{t("curriculum.clickForDetails")}</p>
                              <p className="text-sm text-slate-400 leading-relaxed">{course.description}</p>
                            </div>
                            <svg
                              className={`w-5 h-5 text-slate-500 shrink-0 mt-1 transition-transform duration-300 ${
                                isExpanded ? "rotate-180 text-cyan-400" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="px-6 pb-6 pt-0 animate-fade-in-up space-y-6">
                            <div className="h-px bg-white/10" />

                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">{t("curriculum.sections.labs")}</p>
                              <div className="grid grid-cols-1 gap-3">
                                {course.labs.map((lab) => (
                                  <div key={lab.name} className="rounded-xl border border-white/10 bg-white/5 p-5">
                                    <div className="flex items-center justify-between mb-3">
                                      <span className="font-semibold text-sm text-white">{lab.name}</span>
                                      <span className="text-[10px] uppercase tracking-wider text-slate-400 border border-slate-700 rounded-full px-2 py-0.5">
                                        {lab.type}
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {lab.tools.map((tool) => (
                                        <span
                                          key={tool}
                                          className="px-2.5 py-1.5 rounded-lg bg-slate-950/40 text-cyan-300 text-xs font-medium border border-cyan-500/10"
                                        >
                                          {tool}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">{t("curriculum.sections.outcomes")}</p>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {course.outcomes.map((outcome) => (
                                  <li key={outcome} className="flex items-start gap-3 text-sm text-slate-300">
                                    <svg className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    {outcome}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
