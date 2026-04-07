import AlokDivisionPage from "@/components/AlokDivisionPage";
import alokFurnishingImg from "@/assets/alok-furnishing.jpg";

const AlokFurnishing = () => (
  <AlokDivisionPage
    title="Furnishing"
    description="At Alok Industries, our furnishing fabrics are designed to enhance interiors with a perfect blend of style, comfort, and durability. Crafted with high-quality materials and modern textile techniques, these fabrics are ideal for both residential and commercial spaces. Our furnishing range combines aesthetic appeal with long-lasting performance."
    features={[
      "Premium quality and durable fabrics",
      "Elegant designs, textures, and finishes",
      "Wide range of colors and patterns",
      "Comfortable and easy-to-maintain materials",
    ]}
    applications={[
      "Upholstery fabrics",
      "Curtains and drapery",
      "Cushion and decorative fabrics",
      "Interior décor and home textiles",
    ]}
    image={alokFurnishingImg}
  />
);

export default AlokFurnishing;
