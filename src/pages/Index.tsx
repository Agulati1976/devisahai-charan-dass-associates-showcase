import MarqueeBanner from "@/components/MarqueeBanner";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import PolymersSection from "@/components/PolymersSection";
import TextilesSection from "@/components/TextilesSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import { useOutletContext } from "react-router-dom";

interface ContextType {
  openRFQ: (product: string, grade: string, cat: string) => void;
}

const Index = () => {
  const { openRFQ } = useOutletContext<ContextType>();

  return (
    <>
      <MarqueeBanner />
      <HeroSection onOpenRFQ={openRFQ} />
      <TrustBar />
      <PolymersSection />
      <TextilesSection />
      <WhyUsSection />
      <FAQSection />
      <CTASection onOpenRFQ={openRFQ} />
    </>
  );
};

export default Index;
