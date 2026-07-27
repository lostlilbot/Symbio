"use client";

import { useState } from "react";

type GradeLevel = 9 | 10 | 11 | 12;
type Pillar = "all" | "ai-mastery" | "human-edge" | "ethics-leadership" | "interdisciplinary";

interface Course {
  title: string;
  pillar: Pillar;
  description: string;
  labs?: string[];
}

const grades: Record<number, Course[]> = {
  9: [
    { title: "Foundations of Prompt Engineering", pillar: "ai-mastery", description: "Master the art of communicating with AI systems effectively and ethically." },
    { title: "Logic & Algorithmic Thinking", pillar: "ai-mastery", description: "Build computational thinking skills through puzzles, flowcharts, and basic algorithms." },
    { title: "Introduction to Collaborative Robotics", pillar: "interdisciplinary", description: "Work with robots to solve real-world challenges through teamwork and code.", labs: ["Autonomous Agent Swarms Lab"] },
    { title: "Digital Citizenship & Safety", pillar: "ethics-leadership", description: "Understand online rights, privacy, and responsible digital behavior." },
  ],
  10: [
    { title: "Multi-Agent Orchestration Systems", pillar: "ai-mastery", description: "Design intelligent systems where multiple AI agents collaborate autonomously.", labs: ["Autonomous Agent Swarms Lab", "RAG Knowledge Bases Lab"] },
    { title: "Advanced Creative Communication", pillar: "human-edge", description: "Develop persuasive storytelling, public speaking, and multimodal communication." },
    { title: "AI Ethics & Global Bias Auditing", pillar: "ethics-leadership", description: "Audit real AI systems for fairness, transparency, and bias across cultures.", labs: ["Multi-Persona Fact-Checking Lab"] },
    { title: "Biomimetic Design", pillar: "interdisciplinary", description: "Apply nature-inspired innovation to engineering and design challenges.", labs: ["Biomimetic Innovation Challenges"] },
  ],
  11: [
    { title: "Autonomous Workflow Automation", pillar: "ai-mastery", description: "Engineer end-to-end automated workflows using AI pipelines and orchestration tools." },
    { title: "Complex Negotiation & Systems Thinking", pillar: "human-edge", description: "Master negotiation theory and high-level systems thinking for global problems." },
    { title: "Corporate Governance in the Age of AI", pillar: "ethics-leadership", description: "Analyze AI regulation, board-level decision-making, and corporate responsibility." },
    { title: "Quantitative Modeling", pillar: "interdisciplinary", description: "Use AI and mathematics to model climate, economics, and biological systems." },
  ],
  12: [
    { title: "Capstone Autonomous Application Deployment", pillar: "ai-mastery", description: "Deploy a production-grade AI application from concept to launch.", labs: ["RAG Knowledge Bases Lab", "Autonomous Agent Swarms Lab"] },
    { title: "Advanced Leadership & Public Speaking", pillar: "human-edge", description: "Lead teams, present at conferences, and build executive presence." },
    { title: "AI-Driven Venture Incubation", pillar: "ethics-leadership", description: "Launch an AI-powered startup with ethical business model design." },
    { title: "Interdisciplinary Research Thesis", pillar: "interdisciplinary", description: "Conduct publishable research at the intersection of AI and another discipline.", labs: ["Multi-Persona Fact-Checking Lab", "Biomimetic Innovation Challenges"] },
  ],
};

const pillars_: Record<string, { id: Pillar; name: string; badgeClass: string }> = {
  "all": { id: "all", name: "All Pillars", badgeClass: "bg-slate-500/15 text-slate-300 border-slate-500/30" },
  "ai-mastery": { id: "ai-mastery", name: "AI Mastery", badgeClass: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30" },
  "human-edge": { id: "human-edge", name: "Human Edge", badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  "ethics-leadership": { id: "ethics-leadership", name: "Ethics & Leadership", badgeClass: "bg-violet-500/15 text-violet-300 border-violet-500/30" },
  "interdisciplinary": { id: "interdisciplinary", name: "Interdisciplinary", badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
};

const pillarLabel: Record<string, { pillClass: string; pillbg: string }> = {
  "ai-mastery": { pillClass: "bg-cyan-500/15 text-cyan-300", pillbg: "bg-gradient-to-r from-cyan-500 to-emerald-400" },
  "human-edge": { pillClass: "bg-emerald-500/15 text-emerald-300", pillbg: "bg-gradient-to-r from-emerald-500 to-cyan-400" },
  "ethics-leadership": { pillClass: "bg-violet-500/15 text-violet-300", pillbg: "bg-gradient-to-r from-violet-500 to-fuchsia-400" },
  "interdisciplinary": { pillClass: "bg-amber-500/15 text-amber-300", pillbg: "bg-gradient-to-r from-amber-500 to-orange-400" },
};

export default function CurriculumExplorer() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(9);
  const [selectedPillar, setSelectedPillar] = useState<Pillar>("all");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const courses = grades[selectedGrade].filter((c) => selectedPillar === "all" || c.pillar === selectedPillar);

  return (
    <section id="curriculum" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Interactive <span className="glow-text">Curriculum Explorer</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore our rigorous, AI-first curriculum designed for Grades 9–12. Select a grade level and pillar to discover transformative courses and hands-on labs.
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {[9, 10, 11, 12].map((grade) => (
              <button
                key={grade}
                onClick={() => { setSelectedGrade(grade as GradeLevel); setExpandedCourse(null); }}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedGrade === grade ? "bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)]" : "glass hover:bg-white/10 text-slate-300"
                }`}
              >
                Grade {grade}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2 justify-center">
          {Object.values(pillars_).map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => { setSelectedPillar(pillar.id); setExpandedCourse(null); }}
              className={`px-4 py-2 rounded-full font-medium text-xs uppercase tracking-wider transition-all duration-300 border ${
                selectedPillar === pillar.id ? pillar.badgeClass : "glass text-slate-400 border-transparent"
              }`}
            >
              {pillar.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {courses.map((course) => {
            const style = pillarLabel[course.pillar];
            const isExpanded = expandedCourse === course.title;
            return (
              <div
                key={course.title}
                className="glass rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedCourse(isExpanded ? null : course.title)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${style.pillClass}`}>
                      {pillars_[course.pillar]?.name || course.pillar}
                    </span>
                    <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{course.description}</p>
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
                {isExpanded && course.labs && (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in-up">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Featured Labs</p>
                    <div className="flex flex-wrap gap-2">
                      {course.labs.map((lab) => (
                        <span key={lab} className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">
                          {lab}
                        </span>
                      ))}
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
