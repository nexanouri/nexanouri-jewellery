import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { NexaAIChat } from "./components/NexaAIChat";
import { CartProvider } from "./context/CartContext";
import { LogoProvider } from "./context/LogoContext";
import { About } from "./pages/About";
import { Admin } from "./pages/Admin";
import { Cart } from "./pages/Cart";
import { Catalogue } from "./pages/Catalogue";
import { Checkout } from "./pages/Checkout";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";

type Page =
  | "home"
  | "catalogue"
  | "about"
  | "contact"
  | "cart"
  | "checkout"
  | "admin"
  | "product";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [productId, setProductId] = useState<bigint | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = (p: Page, id?: bigint, search?: string) => {
    setPage(p);
    if (id !== undefined) setProductId(id);
    if (search !== undefined) setSearchQuery(search);
    else if (p !== "catalogue") setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const noFooter = page === "checkout";

  return (
    <LogoProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen w-full">
          <Navbar onNavigate={navigate} />
          <main className="flex-1 w-full">
            {page === "home" && <Home onNavigate={navigate} />}
            {page === "catalogue" && (
              <Catalogue onNavigate={navigate} initialSearch={searchQuery} />
            )}
            {page === "product" && productId !== null && (
              <ProductDetail productId={productId} onNavigate={navigate} />
            )}
            {page === "cart" && <Cart onNavigate={navigate} />}
            {page === "checkout" && <Checkout onNavigate={navigate} />}
            {page === "about" && <About onNavigate={navigate} />}
            {page === "contact" && <Contact />}
            {page === "admin" && <Admin />}
          </main>
          {!noFooter && <Footer onNavigate={navigate} />}
        </div>
        <Toaster />
        {/* NexaAI floating chat widget - visible on all pages */}
        {page !== "admin" && <NexaAIChat />}
      </CartProvider>
    </LogoProvider>
  );
}
