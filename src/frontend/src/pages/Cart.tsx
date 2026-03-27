import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/productImages";

type Page =
  | "home"
  | "catalogue"
  | "about"
  | "contact"
  | "cart"
  | "checkout"
  | "admin"
  | "product";

interface CartProps {
  onNavigate: (page: Page) => void;
}

const SHIPPING_THRESHOLD = BigInt(10000);
const SHIPPING_COST = BigInt(999);

export function Cart({ onNavigate }: CartProps) {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const shipping = totalPrice >= SHIPPING_THRESHOLD ? BigInt(0) : SHIPPING_COST;
  const total = totalPrice + shipping;

  if (items.length === 0)
    return (
      <div className="min-h-screen bg-ivory pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full border-2 border-gold/30 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-gray-300" />
          </div>
          <h2 className="font-display text-3xl text-burgundy-deep mb-3">
            Your cart is empty
          </h2>
          <p className="font-body text-gray-400 mb-8">
            Discover our exquisite collection
          </p>
          <button
            type="button"
            onClick={() => onNavigate("catalogue")}
            className="btn-gold py-4 px-10 shadow-lg shadow-gold/20"
          >
            Shop Now
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-ivory pt-20">
      <div
        className="relative py-16 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #4E1029 0%, #6B1A3A 100%)",
        }}
      >
        <div className="absolute inset-6 border border-gold/15 pointer-events-none" />
        <h1 className="font-display text-4xl text-white">Shopping Cart</h1>
      </div>

      <div className="w-full px-6 lg:px-12 xl:px-16 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={String(item.productId)}
                className="bg-white flex gap-4 p-4 shadow-sm"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-display text-base text-burgundy-deep">
                    {item.name}
                  </h3>
                  <p className="text-gold font-display text-sm mt-1">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-50"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-10 text-center font-body text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-50"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 h-fit shadow-sm border border-gray-100">
            <h2 className="font-display text-xl text-burgundy-deep mb-6 pb-4 border-b border-gray-100">
              Order Summary
            </h2>
            <div className="space-y-3 font-body text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>
                  {shipping === BigInt(0) ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              {shipping === BigInt(0) && (
                <p className="text-green-600 text-xs">
                  ✓ You qualify for free shipping!
                </p>
              )}
              <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-base">
                <span className="text-burgundy-deep">Total</span>
                <span className="text-gold font-display text-xl">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("checkout")}
              className="w-full btn-gold mt-6 py-4 tracking-[0.12em] shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
            >
              Checkout <ArrowRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("catalogue")}
              className="w-full mt-3 font-body text-xs text-gray-400 hover:text-burgundy transition-colors uppercase tracking-widest"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
