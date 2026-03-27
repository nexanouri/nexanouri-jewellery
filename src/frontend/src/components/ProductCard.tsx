import { ShoppingCart, Zap } from "lucide-react";
import type { Product } from "../backend.d";
import { useCart } from "../context/CartContext";
import { BRACELET_MRP } from "../utils/braceletProducts";
import { getProductImage } from "../utils/productImages";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

function formatINR(paise: bigint): string {
  return `₹${(Number(paise) / 100).toLocaleString("en-IN")}`;
}

const STAR_POSITIONS = ["p1", "p2", "p3", "p4", "p5"];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span style={{ color: "var(--amz-star)", fontSize: "0.85rem" }}>
      {STAR_POSITIONS.slice(0, full).map((k) => (
        <span key={k}>★</span>
      ))}
      {half && <span key="half">½</span>}
      {STAR_POSITIONS.slice(0, empty).map((k) => (
        <span key={`e-${k}`} style={{ color: "#ccc" }}>
          ★
        </span>
      ))}
    </span>
  );
}

const RATINGS: Record<number, { r: number; count: number }> = {
  1: { r: 4.5, count: 1247 },
  2: { r: 4.3, count: 892 },
  3: { r: 4.7, count: 2341 },
  4: { r: 4.4, count: 567 },
  5: { r: 4.6, count: 1089 },
  6: { r: 4.2, count: 445 },
  7: { r: 4.8, count: 3102 },
  8: { r: 4.5, count: 782 },
  9: { r: 4.9, count: 1567 },
  10: { r: 4.3, count: 334 },
};

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addItem } = useCart();
  const imgSrc = getProductImage(product);
  const pId = Number(product.id);
  const ratingData = RATINGS[pId] || { r: 4.4, count: 123 };

  const sellingPrice = Number(product.price) / 100;

  // Use product-specific MRP if available (bracelet products), else compute from price
  const mrpPaise = BRACELET_MRP[pId];
  const mrp = mrpPaise ? mrpPaise / 100 : Math.round(sellingPrice * 1.4);
  const discount = Math.round(((mrp - sellingPrice) / mrp) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: imgSrc,
    });
  };

  return (
    <div className="amz-product-card flex flex-col h-full">
      {/* Image — clickable */}
      <button
        type="button"
        className="relative flex items-center justify-center p-4 w-full"
        style={{
          background: "white",
          minHeight: "200px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={onClick}
        aria-label={`View ${product.name}`}
      >
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-48 object-contain"
          loading="lazy"
        />
        {product.featured && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 text-xs font-bold text-white rounded-sm"
            style={{ background: "var(--amz-red)", fontSize: "0.7rem" }}
          >
            Limited time deal
          </div>
        )}
      </button>

      <div className="flex flex-col flex-1 px-3 pt-3 pb-3 gap-1.5">
        {/* Name — clickable */}
        <button
          type="button"
          className="text-sm leading-snug line-clamp-2 text-left w-full"
          style={{
            color: "var(--amz-text)",
            fontWeight: 400,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          onClick={onClick}
        >
          {product.name}
        </button>

        <div className="flex items-center gap-1">
          <StarRating rating={ratingData.r} />
          <span style={{ color: "var(--amz-teal)", fontSize: "0.78rem" }}>
            {ratingData.count.toLocaleString()}
          </span>
        </div>

        <div className="mt-0.5">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-xs" style={{ color: "var(--amz-text)" }}>
              -{discount}%
            </span>
            <span
              className="text-lg font-bold"
              style={{ color: "var(--amz-price)" }}
            >
              {formatINR(product.price)}
            </span>
          </div>
          <div className="text-xs" style={{ color: "var(--amz-muted)" }}>
            M.R.P:{" "}
            <span className="line-through">₹{mrp.toLocaleString("en-IN")}</span>
          </div>
          {product.featured && (
            <span
              className="text-xs font-medium"
              style={{ color: "var(--amz-red)" }}
            >
              Limited time deal
            </span>
          )}
        </div>

        <p className="text-xs" style={{ color: "var(--amz-muted)" }}>
          {product.materials || product.category}
        </p>

        <div className="flex flex-col gap-2 mt-auto pt-2">
          <button
            type="button"
            data-ocid="product.button"
            className="amz-btn-primary w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={14} /> Add to Cart
          </button>
          <button
            type="button"
            data-ocid="product.secondary_button"
            className="amz-btn-buy w-full"
            onClick={onClick}
          >
            <Zap size={13} /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
