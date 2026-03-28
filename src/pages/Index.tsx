import { useState, useCallback } from "react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import MarqueeBanner from "@/components/MarqueeBanner";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import PolymersSection from "@/components/PolymersSection";
import TextilesSection from "@/components/TextilesSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyUsSection from "@/components/WhyUsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import RFQDrawer from "@/components/RFQDrawer";

const Index = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rfqData, setRfqData] = useState({ product: "", grade: "", category: "" });

  const openRFQ = useCallback((product: string, grade: string, category: string) => {
    setRfqData({ product, grade, category });
    setDrawerOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeRFQ = useCallback(() => {
    setDrawerOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar onOpenRFQ={openRFQ} />
      <MarqueeBanner />
      <HeroSection onOpenRFQ={openRFQ} />
      <TrustBar />
      <PolymersSection onOpenRFQ={openRFQ} />
      <TextilesSection onOpenRFQ={openRFQ} />
      <IndustriesSection />
      <WhyUsSection />
      <CTASection onOpenRFQ={openRFQ} />
      <Footer />
      <RFQDrawer
        open={drawerOpen}
        onClose={closeRFQ}
        product={rfqData.product}
        grade={rfqData.grade}
        category={rfqData.category}
      />
    </div>
  );
};

export default Index;
