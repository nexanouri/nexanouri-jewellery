import { useEffect, useMemo, useState } from "react";
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

interface CatalogueProps {
  onNavigate: (page: Page, productId?: bigint, search?: string) => void;
  initialSearch?: string;
}

const DEPT_CATS = ["rings", "necklaces", "earrings", "bracelets", "sets"];
const MATERIALS = ["Gold", "Silver", "Diamond", "Pearl", "Emerald", "Ruby"];
const PRICE_RANGES = [
  { label: "Under ₹500", min: 0, max: 50000 },
  { label: "₹500 – ₹1,000", min: 50000, max: 100000 },
  { label: "₹1,000 – ₹5,000", min: 100000, max: 500000 },
  { label: "Over ₹5,000", min: 500000, max: Number.POSITIVE_INFINITY },
];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Avg. Customer Review", value: "rating" },
  { label: "Newest Arrivals", value: "newest" },
];
const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

export function Catalogue({ onNavigate, initialSearch = "" }: CatalogueProps) {
  const { actor } = useActor();
  const [backendProducts, setBackendProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedPriceIdx, setSelectedPriceIdx] = useState<number | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (!actor) return;
    setLoading(true);
    actor
      .getAllProducts()
      .then((p) => {
        setBackendProducts(p);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [actor]);

  const filtered = useMemo(() => {
    const allProducts = [...BRACELET_PRODUCTS, ...backendProducts];
    let ps = [...allProducts];
    if (search.trim()) {
      const q = search.toLowerCase();
      ps = ps.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    if (selectedCats.length > 0)
      ps = ps.filter((p) => selectedCats.includes(p.category));
    if (selectedPriceIdx !== null) {
      const range = PRICE_RANGES[selectedPriceIdx];
      ps = ps.filter(
        (p) => Number(p.price) >= range.min && Number(p.price) <= range.max,
      );
    }
    if (selectedMaterials.length > 0) {
      ps = ps.filter((p) =>
        selectedMaterials.some((m) =>
          p.materials?.toLowerCase().includes(m.toLowerCase()),
        ),
      );
    }
    if (minRating !== null) {
      const ratings = [4.5, 4.3, 4.7, 4.4, 4.6, 4.2, 4.8, 4.5, 4.9, 4.3];
      ps = ps.filter(
        (_, idx) => (ratings[idx % ratings.length] || 4.4) >= (minRating ?? 0),
      );
    }
    if (sortBy === "price_asc")
      ps.sort((a, b) => Number(a.price) - Number(b.price));
    else if (sortBy === "price_desc")
      ps.sort((a, b) => Number(b.price) - Number(a.price));
    else if (sortBy === "newest") ps.reverse();
    else if (sortBy === "featured")
      ps.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return ps;
  }, [
    backendProducts,
    search,
    selectedCats,
    selectedPriceIdx,
    selectedMaterials,
    minRating,
    sortBy,
  ]);

  const toggleCat = (cat: string) =>
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  const toggleMaterial = (mat: string) =>
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat],
    );

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--amz-gray)",
        paddingTop: "108px",
        fontFamily: "'DM Sans', Arial, sans-serif",
      }}
    >
      {/* Breadcrumb */}
      <div
        className="w-full px-4 py-2"
        style={{
          background: "white",
          borderBottom: "1px solid var(--amz-border)",
        }}
      >
        <nav className="text-sm" style={{ color: "var(--amz-muted)" }}>
          <button
            type="button"
            data-ocid="catalogue.link"
            onClick={() => onNavigate("home")}
            style={{
              color: "var(--amz-teal)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Home
          </button>
          <span className="mx-1">›</span>
          <span style={{ color: "var(--amz-text)" }}>Jewellery</span>
          {selectedCats.length === 1 && (
            <>
              <span className="mx-1">›</span>
              <span
                style={{
                  color: "var(--amz-text)",
                  textTransform: "capitalize",
                }}
              >
                {selectedCats[0]}
              </span>
            </>
          )}
        </nav>
      </div>

      <div className="flex w-full px-4 py-4 gap-4">
        {/* Sidebar */}
        <aside
          className="hidden md:block flex-shrink-0"
          style={{ width: "220px" }}
        >
          <div className="bg-white p-4 rounded-sm shadow-sm mb-3">
            <h3
              className="font-bold text-sm mb-3"
              style={{ color: "var(--amz-text)" }}
            >
              Department
            </h3>
            <div className="flex flex-col gap-2">
              {DEPT_CATS.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                  style={{ color: "var(--amz-text)" }}
                >
                  <input
                    type="checkbox"
                    data-ocid="catalogue.checkbox"
                    checked={selectedCats.includes(cat)}
                    onChange={() => toggleCat(cat)}
                    className="accent-orange-500"
                  />
                  <span className="capitalize">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-sm shadow-sm mb-3">
            <h3
              className="font-bold text-sm mb-3"
              style={{ color: "var(--amz-text)" }}
            >
              Avg. Customer Review
            </h3>
            <div className="flex flex-col gap-2">
              {[4, 3, 2, 1].map((r) => (
                <button
                  key={r}
                  type="button"
                  data-ocid="catalogue.toggle"
                  onClick={() => setMinRating(minRating === r ? null : r)}
                  className="flex items-center gap-1 text-sm text-left"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color:
                      minRating === r ? "var(--amz-orange)" : "var(--amz-teal)",
                    fontWeight: minRating === r ? 700 : 400,
                  }}
                >
                  <span style={{ color: "var(--amz-star)" }}>
                    {"★".repeat(r)}
                    {"☆".repeat(5 - r)}
                  </span>{" "}
                  &amp; Up
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-sm shadow-sm mb-3">
            <h3
              className="font-bold text-sm mb-3"
              style={{ color: "var(--amz-text)" }}
            >
              Price
            </h3>
            <div className="flex flex-col gap-2">
              {PRICE_RANGES.map((range, idx) => (
                <label
                  key={range.label}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                  style={{ color: "var(--amz-text)" }}
                >
                  <input
                    type="radio"
                    name="price-range"
                    data-ocid="catalogue.radio"
                    checked={selectedPriceIdx === idx}
                    onChange={() =>
                      setSelectedPriceIdx(selectedPriceIdx === idx ? null : idx)
                    }
                    className="accent-orange-500"
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-sm shadow-sm">
            <h3
              className="font-bold text-sm mb-3"
              style={{ color: "var(--amz-text)" }}
            >
              Material
            </h3>
            <div className="flex flex-col gap-2">
              {MATERIALS.map((mat) => (
                <label
                  key={mat}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                  style={{ color: "var(--amz-text)" }}
                >
                  <input
                    type="checkbox"
                    data-ocid="catalogue.checkbox"
                    checked={selectedMaterials.includes(mat)}
                    onChange={() => toggleMaterial(mat)}
                    className="accent-orange-500"
                  />
                  {mat}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div
            className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 mb-3 rounded-sm"
            style={{
              background: "linear-gradient(to bottom, #F7F7F7, #EFEFEF)",
              border: "1px solid #DDD",
            }}
          >
            <span className="text-sm" style={{ color: "var(--amz-text)" }}>
              {loading ? "Loading..." : `1–24 of ${filtered.length} results`}
              {search && (
                <span style={{ color: "var(--amz-muted)" }}>
                  {" "}
                  for "{search}"
                </span>
              )}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: "var(--amz-text)" }}>
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                data-ocid="catalogue.select"
                className="text-sm px-2 py-1 rounded border"
                style={{
                  borderColor: "var(--amz-border)",
                  color: "var(--amz-text)",
                  background: "white",
                }}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SKELETON_KEYS.map((k) => (
                <div
                  key={k}
                  className="bg-white rounded-sm animate-pulse"
                  data-ocid="catalogue.loading_state"
                  style={{ minHeight: "260px" }}
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="bg-white rounded-sm p-12 text-center"
              data-ocid="catalogue.empty_state"
            >
              <p
                className="text-lg font-medium mb-2"
                style={{ color: "var(--amz-text)" }}
              >
                No results found
              </p>
              <p className="text-sm" style={{ color: "var(--amz-muted)" }}>
                Try adjusting your search or filters
              </p>
              <button
                type="button"
                className="mt-4 text-sm"
                style={{
                  color: "var(--amz-teal)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedCats([]);
                  setSelectedPriceIdx(null);
                  setSelectedMaterials([]);
                  setSearch("");
                  setMinRating(null);
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((p, idx) => (
                <div key={String(p.id)} data-ocid={`catalogue.item.${idx + 1}`}>
                  <ProductCard
                    product={p}
                    onClick={() => onNavigate("product", p.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
