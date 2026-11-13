import PriceFinder from "@/components/PriceFinder";

export default function Prices() {
  return <div>
    <section className="bg-primary py-14 md:py-20 px-6 text-center">
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-4">PE · PP · PVC</span>
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Polymer Price Finder</h1>
      <p className="text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">Explore listed polymer prices by product, plant, grade and delivery location. Each result shows its circular and effective date.</p>
    </section>
    <div className="bg-brand-gray-50 px-4 py-10 md:py-14"><PriceFinder /></div>
  </div>;
}
