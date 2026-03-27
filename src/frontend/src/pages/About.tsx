import { Gem, Heart, Leaf, Star } from "lucide-react";

type Page =
  | "home"
  | "catalogue"
  | "about"
  | "contact"
  | "cart"
  | "checkout"
  | "admin"
  | "product";

interface AboutProps {
  onNavigate: (page: Page) => void;
}

const VALUES = [
  {
    icon: Gem,
    title: "Craftsmanship",
    desc: "Every piece is carefully curated from artisan jewellers who share our passion for perfection.",
  },
  {
    icon: Star,
    title: "Authenticity",
    desc: "We use only certified precious metals and genuine gemstones — no compromises, ever.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "Ethically sourced materials and eco-conscious packaging, because luxury should be responsible.",
  },
  {
    icon: Heart,
    title: "Elegance",
    desc: "Timeless designs that transcend trends, crafted to be cherished for generations.",
  },
];

export function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(/assets/generated/hero-banner.dim_1920x800.jpg)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(78,16,41,0.90) 0%, rgba(107,26,58,0.82) 100%)",
          }}
        />
        <div className="absolute inset-8 border border-gold/20 pointer-events-none" />
        <div className="relative text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-gold/50" />
            <p className="font-body text-gold tracking-[0.3em] uppercase text-xs">
              Our Story
            </p>
            <div className="h-px w-8 bg-gold/50" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white">
            About NexaNouri
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="w-full px-6 lg:px-12 xl:px-16 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold/40" />
              <p className="font-body text-gold tracking-[0.3em] uppercase text-xs">
                Our Beginning
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-burgundy-deep mb-6 leading-snug">
              Born from a Passion for Beauty
            </h2>
            <p className="font-body text-gray-600 leading-relaxed mb-4">
              NexaNouri was founded with a singular vision: to make exquisite
              jewellery accessible to those who appreciate beauty without
              compromise. Our name, a fusion of "Nexa" (connection) and "Nouri"
              (light in Persian), embodies our belief that fine jewellery
              connects the wearer to moments of radiance and joy.
            </p>
            <p className="font-body text-gray-600 leading-relaxed">
              From our home in London, we curate exceptional pieces from artisan
              jewellers across the globe, bringing you a collection that
              celebrates craftsmanship, authenticity, and timeless elegance.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden shadow-2xl">
              <img
                src="/assets/generated/set-bridal-diamond.dim_800x800.jpg"
                alt="NexaNouri"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-gold/30 -z-10" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24 px-4"
        style={{
          background: "linear-gradient(135deg, #4E1029 0%, #6B1A3A 100%)",
        }}
      >
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-gold/50" />
              <p className="font-body text-gold tracking-[0.3em] uppercase text-xs">
                What We Stand For
              </p>
              <div className="h-px w-8 bg-gold/50" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="text-center p-8 border border-gold/20 hover:border-gold transition-all duration-300 hover:bg-white/5 group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold/30 mb-4 group-hover:border-gold transition-colors">
                  <Icon className="text-gold" size={26} />
                </div>
                <h3 className="font-display text-xl text-white mb-3">
                  {title}
                </h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 bg-ivory">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/40" />
            <p className="font-body text-gold tracking-[0.3em] uppercase text-xs">
              Our Mission
            </p>
            <div className="h-px w-8 bg-gold/40" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-burgundy-deep mb-6 leading-snug">
            Jewellery That Tells Your Story
          </h2>
          <p className="font-body text-gray-600 text-lg leading-relaxed mb-10">
            We believe every piece of jewellery carries meaning — a milestone, a
            love, a memory. At NexaNouri, our mission is to help you find pieces
            that resonate with your story and endure through time.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("catalogue")}
            className="btn-gold py-4 px-12 shadow-lg shadow-gold/20"
          >
            Explore the Collection
          </button>
        </div>
      </section>
    </div>
  );
}
