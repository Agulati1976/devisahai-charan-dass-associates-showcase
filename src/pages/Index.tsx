import MarqueeBanner from "@/components/MarqueeBanner";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import PolymersSection from "@/components/PolymersSection";
import TextilesSection from "@/components/TextilesSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyUsSection from "@/components/WhyUsSection";
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
      <PolymersSection onOpenRFQ={openRFQ} />
      <TextilesSection onOpenRFQ={openRFQ} />
      <IndustriesSection />
      <WhyUsSection />
      <CTASection onOpenRFQ={openRFQ} />
    </>
  );
};

export default Index;
