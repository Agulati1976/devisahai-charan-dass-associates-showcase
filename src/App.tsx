import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Reliance from "./pages/Reliance";
import Contact from "./pages/Contact";
import PPProduct from "./pages/PPProduct";
import PEProduct from "./pages/PEProduct";
import PVCProduct from "./pages/PVCProduct";
import PETProduct from "./pages/PETProduct";
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
            <Route path="/reliance" element={<Reliance />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
