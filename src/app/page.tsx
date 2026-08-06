import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { LabelStrip } from "@/components/LabelStrip";
import { Portfolio } from "@/components/Portfolio";
import { Showreel } from "@/components/Showreel";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionDivider } from "@/components/SectionDivider";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <Hero />
      <Portfolio />
      <LabelStrip />
      <SectionDivider direction="up" from="dark" to="light" />
      <Showreel theme="light" />
      <Services theme="light" />
      <SectionDivider direction="down" from="light" to="dark" />
      <Testimonials />
      <SectionDivider direction="up" from="dark" to="light" />
      <ContactSection theme="light" />
      <SiteFooter theme="light" />
    </div>
  );
}
