import AlokDivisionPage from "@/components/AlokDivisionPage";
import alokWovensImg from "@/assets/alok-wovens.jpg";

const AlokWovens = () => (
  <AlokDivisionPage
    title="Wovens"
    description="At Alok Industries, our Woven fabrics are crafted with precision and advanced weaving technology to deliver exceptional durability, structure, and style. Designed to meet the diverse needs of the textile industry, our woven fabrics are widely used in apparel, uniforms, and various industrial applications. We offer a wide variety of textures, patterns, and fabric compositions that combine comfort with long-lasting performance."
    features={[
      "Superior durability and fabric strength",
      "Wide range of patterns, textures, and colors",
      "High-quality weaving technology",
      "Consistent finish and premium feel",
    ]}
    applications={[
      "Formal and professional apparel",
      "Corporate and institutional uniforms",
      "Fashion and lifestyle garments",
      "Industrial textile applications",
    ]}
    image={alokWovensImg}
  />
);

export default AlokWovens;
