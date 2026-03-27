import { ArrowLeft, CheckCircle, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "../backend.d";
import { useCart } from "../context/CartContext";
import { useActor } from "../hooks/useActor";
import { formatPrice, getProductImage } from "../utils/productImages";

type Page =
  | "home"
  | "catalogue"
  | "about"
  | "contact"
  | "cart"
  | "checkout"
  | "admin"
  | "product";

interface ProductDetailProps {
  productId: bigint;
  onNavigate: (page: Page, productId?: bigint) => void;
}

export function ProductDetail({ productId, onNavigate }: ProductDetailProps) {
  const { actor } = useActor();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor) return;
    setLoading(true);
    actor
      .getProduct(productId)
      .then((result) => {
        setProduct(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [actor, productId]);

  if (loading)
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-ivory">
        <div
          className="animate-spin w-10 h-10"
          data-ocid="product.loading_state"
          style={{
            border: "1px solid rgba(107,26,58,0.15)",
            borderTopColor: "var(--gold)",
            borderRadius: "50%",
          }}
        />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-ivory">
        <div className="text-center" data-ocid="product.error_state">
          <p
            className="font-display text-2xl mb-5"
            style={{ color: "rgba(107,26,58,0.4)" }}
          >
            Product not found
          </p>
          <button
            type="button"
            onClick={() => onNavigate("catalogue")}
            className="btn-gold"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );

  const imgSrc = getProductImage(product);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++)
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: imgSrc,
      });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="min-h-screen bg-ivory pt-20">
      <div className="w-full px-6 lg:px-12 xl:px-16 py-16">
        <button
          type="button"
          data-ocid="product.back_button"
          onClick={() => onNavigate("catalogue")}
          className="inline-flex items-center gap-2 font-body font-semibold mb-12"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(107,26,58,0.45)",
            transition: "color 0.2s ease",
          }}
        >
          <ArrowLeft size={14} /> Back to Catalogue
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          <div className="relative">
            <div
              className="aspect-square overflow-hidden"
              style={{ boxShadow: "0 24px 64px rgba(78,16,41,0.14)" }}
            >
              <img
                src={imgSrc}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute pointer-events-none"
              style={{
                inset: "-12px -12px 12px 12px",
                border: "1px solid rgba(201,168,76,0.22)",
                zIndex: -1,
              }}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="section-label" style={{ color: "var(--gold)" }}>
                {product.category}
              </span>
              {product.featured && (
                <span
                  className="font-body font-bold px-2 py-0.5"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    background: "var(--gold)",
                    color: "var(--burgundy-deep)",
                  }}
                >
                  Featured
                </span>
              )}
            </div>

            <h1
              className="font-display font-bold leading-tight mb-5"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                color: "var(--burgundy-deep)",
              }}
            >
              {product.name}
            </h1>

            <p
              className="font-display font-semibold mb-8"
              style={{ fontSize: "2rem", color: "var(--gold)" }}
            >
              {formatPrice(product.price)}
            </p>

            <div className="gold-rule mb-8" />

            <p
              className="font-body mb-8"
              style={{
                color: "#6b5b5b",
                lineHeight: "1.85",
                maxWidth: "58ch",
              }}
            >
              {product.description}
            </p>

            <div
              className="mb-6 px-5 py-4"
              style={{
                background: "var(--ivory2)",
                borderLeft: "2px solid var(--gold)",
              }}
            >
              <h3
                className="section-label mb-1.5"
                style={{ color: "rgba(107,26,58,0.5)" }}
              >
                Materials
              </h3>
              <p
                className="font-body font-medium text-sm"
                style={{ color: "var(--burgundy)" }}
              >
                {product.materials}
              </p>
            </div>

            <div
              className="mb-8 px-5 py-4"
              style={{
                background: "linear-gradient(135deg, #4E1029 0%, #6B1A3A 100%)",
                borderLeft: "2px solid rgba(201,168,76,0.6)",
              }}
            >
              <h3
                className="section-label mb-2"
                style={{ color: "var(--gold)" }}
              >
                Size Guide
              </h3>
              {product.category === "rings" && (
                <p
                  className="font-body text-sm"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  S: UK H–J (US 3.5–5) &nbsp;|&nbsp; M: UK L–N (US 6–7)
                  &nbsp;|&nbsp; L: UK P–R (US 7.5–9)
                </p>
              )}
              {product.category === "necklaces" && (
                <p
                  className="font-body text-sm"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  16&quot; Choker &nbsp;|&nbsp; 18&quot; Princess &nbsp;|&nbsp;
                  20&quot; Matinee — Contact us for custom sizing.
                </p>
              )}
              {!["rings", "necklaces"].includes(product.category) && (
                <p
                  className="font-body text-sm"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  One size fits most. Contact us for specific measurements.
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <button
                  type="button"
                  data-ocid="product.secondary_button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="qty-btn"
                >
                  <Minus size={13} />
                </button>
                <span
                  className="font-body font-bold text-sm text-center"
                  style={{
                    width: "3rem",
                    borderTop: "1px solid rgba(107,26,58,0.15)",
                    borderBottom: "1px solid rgba(107,26,58,0.15)",
                    height: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--burgundy-deep)",
                  }}
                >
                  {qty}
                </span>
                <button
                  type="button"
                  data-ocid="product.secondary_button"
                  onClick={() => setQty((q) => q + 1)}
                  className="qty-btn"
                >
                  <Plus size={13} />
                </button>
              </div>
              <button
                type="button"
                data-ocid="product.primary_button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 font-body font-bold"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "0.9rem 1.5rem",
                  background: added ? "#16a34a" : "var(--gold)",
                  color: added ? "white" : "var(--burgundy-deep)",
                  boxShadow: added
                    ? "0 4px 16px rgba(22,163,74,0.25)"
                    : "0 4px 20px rgba(201,168,76,0.25)",
                  transition: "background 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                {added ? (
                  <>
                    <CheckCircle size={15} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={15} /> Add to Cart
                  </>
                )}
              </button>
            </div>

            <div
              className="flex gap-5 font-body"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.05em",
                color: "rgba(107,26,58,0.45)",
              }}
            >
              <span>✓ Free shipping over ₹10,000</span>
              <span>✓ 30-day returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
