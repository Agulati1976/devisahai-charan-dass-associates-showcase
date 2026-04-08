import { useOutletContext, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle2,
  ChevronRight,

  Gift,
  Star,
  Palette,
  Package,
  Users,
  Award,
  ArrowRight,
  Heart,
  Sparkles,
  ChevronLeft,
} from "lucide-react";

import gift1 from "@/assets/vimal-gifting/gift-1.jpg";
import gift2 from "@/assets/vimal-gifting/gift-2.jpg";
import gift3 from "@/assets/vimal-gifting/gift-3.jpg";
import gift4 from "@/assets/vimal-gifting/gift-4.jpg";
import gift5 from "@/assets/vimal-gifting/gift-5.jpg";
import gift6 from "@/assets/vimal-gifting/gift-6.jpg";
import gift7 from "@/assets/vimal-gifting/gift-7.jpg";
import gift8 from "@/assets/vimal-gifting/gift-8.jpg";
import gift9 from "@/assets/vimal-gifting/gift-9.jpg";
import gift10 from "@/assets/vimal-gifting/gift-10.jpg";
import gift11 from "@/assets/vimal-gifting/gift-11.jpg";
import gift12 from "@/assets/vimal-gifting/gift-12.jpg";
import gift13 from "@/assets/vimal-gifting/gift-13.jpg";
import gift14 from "@/assets/vimal-gifting/gift-14.jpg";
import gift15 from "@/assets/vimal-gifting/gift-15.jpg";

const giftImages = [gift1, gift2, gift3, gift4, gift5, gift6, gift7, gift8, gift9, gift10, gift11, gift12, gift13, gift14, gift15];

interface ContextType {
  openRFQ: (product: string, grade: string, cat: string) => void;
}

const whyChoose = [
  { icon: Star, label: "Premium Quality", desc: "Carefully selected, elegant, and high-value gift options" },
  { icon: Palette, label: "Customization", desc: "Tailored gifting solutions aligned with your brand identity" },
  {
    icon: Package,
    label: "Diverse Range",
    desc: "Executive gifts, festive hampers, promotional merchandise, and more",
  },
  { icon: Sparkles, label: "Personalization", desc: "Branded packaging, custom engraving, and bespoke solutions" },
];

const solutions = [
  "Client & Partner Gifting",
  "Employee Rewards & Recognition",
  "Promotional & Branded Merchandise",
  "Festive & Occasion-Based Hampers",
  "Fully Customized Corporate Gifts",
];

const GiftSlider = () => {
  const [current, setCurrent] = useState(0);
  const visibleCount = 3;
  const maxIndex = giftImages.length - visibleCount;

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, maxIndex)), [maxIndex]);
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * (100 / visibleCount)}%)` }}
        >
          {giftImages.map((src, i) => (
            <div key={i} className="min-w-[33.333%] px-2">
              <div className="rounded-xl overflow-hidden border border-brand-gray-200 bg-background aspect-[4/3]">
                <img
                  src={src}
                  alt={`Vimal Gift Collection ${i + 1}`}
                  className="w-full h-full object-contain bg-background hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prev}
        disabled={current === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background border border-brand-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-secondary disabled:opacity-30 transition-all"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={next}
        disabled={current >= maxIndex}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background border border-brand-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-secondary disabled:opacity-30 transition-all"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>
      <div className="flex justify-center gap-1.5 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-brand-gray-200"}`}
          />
        ))}
      </div>
    </div>
  );
};

const VimalGifting = () => {
  const { openRFQ } = useOutletContext<ContextType>();
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-brand-blue-dark">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://pplx-res.cloudinary.com/image/upload/pplx_search_images/77982e55d48a51c5729a6bd9c5e642bda6d0711b.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24">
          <nav className="flex items-center gap-2 text-xs text-primary-foreground/60 mb-6">
            <Link to="/" className="hover:text-primary-foreground">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-primary-foreground">
              Products
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground">Vimal Gifting</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3">
            Textiles Division
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 text-balance">
            Vimal Gifting
          </h1>
          <p className="text-xl font-semibold text-primary-foreground/90 mb-2">Premium Corporate Gifting Solutions</p>
          <p className="text-base max-w-2xl leading-relaxed mb-8 text-primary-foreground/75">
            Premium Vimal Gifting solutions through our subsidiary — designed to strengthen business relationships,
            enhance brand presence, and create lasting impressions.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg shadow-lg shadow-destructive/35 hover:bg-brand-gold-dark hover:-translate-y-0.5 transition-all"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-16 px-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">Why Us</span>
        <h2 className="text-3xl font-extrabold text-primary mb-8">Why Choose Vimal Gifting?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChoose.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="bg-card border border-brand-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{label}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">
            Gallery
          </span>
          <h2 className="text-3xl font-extrabold text-primary mb-8">Our Gifting Range</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/77982e55d48a51c5729a6bd9c5e642bda6d0711b.jpg",
                label: "Premium Pant Shirt Gift Collection",
              },
              {
                src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format",
                label: "Premium Safari Suit Gift Collection",
              },
              {
                src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format",
                label: "Premium Suit Length Gift Collection",
              },
            ].map((img) => (
              <div
                key={img.label}
                className="group rounded-xl overflow-hidden border border-brand-gray-200 bg-background"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-foreground">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">
            Collection
          </span>
          <h2 className="text-3xl font-extrabold text-primary mb-8">Gift Gallery</h2>
          <GiftSlider />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2">
                Solutions
              </span>
              <h2 className="text-3xl font-extrabold text-primary mb-6">Our Gifting Solutions</h2>
              <div className="space-y-3">
                {solutions.map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-3 bg-background border border-brand-gray-200 rounded-lg p-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-brand-gray-200 rounded-xl p-8">
              <Heart className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Seamless & Impactful</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With expert consultation, consistent quality, and timely delivery, Vimal Gifting ensures a seamless and
                impactful corporate gifting experience.
              </p>
              <p className="text-sm font-semibold text-primary">
                Elevate your gifting strategy with Vimal Gifting — where relationships are strengthened and brands are
                elevated.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Need Corporate Gifting Solutions?</h2>
          <p className="text-sm mb-8 text-primary-foreground/70">
            Connect with us for premium Vimal gifting — curated for your brand and occasions.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-7 py-3.5 rounded-lg hover:bg-brand-gold-dark transition-colors"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary-foreground/10 transition-colors"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VimalGifting;
