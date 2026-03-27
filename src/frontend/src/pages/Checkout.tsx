import {
  CheckCircle,
  Lock,
  MapPin,
  QrCode,
  Smartphone,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useActor } from "../hooks/useActor";
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

interface CheckoutProps {
  onNavigate: (page: Page) => void;
}

const SHIPPING_THRESHOLD = BigInt(1000000);
const SHIPPING_COST = BigInt(9900);

function buildUpiQrUrl(upiId: string, amountRupees: number, orderId: bigint) {
  const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=NexaNouri&am=${amountRupees.toFixed(2)}&cu=INR&tn=Order${String(orderId)}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(upiLink)}`;
}

export function Checkout({ onNavigate }: CheckoutProps) {
  const { actor } = useActor();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"prepaid" | "cod">(
    "prepaid",
  );
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<bigint | null>(null);
  const [error, setError] = useState("");
  const [upiId, setUpiId] = useState("");

  useEffect(() => {
    if (!actor) return;
    actor
      .getUpiId()
      .then((id) => {
        if (id) setUpiId(id);
      })
      .catch(() => {});
  }, [actor]);

  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState<{
    charge: number;
    days: string;
  } | null>(null);

  const checkDelivery = () => {
    if (pincode.length !== 6 || !/^[1-9]/.test(pincode)) {
      setDeliveryInfo(null);
      return;
    }
    const first = Number.parseInt(pincode[0]);
    const subtotalRupees = Number(totalPrice) / 100;
    const freeDelivery = subtotalRupees >= 1500;
    let charge: number;
    let days: string;
    if (first >= 1 && first <= 6) {
      charge = freeDelivery ? 0 : 99;
      days = "2-4 business days";
    } else if (first === 7 || first === 8) {
      charge = freeDelivery ? 0 : 149;
      days = "3-5 business days";
    } else {
      charge = freeDelivery ? 0 : 199;
      days = "5-7 business days";
    }
    setDeliveryInfo({ charge, days });
  };

  const shipping = totalPrice >= SHIPPING_THRESHOLD ? BigInt(0) : SHIPPING_COST;
  const total = totalPrice + shipping;
  const totalRupees = Number(total) / 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || items.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const orderItems = items.map((i) => ({
        productId: i.productId,
        quantity: BigInt(i.quantity),
      }));
      const order = {
        id: BigInt(0),
        status: "pending",
        total,
        paymentMethod,
        createdAt: BigInt(Date.now()),
        shipping: {
          name: form.fullName,
          address: form.address,
          city: form.city,
          state: form.state,
          postalCode: form.zip,
          country: form.country,
          contact: form.email,
        },
        items: orderItems,
      };
      const id = await actor.placeOrder(order);
      setOrderId(id);
      clearCart();
    } catch {
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId !== null) {
    if (paymentMethod === "prepaid" && upiId) {
      return (
        <div className="min-h-screen bg-ivory pt-20 flex items-center justify-center px-4">
          <div className="bg-white p-10 text-center max-w-md w-full shadow-xl border border-gray-100">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span
                className="h-px w-12"
                style={{ background: "rgba(201,168,76,0.4)" }}
              />
              <QrCode size={28} style={{ color: "var(--gold)" }} />
              <span
                className="h-px w-12"
                style={{ background: "rgba(201,168,76,0.4)" }}
              />
            </div>
            <h2
              className="font-display text-3xl mb-1"
              style={{ color: "var(--burgundy-deep)" }}
            >
              Scan to Pay
            </h2>
            <p className="font-body text-gray-400 text-sm mb-6">
              Order #{String(orderId)} · Pay ₹{totalRupees.toFixed(2)} via UPI
            </p>

            <div
              className="inline-block p-2 mb-5 shadow-lg"
              style={{ border: "4px solid rgba(201,168,76,0.3)" }}
            >
              <img
                src={buildUpiQrUrl(upiId, totalRupees, orderId)}
                alt="UPI QR Code"
                width={220}
                height={220}
                className="block"
              />
            </div>

            <div
              className="px-5 py-4 mb-6 text-left"
              style={{
                background: "var(--ivory2)",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-2">
                Payment details
              </p>
              <div className="space-y-1 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">UPI ID</span>
                  <span
                    className="font-medium"
                    style={{ color: "var(--burgundy-deep)" }}
                  >
                    {upiId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--gold)" }}
                  >
                    ₹{totalRupees.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 px-4 py-3 text-left mb-6">
              <Smartphone
                size={16}
                className="text-amber-600 mt-0.5 flex-shrink-0"
              />
              <p className="font-body text-xs text-amber-700">
                Open any UPI app (PhonePe, Google Pay, Paytm) and scan this QR.
                Payment goes directly to the store's bank account.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("catalogue")}
              className="w-full btn-gold py-4 tracking-[0.1em]"
            >
              Done — Continue Shopping
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-ivory pt-20 flex items-center justify-center">
        <div className="bg-white p-14 text-center max-w-md shadow-xl border border-gray-100">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ border: "2px solid var(--gold)" }}
          >
            <CheckCircle size={36} style={{ color: "var(--gold)" }} />
          </div>
          <h2
            className="font-display text-3xl mb-3"
            style={{ color: "var(--burgundy-deep)" }}
          >
            Order Confirmed!
          </h2>
          <p className="font-body text-gray-400 text-sm mb-1">
            Order #{String(orderId)}
          </p>
          {paymentMethod === "cod" && (
            <div className="flex items-center justify-center gap-2 my-3 bg-gray-50 border border-gray-100 px-4 py-2">
              <Truck size={15} className="text-gray-400" />
              <span className="font-body text-sm text-gray-500">
                Pay on delivery
              </span>
            </div>
          )}
          <p className="font-body text-gray-500 mb-10">
            Thank you for your order. We'll be in touch soon.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("catalogue")}
            className="btn-gold py-4 px-10"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pt-20">
      <div
        className="relative py-16 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #4E1029 0%, #6B1A3A 100%)",
        }}
      >
        <div
          className="absolute inset-6 pointer-events-none"
          style={{ border: "1px solid rgba(201,168,76,0.15)" }}
        />
        <h1 className="font-display text-4xl text-white">Secure Checkout</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h2
                className="font-display text-2xl"
                style={{ color: "var(--burgundy-deep)" }}
              >
                Shipping Address
              </h2>
              <Lock size={14} className="text-gray-400" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { key: "fullName", label: "Full Name", type: "text" },
                { key: "email", label: "Email / Phone", type: "text" },
                { key: "address", label: "Street Address", type: "text" },
                { key: "city", label: "City", type: "text" },
                { key: "state", label: "State", type: "text" },
                { key: "country", label: "Country", type: "text" },
                { key: "zip", label: "Postcode / ZIP", type: "text" },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    htmlFor={f.key}
                    className="block font-body text-xs uppercase tracking-widest mb-1 font-semibold"
                    style={{ color: "var(--burgundy)" }}
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.key}
                    type={f.type}
                    required
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.key]: e.target.value }))
                    }
                    data-ocid={`checkout.${f.key}.input`}
                    className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none transition-colors"
                    style={{ borderColor: "rgba(107,26,58,0.2)" }}
                  />
                </div>
              ))}

              <div className="pt-2">
                <p
                  className="font-body text-xs uppercase tracking-widest mb-3 font-semibold"
                  style={{ color: "var(--burgundy)" }}
                >
                  Payment Method
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    data-ocid="checkout.prepaid.toggle"
                    onClick={() => setPaymentMethod("prepaid")}
                    className="relative flex flex-col items-center gap-2 border-2 px-4 py-4 transition-all"
                    style={{
                      borderColor:
                        paymentMethod === "prepaid"
                          ? "var(--gold)"
                          : "rgba(107,26,58,0.15)",
                      background:
                        paymentMethod === "prepaid"
                          ? "rgba(201,168,76,0.05)"
                          : "transparent",
                    }}
                  >
                    {paymentMethod === "prepaid" && (
                      <span
                        className="absolute top-2 right-2 w-3 h-3 rounded-full"
                        style={{ background: "var(--gold)" }}
                      />
                    )}
                    <QrCode
                      size={22}
                      style={{
                        color:
                          paymentMethod === "prepaid" ? "var(--gold)" : "#ccc",
                      }}
                    />
                    <span
                      className="font-body text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--burgundy-deep)" }}
                    >
                      Prepaid
                    </span>
                    <span className="font-body text-[10px] text-gray-400 text-center leading-tight">
                      UPI / QR Code
                    </span>
                  </button>
                  <button
                    type="button"
                    data-ocid="checkout.cod.toggle"
                    onClick={() => setPaymentMethod("cod")}
                    className="relative flex flex-col items-center gap-2 border-2 px-4 py-4 transition-all"
                    style={{
                      borderColor:
                        paymentMethod === "cod"
                          ? "var(--gold)"
                          : "rgba(107,26,58,0.15)",
                      background:
                        paymentMethod === "cod"
                          ? "rgba(201,168,76,0.05)"
                          : "transparent",
                    }}
                  >
                    {paymentMethod === "cod" && (
                      <span
                        className="absolute top-2 right-2 w-3 h-3 rounded-full"
                        style={{ background: "var(--gold)" }}
                      />
                    )}
                    <Truck
                      size={22}
                      style={{
                        color: paymentMethod === "cod" ? "var(--gold)" : "#ccc",
                      }}
                    />
                    <span
                      className="font-body text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--burgundy-deep)" }}
                    >
                      Cash on Delivery
                    </span>
                    <span className="font-body text-[10px] text-gray-400 text-center leading-tight">
                      Pay when received
                    </span>
                  </button>
                </div>
                {paymentMethod === "prepaid" && !upiId && (
                  <p className="font-body text-xs text-amber-600 mt-2 bg-amber-50 px-3 py-2 border border-amber-100">
                    UPI not configured yet — admin must set a UPI ID.
                  </p>
                )}
                {paymentMethod === "prepaid" && upiId && (
                  <p className="font-body text-xs text-emerald-700 mt-2 bg-emerald-50 px-3 py-2 border border-emerald-100">
                    A UPI QR code will be shown after placing your order.
                    Amount: ₹{totalRupees.toFixed(2)}
                  </p>
                )}
              </div>

              {error && (
                <p
                  className="text-red-500 font-body text-sm"
                  data-ocid="checkout.error_state"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                data-ocid="checkout.submit_button"
                className="w-full btn-gold py-4 tracking-[0.15em] mt-2"
              >
                {loading
                  ? "Placing Order…"
                  : paymentMethod === "prepaid"
                    ? "Place Order & Get QR Code"
                    : "Place Order — Pay on Delivery"}
              </button>
            </form>
          </div>

          <div>
            <h2
              className="font-display text-2xl mb-6"
              style={{ color: "var(--burgundy-deep)" }}
            >
              Order Summary
            </h2>
            <div className="bg-white p-6 shadow-sm border border-gray-100">
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={String(item.productId)} className="flex gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-body text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="font-body text-xs text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p
                      className="font-display text-sm"
                      style={{ color: "var(--gold)" }}
                    >
                      {formatPrice(item.price * BigInt(item.quantity))}
                    </p>
                  </div>
                ))}
              </div>
              {/* Delivery Calculator */}
              <div className="border-t border-gray-100 pt-4 pb-3">
                <p
                  className="text-sm font-medium mb-2"
                  style={{ color: "var(--burgundy-deep)" }}
                >
                  <MapPin size={14} className="inline mr-1" />
                  Check Delivery
                </p>
                <div className="flex gap-2">
                  <input
                    data-ocid="checkout.input"
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, ""));
                      setDeliveryInfo(null);
                    }}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1"
                  />
                  <button
                    type="button"
                    data-ocid="checkout.secondary_button"
                    onClick={checkDelivery}
                    className="px-3 py-1.5 text-sm font-medium rounded"
                    style={{ background: "var(--gold)", color: "#111" }}
                  >
                    Check
                  </button>
                </div>
                {deliveryInfo && (
                  <div
                    className="mt-2 text-xs p-2 rounded"
                    style={{
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <p className="text-green-700 font-medium">
                      {deliveryInfo.charge === 0
                        ? "🎉 Free Delivery!"
                        : `Delivery: ₹${deliveryInfo.charge}`}
                    </p>
                    <p className="text-green-600">
                      Estimated delivery: {deliveryInfo.days}
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>
                    {shipping === BigInt(0) ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-bold pt-3 border-t border-gray-100 text-base">
                  <span style={{ color: "var(--burgundy-deep)" }}>Total</span>
                  <span
                    className="font-display text-xl"
                    style={{ color: "var(--gold)" }}
                  >
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-gray-400 text-xs">In Rupees</span>
                  <span className="text-gray-500 text-xs">
                    ₹{totalRupees.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
