import AlokDivisionPage from "@/components/AlokDivisionPage";
import alokEmbroideriesImg from "@/assets/alok-embroideries.webp";

const AlokEmbroideries = () => (
  <AlokDivisionPage
    title="Embroideries"
    description="At Alok Industries, our embroidery solutions combine artistic craftsmanship with modern technology to create intricate and elegant textile designs. Our embroidery work enhances fabrics with detailed patterns, refined textures, and premium finishing. We offer a diverse range of customized embroidery designs suitable for fashion apparel, ethnic wear, and home décor."
    features={[
      "Intricate and detailed embroidery designs",
      "Advanced embroidery technology for precision",
      "High-quality finishing and durability",
      "Custom design options to suit various styles",
    ]}
    applications={[
      "Fashion and designer garments",
      "Ethnic and traditional wear",
      "Decorative home textiles",
      "Premium fabric embellishments",
    ]}
    image={alokEmbroideriesImg}
  />
);

export default AlokEmbroideries;
