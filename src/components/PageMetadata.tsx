import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const companyName = "Devi Sahai Charan Dass Associates";
const origin = "https://devisahaicharandass.com";
const pages: Record<string, string> = {
  "/": "Authorised Del Credere Agent of Reliance Industries – Polymers & Textiles",
  "/about": "About Us",
  "/products": "Polymer Products – PP, PE, PVC & Bottle Grade PET",
  "/products/pp": "Polypropylene (PP)",
  "/products/pe": "Polyethylene (PE)",
  "/products/pvc": "Polyvinyl Chloride (PVC)",
  "/products/pet": "Bottle Grade Polyethylene Terephthalate (PET)",
  "/textiles/vimal-gifting": "Vimal Gifting",
  "/textiles/vimal-suitings": "Vimal Suitings",
  "/textiles/uniforms": "Uniforms",
  "/textiles/polyester-suiting": "Polyester Suiting",
  "/textiles/georgia-gullini": "Georgia Gullini",
  "/reliance": "Reliance Industries",
  "/careers": "Careers",
  "/alok": "Alok Industries",
  "/alok/wovens": "Alok Wovens",
  "/alok/knits": "Alok Knits",
  "/alok/yarns": "Alok Yarns",
  "/alok/furnishing": "Alok Furnishing",
  "/alok/embroideries": "Alok Embroideries",
  "/contact": "Contact Us",
};

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const pageTitle = pages[path];
    const title = pageTitle ? `${companyName} | ${pageTitle}` : companyName;
    document.title = title;
    setMeta("property", "og:title", title);
    setMeta("name", "twitter:title", title);
    setMeta("name", "robots", pageTitle ? "index, follow" : "noindex, follow");

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (pageTitle) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = origin + path;
      setMeta("property", "og:url", origin + path);
    } else {
      canonical?.remove();
      document.querySelector('meta[property="og:url"]')?.remove();
    }
  }, [pathname]);

  return null;
}
