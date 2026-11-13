import PriceFinder from "@/components/PriceFinder";

export default function Prices() {
  return <div>
    <section className="bg-primary py-16 px-6 text-center">
      <h1 className="text-4xl font-extrabold text-primary-foreground mb-3">Polymer Price Finder</h1>
      <p className="text-primary-foreground/80 max-w-2xl mx-auto">Select a product, plant, grade and location to see the listed price from our latest uploaded Reliance circular.</p>
    </section>
    <div className="px-4 py-8"><PriceFinder /></div>
  </div>;
}
