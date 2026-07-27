import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CurriculumExplorer from "@/components/CurriculumExplorer";
import EnrollmentForm from "@/components/EnrollmentForm";
import ComplianceBadge from "@/components/ComplianceBadge";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <Hero />
      <CurriculumExplorer />
      <EnrollmentForm />
      <ComplianceBadge />
      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
