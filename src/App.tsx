import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Reliance from "./pages/Reliance";
import Contact from "./pages/Contact";
import PPProduct from "./pages/PPProduct";
import PEProduct from "./pages/PEProduct";
import PVCProduct from "./pages/PVCProduct";
import PETProduct from "./pages/PETProduct";
import VimalGifting from "./pages/VimalGifting";
import VimalSuitings from "./pages/VimalSuitings";
import Uniforms from "./pages/Uniforms";
import PolyesterSuiting from "./pages/PolyesterSuiting";
import GeorgiaGullini from "./pages/GeorgiaGullini";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminEnquiries from "./pages/AdminEnquiries";
import Careers from "./pages/Careers";
import AlokIndustries from "./pages/AlokIndustries";
import AlokWovens from "./pages/AlokWovens";
import AlokKnits from "./pages/AlokKnits";
import AlokYarns from "./pages/AlokYarns";
import AlokFurnishing from "./pages/AlokFurnishing";
import AlokEmbroideries from "./pages/AlokEmbroideries";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/pp" element={<PPProduct />} />
            <Route path="/products/pe" element={<PEProduct />} />
            <Route path="/products/pvc" element={<PVCProduct />} />
            <Route path="/products/pet" element={<PETProduct />} />
            <Route path="/textiles/vimal-gifting" element={<VimalGifting />} />
            <Route path="/textiles/vimal-suitings" element={<VimalSuitings />} />
            <Route path="/textiles/uniforms" element={<Uniforms />} />
            <Route path="/textiles/polyester-suiting" element={<PolyesterSuiting />} />
            <Route path="/textiles/georgia-gullini" element={<GeorgiaGullini />} />
            <Route path="/reliance" element={<Reliance />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/alok" element={<AlokIndustries />} />
            <Route path="/alok/wovens" element={<AlokWovens />} />
            <Route path="/alok/knits" element={<AlokKnits />} />
            <Route path="/alok/yarns" element={<AlokYarns />} />
            <Route path="/alok/furnishing" element={<AlokFurnishing />} />
            <Route path="/alok/embroideries" element={<AlokEmbroideries />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/enquiries" element={<AdminEnquiries />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
