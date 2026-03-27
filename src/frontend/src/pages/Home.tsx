import {
  ChevronLeft,
  ChevronRight,
  Package,
  RotateCcw,
  Shield,
  Truck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../backend.d";
import { ProductCard } from "../components/ProductCard";
import { useActor } from "../hooks/useActor";
import { BRACELET_PRODUCTS } from "../utils/braceletProducts";

type Page =
  | "home"
  | "catalogue"
  | "about"
  | "contact"
  | "cart"
  | "checkout"
  | "admin"
  | "product";

interface HomeProps {
  onNavigate: (page: Page, productId?: bigint, search?: string) => void;
}

const SLIDES = [
  {
    id: "gold",
    title: "Upto 60% Off",
    subtitle: "On Gold Jewellery Collection",
    cta: "Shop Gold Jewellery",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    accent: "#FFD814",
  },
  {
    id: "diamond",
    title: "New Arrivals",
    subtitle: "Diamond Collection — Just Landed",
    cta: "Explore Diamonds",
    bg: "linear-gradient(135deg, #1b0036 0%, #2d0057 40%, #4a0080 100%)",
    accent: "#FFA41C",
  },
  {
    id: "silver",
    title: "Best Sellers",
    subtitle: "Silver Jewellery — Top Rated Picks",
    cta: "View Best Sellers",
    bg: "linear-gradient(135deg, #0d2137 0%, #1b4a6b 40%, #0a7094 100%)",
    accent: "#F08804",
  },
];

const CATEGORY_CARDS = [
  {
    title: "Shop Rings",
    imgs: [
      "/assets/generated/ring-rose-ruby.dim_800x800.jpg",
      "/assets/generated/ring-filigree-emerald.dim_800x800.jpg",
      "/assets/generated/ring-rose-ruby.dim_800x800.jpg",
      "/assets/generated/ring-filigree-emerald.dim_800x800.jpg",
    ],
  },
  {
    title: "Trending Necklaces",
    imgs: [
      "/assets/generated/necklace-celestial.dim_800x800.jpg",
      "/assets/generated/necklace-sapphire-stars.dim_800x800.jpg",
      "/assets/generated/necklace-layered-gold.dim_800x800.jpg",
      "/assets/generated/necklace-celestial.dim_800x800.jpg",
    ],
  },
  {
    title: "Bestselling Earrings",
    imgs: [
      "/assets/generated/earrings-pearl.dim_800x800.jpg",
      "/assets/generated/earrings-gold-hoop.dim_800x800.jpg",
      "/assets/generated/earrings-pearl.dim_800x800.jpg",
      "/assets/generated/earrings-gold-hoop.dim_800x800.jpg",
    ],
  },
  {
    title: "Shop Bracelets",
    imgs: [
      "/assets/uploads/img-20260326-wa0258-019d2c8c-7702-7395-a0af-e174a12220d9-1.jpg",
      "/assets/uploads/img-20260326-wa0263-019d2c8c-7960-71f1-a9b9-ebfe8f588de4-2.jpg",
      "/assets/uploads/img-20260326-wa0255-019d2c8c-7cc5-704f-9796-b79bb8ce4686-3.jpg",
      "/assets/uploads/img-20260326-wa0260-019d2c8c-7d9d-713b-abbd-217a1c3903f0-4.jpg",
    ],
  },
];

const PROMISES = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above ₹500" },
  {
    icon: Shield,
    title: "Certified Authentic",
    desc: "Genuine materials only",
  },
  {
    icon: Package,
    title: "Luxury Packaging",
    desc: "Beautifully gift-wrapped",
  },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free" },
];

function HorizontalCarousel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (ref.current)
      ref.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
  };
  return (
    <div className="relative group">
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-16 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: "rgba(255,255,255,0.85)",
          border: "1px solid #ccc",
          borderRadius: "0 4px 4px 0",
        }}
      >
        <ChevronLeft size={18} />
      </button>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-16 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: "rgba(255,255,255,0.85)",
          border: "1px solid #ccc",
          borderRadius: "4px 0 0 4px",
        }}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export function Home({ onNavigate }: HomeProps) {
  const { actor } = useActor();
  const [backendProducts, setBackendProducts] = useState<Product[]>([]);
  const allProductsCombined = [...BRACELET_PRODUCTS, ...backendProducts];
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (actor)
      actor
        .getAllProducts()
        .then((p) => setBackendProducts(p))
        .catch(() => {});
  }, [actor]);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const bestSellers = allProductsCombined.filter((p) => p.featured);
  const newArrivals = [...allProductsCombined].reverse().slice(0, 8);
  const dealItems = allProductsCombined.slice(0, 6);
  const currentSlide = SLIDES[slide];

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--amz-gray)", paddingTop: "108px" }}
    >
      {/* Hero Carousel */}
      <div
        className="w-full relative overflow-hidden"
        style={{
          minHeight: "220px",
          height: "clamp(220px, 40vw, 420px)",
          background: currentSlide.bg,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-8">
            <p
              className="text-sm mb-2"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              NexaNouri Exclusive
            </p>
            <h1
              className="font-bold mb-3"
              style={{
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                color: "white",
                lineHeight: 1.1,
              }}
            >
              {currentSlide.title}
            </h1>
            <p
              className="text-lg mb-6"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              {currentSlide.subtitle}
            </p>
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={() => onNavigate("catalogue")}
              className="px-8 py-3 font-semibold rounded text-sm"
              style={{ background: currentSlide.accent, color: "#111" }}
            >
              {currentSlide.cta}
            </button>
          </div>
        </div>
        <div
          className="absolute inset-y-0 left-0 w-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.3), transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, rgba(0,0,0,0.3), transparent)",
          }}
        />
        <button
          type="button"
          data-ocid="hero.secondary_button"
          aria-label="Previous slide"
          onClick={() =>
            setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-16"
          style={{
            background: "rgba(0,0,0,0.3)",
            color: "white",
            borderRadius: "4px",
          }}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-16"
          style={{
            background: "rgba(0,0,0,0.3)",
            color: "white",
            borderRadius: "4px",
          }}
        >
          <ChevronRight size={22} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: i === slide ? "white" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Category Cards */}
      <div className="w-full px-4 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORY_CARDS.map((card) => (
            <button
              key={card.title}
              type="button"
              className="bg-white p-4 rounded-sm shadow-sm cursor-pointer hover:shadow-md transition-shadow text-left"
              onClick={() => onNavigate("catalogue")}
            >
              <h3
                className="font-bold text-base mb-3"
                style={{ color: "var(--amz-text)" }}
              >
                {card.title}
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {card.imgs.map((img, idx) => (
                  <img
                    key={`${card.title}-${idx}`}
                    src={img}
                    alt=""
                    className="w-full aspect-square object-cover rounded-sm"
                  />
                ))}
              </div>
              <span className="text-sm" style={{ color: "var(--amz-teal)" }}>
                See more
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sign In Banner */}
      <div className="w-full px-4 pt-4">
        <div
          className="w-full rounded-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "#F7F3E9", border: "1px solid #ddd" }}
        >
          <div>
            <h3
              className="font-bold text-lg"
              style={{ color: "var(--amz-text)" }}
            >
              Sign in for the best experience
            </h3>
            <p className="text-sm mt-1" style={{ color: "var(--amz-muted)" }}>
              Get personalised recommendations, track orders, and exclusive
              member deals.
            </p>
          </div>
          <button
            type="button"
            data-ocid="signin.button"
            className="amz-btn-primary px-8 py-2.5 flex-shrink-0"
            onClick={() => onNavigate("about")}
          >
            Sign in securely
          </button>
        </div>
      </div>

      {/* Promise bar */}
      <div className="w-full px-4 pt-4">
        <div className="bg-white rounded-sm shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {PROMISES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-4 gap-2"
              >
                <Icon size={22} style={{ color: "var(--amz-orange)" }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--amz-text)" }}
                >
                  {title}
                </span>
                <span className="text-xs" style={{ color: "var(--amz-muted)" }}>
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <div className="w-full px-4 pt-4">
          <div className="bg-white rounded-sm shadow-sm p-4">
            <div className="flex items-center gap-3 mb-4">
              <h2
                className="font-bold text-xl"
                style={{ color: "var(--amz-text)" }}
              >
                Best Sellers in Jewellery
              </h2>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-sm"
                style={{ background: "var(--amz-red)", color: "white" }}
              >
                #1 Best Seller
              </span>
            </div>
            <HorizontalCarousel>
              {bestSellers.map((p) => (
                <div
                  key={String(p.id)}
                  className="flex-shrink-0"
                  style={{ width: "210px" }}
                >
                  <ProductCard
                    product={p}
                    onClick={() => onNavigate("product", p.id)}
                  />
                </div>
              ))}
            </HorizontalCarousel>
            <div className="mt-4">
              <button
                type="button"
                data-ocid="featured.view_all_button"
                className="text-sm"
                style={{
                  color: "var(--amz-teal)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => onNavigate("catalogue")}
              >
                See all best sellers →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Today's Deals */}
      {dealItems.length > 0 && (
        <div className="w-full px-4 pt-4">
          <div className="bg-white rounded-sm shadow-sm p-4">
            <div className="flex items-center gap-3 mb-4">
              <h2
                className="font-bold text-xl"
                style={{ color: "var(--amz-text)" }}
              >
                Today's Deals
              </h2>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-sm"
                style={{ background: "var(--amz-red)", color: "white" }}
              >
                Deals
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {dealItems.map((p, idx) => {
                const mrp = Math.round((Number(p.price) / 100) * 1.4);
                const disc = Math.round(
                  ((mrp - Number(p.price) / 100) / mrp) * 100,
                );
                return (
                  <button
                    key={String(p.id)}
                    type="button"
                    data-ocid={`deals.item.${idx + 1}`}
                    className="flex flex-col items-center text-center cursor-pointer"
                    style={{ background: "none", border: "none" }}
                    onClick={() => onNavigate("product", p.id)}
                  >
                    <div className="relative w-full mb-2">
                      <img
                        src={
                          p.imageUrls[0] ||
                          "/assets/generated/necklace-celestial.dim_800x800.jpg"
                        }
                        alt={p.name}
                        className="w-full aspect-square object-cover rounded-sm"
                      />
                      <span
                        className="absolute top-1 left-1 text-xs font-bold px-1.5 py-0.5 rounded-sm"
                        style={{ background: "var(--amz-red)", color: "white" }}
                      >
                        -{disc}%
                      </span>
                    </div>
                    <p
                      className="text-xs font-bold"
                      style={{ color: "var(--amz-red)" }}
                    >
                      Up to {disc}% off
                    </p>
                    <p
                      className="text-xs mt-0.5 line-clamp-2"
                      style={{ color: "var(--amz-muted)" }}
                    >
                      {p.name}
                    </p>
                  </button>
                );
              })}
            </div>
            <div className="mt-4">
              <button
                type="button"
                data-ocid="deals.view_all_button"
                className="text-sm"
                style={{
                  color: "var(--amz-teal)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => onNavigate("catalogue")}
              >
                See all deals →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <div className="w-full px-4 pt-4 pb-6">
          <div className="bg-white rounded-sm shadow-sm p-4">
            <h2
              className="font-bold text-xl mb-4"
              style={{ color: "var(--amz-text)" }}
            >
              New Arrivals
            </h2>
            <HorizontalCarousel>
              {newArrivals.map((p) => (
                <div
                  key={String(p.id)}
                  className="flex-shrink-0"
                  style={{ width: "210px" }}
                >
                  <ProductCard
                    product={p}
                    onClick={() => onNavigate("product", p.id)}
                  />
                </div>
              ))}
            </HorizontalCarousel>
            <div className="mt-4">
              <button
                type="button"
                data-ocid="new_arrivals.view_all_button"
                className="text-sm"
                style={{
                  color: "var(--amz-teal)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => onNavigate("catalogue")}
              >
                See all new arrivals →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
