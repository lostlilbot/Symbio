"use client";

import React, { useState } from "react";
import { PillarIcons, GradeIcons } from "./icons";
import { gradesData, levelStyles, pillarFilterStyles, pillarMeta, type PillarId, type GradeLevel } from "@/data/curriculum";
import { useI18n } from "@/i18n/context";

type Pillar = PillarId;
type PillarFilter = PillarId | "all";

interface Lab {
  name: string;
  type: string;
  tools: string[];
}

interface Course {
  id: string;
  title: string;
  pillar: Pillar;
  description: string;
  level: "Foundation" | "Intermediate" | "Advanced" | "Capstone";
  duration: string;
  labs: Lab[];
  outcomes: string[];
}

interface GradeData {
  grade: number;
  theme: string;
  courses: Course[];
}

const pillarMetaLocal: Record<Pillar | "all", { id: Pillar | "all"; name: string; color: string; icon: React.ReactElement }> = {
  all: { id: "all", name: "All Pillars", color: "slate", icon: <></> },
  "ai-mastery": { id: "ai-mastery", name: "AI Mastery", color: "cyan", icon: <PillarIcons.AIMastery className="w-5 h-5" /> },
  "human-edge": { id: "human-edge", name: "Human Edge", color: "emerald", icon: <PillarIcons.HumanEdge className="w-5 h-5" /> },
  "ethics-leadership": { id: "ethics-leadership", name: "Ethics & Leadership", color: "violet", icon: <PillarIcons.EthicsLeadership className="w-5 h-5" /> },
  "interdisciplinary": { id: "interdisciplinary", name: "Interdisciplinary", color: "amber", icon: <PillarIcons.Interdisciplinary className="w-5 h-5" /> },
};

export default function CurriculumExplorer() {
  const { t } = useI18n();
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(9);
  const [selectedPillar, setSelectedPillar] = useState<PillarFilter>("all");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const currentData = gradesData.find((g) => g.grade === selectedGrade)!;
  const courses = currentData.courses.filter((c) => selectedPillar === "all" || c.pillar === selectedPillar);

  return (
    <section id="curriculum" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Interactive <span className="glow-text">Curriculum Explorer</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t("curriculum.interactiveSubtitle")}
          </p>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {[9, 10, 11, 12].map((grade) => {
              const data = gradesData.find((g) => g.grade === grade)!;
              const GradeIcon = GradeIcons[`Grade${grade}` as keyof typeof GradeIcons];
              return (
                <button
                  key={grade}
                  onClick={() => { setSelectedGrade(grade as GradeLevel); setExpandedCourse(null); }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    selectedGrade === grade ? "bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)]" : "glass hover:bg-white/10 text-slate-300"
                  }`}
                >
                  <GradeIcon className="w-4 h-4" />
                  Grade {grade}
                </button>
              );
            })}
          </div>
          <span className="text-xs text-slate-500 font-medium">{currentData.theme}</span>
        </div>

        <div className="mb-10 flex flex-wrap gap-2 justify-center">
          {Object.values(pillarMetaLocal).map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => { setSelectedPillar(pillar.id as Pillar); setExpandedCourse(null); }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-xs uppercase tracking-wider transition-all duration-300 border ${
                selectedPillar === pillar.id ? `${pillarFilterStyles[pillar.id].bg} ${pillarFilterStyles[pillar.id].text} border-white/20` : "glass text-slate-400 border-transparent"
              }`}
            >
              {pillar.icon}
              {pillar.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {courses.map((course, idx) => {
            const meta = pillarMetaLocal[course.pillar];
            const style = levelStyles[course.level];
            const isExpanded = expandedCourse === course.id;
            return (
              <div
                key={course.id}
                className="glass rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${style.bg} ${style.text} border ${style.border}`}>
                        {meta.icon}
                        {meta.name}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {course.level}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium text-slate-400 bg-slate-900/60 border border-slate-800">
                        {course.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{t(`curriculum.courses.${course.id}.title`)}</h3>
                    <p className="text-xs text-red-400 font-medium mb-2">{t("curriculum.clickForDetails")}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{t(`curriculum.courses.${course.id}.description`)}</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-500 shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? "rotate-180 text-cyan-400" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-white/10 animate-fade-in-up space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">{t("curriculum.sections.labs")}</p>
                      <div className="grid grid-cols-1 gap-3">
                        {course.labs.map((lab) => (
                          <div key={lab.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-sm text-white">{lab.name}</span>
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 border border-slate-700 rounded-full px-2 py-0.5">{lab.type}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {lab.tools.map((tool) => (
                                <span key={tool} className="px-2 py-1 rounded-md bg-slate-950/40 text-cyan-300 text-[10px] font-medium border border-cyan-500/10">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">{t("curriculum.sections.outcomes")}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {course.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-2 text-sm text-slate-300">
                            <svg className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
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
    </section>
  );
}
