export default function ComplianceBadge() {
  return (
    <section id="contact" className="py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
                Privacy & <span className="glow-text">Compliance</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Symbio AI Academy is committed to student data protection and responsible AI use. We operate under strict privacy standards to keep learner data safe, anonymous, and never used for model training.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/20">
                  Zero Data-Training API
                </span>
                <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                  FERPA Aligned
                </span>
                <span className="px-4 py-2 rounded-full bg-violet-500/10 text-violet-300 text-xs font-semibold border border-violet-500/20">
                  De-Identified Proxies
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Zero Data-Training API Sandboxing", desc: "All student data is processed within isolated sandboxed environments and never used to train external or internal models." },
                { title: "FERPA School Official Alignment", desc: "Our platforms align with FERPA guidelines for educational records, ensuring compliance and lawful data stewardship." },
                { title: "Automated De-Identification", desc: "We use automated proxy standards to de-identify student data, protecting identities while preserving valuable learning outcomes." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
