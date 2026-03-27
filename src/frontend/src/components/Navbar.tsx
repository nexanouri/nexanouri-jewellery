import {
  ChevronDown,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useLogo } from "../context/LogoContext";

type Page =
  | "home"
  | "catalogue"
  | "about"
  | "contact"
  | "cart"
  | "checkout"
  | "admin"
  | "product";

interface NavbarProps {
  onNavigate: (page: Page, id?: bigint, search?: string) => void;
}

const LOGO_SRC =
  "/assets/uploads/1000460224-removebg-preview-019d2bd4-2ec6-729a-bb32-2a4de41f8d52-1.png";

const CATEGORIES = [
  "All",
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Sets",
];

const SEC_LINKS: { label: string; page: Page }[] = [
  { label: "Today's Deals", page: "catalogue" },
  { label: "Rings", page: "catalogue" },
  { label: "Necklaces", page: "catalogue" },
  { label: "Earrings", page: "catalogue" },
  { label: "Bracelets", page: "catalogue" },
  { label: "Sets", page: "catalogue" },
  { label: "New Arrivals", page: "catalogue" },
  { label: "Best Sellers", page: "catalogue" },
  { label: "Customer Service", page: "contact" },
];

export function Navbar({ onNavigate }: NavbarProps) {
  const { totalItems } = useCart();
  const { logoUrl } = useLogo();
  const [searchVal, setSearchVal] = useState("");
  const [searchCat, setSearchCat] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Secret 7-tap admin login
  const [tapCount, setTapCount] = useState(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminPw, setAdminPw] = useState("");
  const [adminError, setAdminError] = useState(false);

  const handleLogoClick = () => {
    const newCount = tapCount + 1;
    if (newCount === 7) {
      setTapCount(0);
      if (tapTimer.current) clearTimeout(tapTimer.current);
      setAdminId("");
      setAdminPw("");
      setAdminError(false);
      setShowAdminModal(true);
    } else {
      setTapCount(newCount);
      if (tapTimer.current) clearTimeout(tapTimer.current);
      tapTimer.current = setTimeout(() => setTapCount(0), 2000);
      if (newCount === 1) onNavigate("home");
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === "admin" && adminPw === "nexanouri2024") {
      localStorage.setItem("nxa_admin_auth", "1");
      setShowAdminModal(false);
      onNavigate("admin");
    } else {
      setAdminError(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate("catalogue", undefined, searchVal);
  };

  const navBorderStyle = { border: "1px solid transparent" };
  const navBorderHover = "white";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
      >
        {/* ── Top Bar ── */}
        <div
          className="w-full flex items-center gap-2 px-3 py-2"
          style={{ background: "var(--amz-dark)", minHeight: "60px" }}
        >
          {/* Logo – secret 7-tap */}
          <button
            type="button"
            data-ocid="nav.link"
            onClick={handleLogoClick}
            className="flex-shrink-0 flex items-center p-1 rounded-sm"
            style={navBorderStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                navBorderHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "transparent";
            }}
            aria-label="NexaNouri Home"
          >
            <img
              src={logoUrl || LOGO_SRC}
              alt="NexaNouri"
              className="h-10 w-auto object-contain"
            />
          </button>

          {/* Deliver to */}
          <button
            type="button"
            className="hidden lg:flex flex-col items-start flex-shrink-0 px-2 py-1 rounded-sm"
            style={{ ...navBorderStyle, color: "white" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                navBorderHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "transparent";
            }}
          >
            <span
              className="flex items-center gap-1"
              style={{ fontSize: "0.7rem", color: "#ccc" }}
            >
              <MapPin size={12} /> Deliver to
            </span>
            <span
              style={{ fontSize: "0.82rem", fontWeight: 700, color: "white" }}
            >
              India
            </span>
          </button>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex flex-1 items-stretch rounded-md overflow-hidden"
            style={{ minWidth: 0, maxWidth: "700px" }}
          >
            <select
              value={searchCat}
              onChange={(e) => setSearchCat(e.target.value)}
              className="hidden sm:block flex-shrink-0 border-none outline-none cursor-pointer"
              style={{
                background: "#F3F3F3",
                color: "#333",
                fontSize: "0.78rem",
                borderRight: "1px solid #cdcdcd",
                minWidth: "80px",
                maxWidth: "100px",
                padding: "0 8px",
              }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="amz-search-input"
              placeholder="Search NexaNouri Jewellery..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              data-ocid="nav.search_input"
            />
            <button
              type="submit"
              data-ocid="nav.button"
              className="flex-shrink-0 flex items-center justify-center px-4"
              style={{
                background: "var(--amz-orange)",
                color: "white",
                minWidth: "45px",
              }}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Right side */}
          <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
            <button
              type="button"
              className="hidden md:flex items-center gap-0.5 px-2 py-1 rounded-sm"
              style={{ ...navBorderStyle, color: "white", fontSize: "0.82rem" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  navBorderHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "transparent";
              }}
            >
              🇮🇳 <span style={{ fontWeight: 700 }}>EN</span>{" "}
              <ChevronDown size={12} />
            </button>

            <button
              type="button"
              data-ocid="nav.link"
              className="hidden md:flex flex-col items-start px-2 py-1 rounded-sm"
              style={{ ...navBorderStyle, color: "white" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  navBorderHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "transparent";
              }}
              onClick={() => onNavigate("about")}
            >
              <span style={{ fontSize: "0.7rem", color: "#ccc" }}>
                Hello, Sign in
              </span>
              <span
                className="flex items-center gap-0.5"
                style={{ fontSize: "0.82rem", fontWeight: 700, color: "white" }}
              >
                Account &amp; Lists <ChevronDown size={12} />
              </span>
            </button>

            <button
              type="button"
              data-ocid="nav.link"
              className="hidden lg:flex flex-col items-start px-2 py-1 rounded-sm"
              style={{ ...navBorderStyle, color: "white" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  navBorderHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "transparent";
              }}
              onClick={() => onNavigate("about")}
            >
              <span style={{ fontSize: "0.7rem", color: "#ccc" }}>Returns</span>
              <span
                style={{ fontSize: "0.82rem", fontWeight: 700, color: "white" }}
              >
                &amp; Orders
              </span>
            </button>

            <button
              type="button"
              data-ocid="nav.link"
              className="flex items-end gap-1 px-2 py-1 rounded-sm"
              style={{ ...navBorderStyle, color: "white" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  navBorderHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "transparent";
              }}
              onClick={() => onNavigate("cart")}
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingCart size={28} />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-2 left-3 text-xs font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full"
                    style={{
                      background: "var(--amz-orange)",
                      color: "white",
                      fontSize: "0.7rem",
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </div>
              <span
                className="hidden sm:block"
                style={{ fontSize: "0.82rem", fontWeight: 700, color: "white" }}
              >
                Cart
              </span>
            </button>

            <button
              type="button"
              className="md:hidden px-2 py-1"
              style={{ color: "white" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* ── Secondary Nav Bar ── */}
        <div
          className="w-full flex items-center overflow-x-auto"
          style={{ background: "var(--amz-nav)", scrollbarWidth: "none" }}
        >
          <button
            type="button"
            data-ocid="nav.button"
            className="flex items-center gap-1 px-3 py-2 flex-shrink-0"
            style={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 700,
              whiteSpace: "nowrap",
              border: "1px solid transparent",
              background: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                navBorderHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "transparent";
            }}
            onClick={() => onNavigate("catalogue")}
          >
            <Menu size={16} /> All
          </button>
          {SEC_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              data-ocid="nav.link"
              className="amz-nav-link flex-shrink-0"
              onClick={() => onNavigate(link.page)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="w-full py-4 px-4 flex flex-col gap-3"
            style={{
              background: "var(--amz-dark)",
              borderTop: "1px solid #333",
            }}
          >
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="flex-1 px-3 py-2 text-sm"
                style={{
                  background: "white",
                  color: "#111",
                  border: "none",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                className="px-3"
                style={{ background: "var(--amz-orange)", color: "white" }}
              >
                <Search size={16} />
              </button>
            </form>
            {(
              [
                { label: "Home", page: "home" },
                { label: "Shop All", page: "catalogue" },
                { label: "Cart", page: "cart" },
                { label: "Contact", page: "contact" },
              ] as { label: string; page: Page }[]
            ).map((l) => (
              <button
                key={l.label}
                type="button"
                data-ocid="nav.link"
                onClick={() => {
                  onNavigate(l.page);
                  setMobileOpen(false);
                }}
                className="text-left text-sm py-1"
                style={{ color: "white", background: "none", border: "none" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Secret Admin Login Modal ── */}
      {showAdminModal && (
        <div
          data-ocid="admin.modal"
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999, background: "rgba(0,0,0,0.85)" }}
          onClick={() => setShowAdminModal(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowAdminModal(false)}
          role="presentation"
        >
          <div
            className="relative flex flex-col items-center rounded-2xl px-8 py-10"
            style={{
              background: "#0a0a0a",
              border: "1.5px solid #c9a227",
              minWidth: "320px",
              maxWidth: "400px",
              width: "90vw",
              boxShadow: "0 0 48px rgba(201,162,39,0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              data-ocid="admin.close_button"
              onClick={() => setShowAdminModal(false)}
              className="absolute top-4 right-4 flex items-center justify-center rounded-full"
              style={{
                background: "rgba(201,162,39,0.15)",
                border: "1px solid #c9a227",
                color: "#c9a227",
                width: "32px",
                height: "32px",
              }}
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Logo */}
            <img
              src={logoUrl || LOGO_SRC}
              alt="NexaNouri"
              className="h-16 w-auto object-contain mb-4"
            />

            {/* Title */}
            <h2
              className="mb-1 text-center tracking-widest uppercase"
              style={{
                color: "#c9a227",
                fontSize: "1.1rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
              }}
            >
              Admin Access
            </h2>
            <p
              className="mb-6 text-center"
              style={{ color: "#888", fontSize: "0.78rem" }}
            >
              Authorised personnel only
            </p>

            <form
              onSubmit={handleAdminSubmit}
              className="w-full flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="admin-username"
                  style={{
                    color: "#c9a227",
                    fontSize: "0.78rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  USERNAME
                </label>
                <input
                  id="admin-username"
                  type="text"
                  data-ocid="admin.input"
                  value={adminId}
                  onChange={(e) => {
                    setAdminId(e.target.value);
                    setAdminError(false);
                  }}
                  autoComplete="username"
                  className="w-full px-4 py-2.5 rounded-lg outline-none"
                  style={{
                    background: "#111",
                    border: "1px solid #c9a227",
                    color: "white",
                    fontSize: "0.92rem",
                  }}
                  placeholder="Enter username"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="admin-password"
                  style={{
                    color: "#c9a227",
                    fontSize: "0.78rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  PASSWORD
                </label>
                <input
                  id="admin-password"
                  type="password"
                  data-ocid="admin.input"
                  value={adminPw}
                  onChange={(e) => {
                    setAdminPw(e.target.value);
                    setAdminError(false);
                  }}
                  autoComplete="current-password"
                  className="w-full px-4 py-2.5 rounded-lg outline-none"
                  style={{
                    background: "#111",
                    border: "1px solid #c9a227",
                    color: "white",
                    fontSize: "0.92rem",
                  }}
                  placeholder="Enter password"
                />
              </div>

              {adminError && (
                <p
                  data-ocid="admin.error_state"
                  className="text-center text-sm"
                  style={{ color: "#ff4d4d" }}
                >
                  Invalid credentials. Try again.
                </p>
              )}

              <button
                type="submit"
                data-ocid="admin.submit_button"
                className="w-full py-3 rounded-lg font-bold tracking-widest uppercase mt-2"
                style={{
                  background: "linear-gradient(135deg, #c9a227, #f0d060)",
                  color: "#0a0a0a",
                  fontSize: "0.92rem",
                  letterSpacing: "0.12em",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Enter Admin
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
