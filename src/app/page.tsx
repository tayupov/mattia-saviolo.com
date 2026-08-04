import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { LabelStrip } from "@/components/LabelStrip";
import { Showreel } from "@/components/Showreel";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Coaching } from "@/components/Coaching";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <Hero />
      <LabelStrip />
      <Showreel />
      <Services />
      <Testimonials />
      <Coaching />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
