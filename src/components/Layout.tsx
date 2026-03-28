import { useState, useCallback } from "react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RFQDrawer from "@/components/RFQDrawer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rfqData, setRfqData] = useState({ product: "", grade: "", category: "" });
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Navbar onOpenRFQ={openRFQ} />
      <main className="flex-1">
        <Outlet context={{ openRFQ }} />
      </main>
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

export default Layout;

export function useRFQ() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { openRFQ } = (window as any).__rfqContext || {};
  return { openRFQ: openRFQ || (() => {}) };
}
