import AlokDivisionPage from "@/components/AlokDivisionPage";
import alokKnitsImg from "@/assets/alok-knits.webp";

const AlokKnits = () => (
  <AlokDivisionPage
    title="Knits"
    description="At Alok Industries, our knitted fabrics are designed to offer superior comfort, flexibility, and modern style. Produced using advanced knitting technology, these fabrics provide excellent stretch, softness, and breathability, making them ideal for contemporary apparel. Our knit fabrics are carefully developed to ensure durability, smooth texture, and consistent quality."
    features={[
      "Soft, lightweight, and comfortable fabrics",
      "Excellent stretch and flexibility",
      "Breathable and skin-friendly materials",
      "High-quality finishing and durability",
    ]}
    applications={[
      "T-shirts and casual wear",
      "Activewear and sportswear",
      "Fashion garments",
      "Comfortable everyday clothing",
    ]}
    image={alokKnitsImg}
  />
);

export default AlokKnits;
