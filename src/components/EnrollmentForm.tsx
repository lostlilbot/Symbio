"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "50495924662";

function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const tracks = [
  { value: "ai-engineering", label: "AI Engineering" },
  { value: "human-leadership", label: "Human Leadership" },
  { value: "ethics-society", label: "Ethics & Society" },
  { value: "interdisciplinary", label: "Interdisciplinary Studies" },
];

type Step = 1 | 2 | 3 | 4;

export default function EnrollmentForm() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    grade: "9",
    email: "",
    country: "",
    track: "",
    statement: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [referenceId, setReferenceId] = useState("");

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.grade) newErrors.grade = "Grade level is required";
    if (!formData.email.trim() || !formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.track) newErrors.track = "Please select a primary focus area";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.statement.trim() || formData.statement.trim().length < 30) newErrors.statement = "Please write at least 30 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) {
      const id = `SAA-${Date.now().toString(36).toUpperCase()}`;
      setReferenceId(id);
      setStep(4);
    }
  };

  const sendViaWhatsApp = () => {
    const message = [
      `Hello Symbio AI Academy Admissions,`,
      ``,
      `I would like to submit my application.`,
      `Reference ID: ${referenceId || "N/A"}`,
      ``,
      `Student Details:`,
      `Name: ${formData.fullName}`,
      `Age: ${formData.age}`,
      `Grade: ${formData.grade}`,
      `Email: ${formData.email}`,
      `Country: ${formData.country}`,
      `Focus Track: ${tracks.find(t => t.value === formData.track)?.label || formData.track}`,
      ``,
      `Statement of Intent:`,
      formData.statement,
    ].join("\n");
    window.open(buildWhatsAppUrl(message), "_blank");
  };

  const inputClass = "w-full rounded-xl bg-slate-900/80 border border-slate-700 px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300";

  return (
    <section id="admissions" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Student <span className="glow-text">Enrollment</span>
          </h2>
          <p className="text-slate-400">Begin your journey at Symbio AI Academy. Complete the steps below to start your application.</p>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-10">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    step >= s ? "bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950" : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {s}
                </div>
                {s < 4 && <div className={`hidden sm:block h-0.5 w-8 ${step > s ? "bg-gradient-to-r from-cyan-500 to-emerald-400" : "bg-slate-800"}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-5 animate-fade-in-up">
              <h3 className="text-xl font-semibold mb-2">Student & Guardian Details</h3>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input type="text" value={formData.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter full name" className={inputClass} />
                {errors.fullName && <p className="text-red-400 text-xs mt-2">{errors.fullName}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Age</label>
                  <input type="number" value={formData.age} onChange={(e) => update("age", e.target.value)} placeholder="Age" className={inputClass} />
                  {errors.age && <p className="text-red-400 text-xs mt-2">{errors.age}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Entering Grade</label>
                  <select value={formData.grade} onChange={(e) => update("grade", e.target.value)} className={inputClass}>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} placeholder="student@example.com" className={inputClass} />
                {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Country / Location</label>
                <input type="text" value={formData.country} onChange={(e) => update("country", e.target.value)} placeholder="Country" className={inputClass} />
                {errors.country && <p className="text-red-400 text-xs mt-2">{errors.country}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fade-in-up">
              <h3 className="text-xl font-semibold mb-2">Track & Interest Selection</h3>
              <p className="text-sm text-slate-400 mb-4">Choose the primary focus area that aligns with your passion.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tracks.map((track) => (
                  <button
                    key={track.value}
                    onClick={() => update("track", track.value)}
                    className={`p-4 rounded-xl text-left border transition-all duration-300 ${
                      formData.track === track.value ? "border-cyan-500/60 bg-cyan-500/10 text-white" : "border-slate-700 hover:border-white/20 text-slate-300"
                    }`}
                  >
                    <span className="font-semibold">{track.label}</span>
                  </button>
                ))}
              </div>
              {errors.track && <p className="text-red-400 text-xs mt-2">{errors.track}</p>}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-fade-in-up">
              <h3 className="text-xl font-semibold mb-2">Statement of Intent</h3>
              <p className="text-sm text-slate-400 mb-4">Tell us why you want to join an AI-primary academy and what you hope to build.</p>
              <textarea
                value={formData.statement}
                onChange={(e) => update("statement", e.target.value)}
                rows={6}
                placeholder="I want to join Symbio AI Academy because..."
                className={inputClass + " resize-none"}
              />
              {errors.statement && <p className="text-red-400 text-xs mt-2">{errors.statement}</p>}
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 flex items-center justify-center mx-auto text-slate-950">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              </div>
              <h3 className="text-2xl font-bold">Application Received</h3>
              <p className="text-slate-400">Your application has been recorded. Save or send it to our admissions team via WhatsApp.</p>
              <div className="glass rounded-xl p-5 text-left space-y-2">
                <p className="text-sm text-slate-400">Reference ID</p>
                <p className="text-lg font-mono text-cyan-400">{referenceId}</p>
                <div className="pt-3 border-t border-white/10 text-xs text-slate-400 space-y-1">
                  <p><span className="font-semibold text-slate-300">Name:</span> {formData.fullName}</p>
                  <p><span className="font-semibold text-slate-300">Grade:</span> {formData.grade}</p>
                  <p><span className="font-semibold text-slate-300">Track:</span> {tracks.find(t => t.value === formData.track)?.label}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={buildWhatsAppUrl(
                    [
                      `Hello Symbio AI Academy Admissions,`,
                      ``,
                      `I have completed my application.`,
                      `Reference ID: ${referenceId}`,
                      ``,
                      `Name: ${formData.fullName}`,
                      `Grade: ${formData.grade}`,
                      `Track: ${tracks.find(t => t.value === formData.track)?.label}`,
                    ].join("\n")
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-semibold hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
                >
                  Send via WhatsApp
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.003 0C5.926 0 .691 5.307.69 11.482c0 2.062.538 4.107 1.556 5.928L0 24l6.332-1.662A11.77 11.77 0 0012.003 24c6.074 0 11.316-5.31 11.317-11.479a11.82 11.82 0 00-3.46-8.618z"/></svg>
                </a>
                <button
                  onClick={sendViaWhatsApp}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full glass hover:bg-white/10 transition-all duration-300"
                >
                  Send Inquiry via WhatsApp
                </button>
              </div>
            </div>
          )}

          {step < 4 && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={nextStep}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-semibold hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
              >
                {step === 3 ? "Submit Application" : "Continue"}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
