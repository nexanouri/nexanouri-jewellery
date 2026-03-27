import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

type Message = { role: "ai" | "user"; text: string; id: number };

const GOLD = "#C9A84C";

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (/profit|laabh|benefit|earn|income|kamao/.test(q)) {
    return "💰 Profit Tip: Bracelet cost ~₹400, sell at ₹1200 = ₹800 profit per piece. Sell 10/day = ₹8,000/day profit! Upsell rings and chains to boost average order value.";
  }
  if (/market|sell|customer|promo|advertis|instagram|social|whatsapp/.test(q)) {
    return "📣 Marketing Strategy: Post 3 reels/day on Instagram showing how bracelets look on wrist. Add WhatsApp 'Buy Now' link in bio. Run 'Buy 2 Get 10% Off' offers. Stories with countdown timers drive urgency!";
  }
  if (
    /stock|inventory|product|item|bracelet|ring|chain|necklace|earring/.test(q)
  ) {
    return "📦 Stock Advice: Keep 20+ units of best-selling bracelets (₹1200 range). Reorder when stock hits 5 units. Track your top 3 sellers weekly and always keep them in stock.";
  }
  if (/order|delivery|ship|courier|dispatch|track/.test(q)) {
    return "🚚 Order Update: Standard delivery 5–7 days, Express 2–3 days (₹80 extra). Notify customers via WhatsApp with tracking link after dispatch. Always confirm prepaid orders within 1 hour.";
  }
  if (/upi|payment|pay|cod|cash|money|transfer/.test(q)) {
    return "💳 Payment Tips: UPI payments settle instantly to your bank. COD has 15% return risk — encourage prepaid with 5% discount. QR code is auto-generated for each order amount in checkout.";
  }
  if (/price|mrp|discount|offer|sale|deal/.test(q)) {
    return "🏷️ Pricing Strategy: Show MRP ₹1,800–₹5,000 crossed out, sell at ₹1,200–₹1,300. Higher the MRP shown, more the perceived value. Use '₹200 Off Today Only' banners for urgency.";
  }
  if (/logo|design|website|color|theme|page/.test(q)) {
    return "🎨 Design Tip: Your NexaNouri brand looks premium with gold + black. Keep product photos clean with white/dark backgrounds. Consistency = trust = more sales.";
  }
  if (/hello|hi|namaste|hey|hlo|hii|good/.test(q)) {
    return "Namaste! 🙏 I'm NexaAI 3X, your jewellery business assistant. Ask me about profits, marketing, stock, orders, payments — I'm here to help you grow NexaNouri!";
  }
  if (/thank|shukriya|dhanyawad|tnx|ty/.test(q)) {
    return "You're welcome! 💛 Keep growing NexaNouri — you're doing great! Ask me anything anytime.";
  }
  if (/best sell|top product|popular/.test(q)) {
    return "🌟 Best Sellers Strategy: Bracelets in gold/silver tones sell 3x more. Highlight them on homepage carousels. Add 'Best Seller' badge on top 3 products to guide customers faster to purchase.";
  }
  if (/return|refund|complaint|problem|issue/.test(q)) {
    return "🔄 Returns Policy: Keep it simple — 7-day easy returns builds trust. For jewellery, photo/video proof of damage required. Quick refunds = repeat customers.";
  }
  return "✨ Great question! For NexaNouri, here's my advice: Focus on your bracelets as your hero products, maintain consistent WhatsApp follow-ups with customers, and post daily on Instagram. Small consistent actions = big sales growth. What else can I help you with?";
}

let msgCounter = 1;

export function NexaAIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "ai",
      text: "Namaste! I'm NexaAI 3X. Ask me anything about your jewellery business — marketing, profits, stock, orders!",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: msgCounter++, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const aiMsg: Message = {
        id: msgCounter++,
        role: "ai",
        text: getResponse(text),
      };
      setMessages((prev) => [...prev, aiMsg]);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  return (
    <>
      {/* Floating Button — sits above footer on mobile (bottom-20 sm:bottom-6) */}
      <AnimatePresence>
        {!open && (
          <motion.button
            data-ocid="nexaai.open_modal_button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl text-sm font-bold text-black cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${GOLD} 0%, #f0d070 50%, ${GOLD} 100%)`,
              boxShadow: "0 4px 24px rgba(201,168,76,0.5)",
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden xs:inline">NexaAI</span>
            <span className="xs:hidden">AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel — full screen on mobile, 380px panel on desktop */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-ocid="nexaai.dialog"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed z-50 flex flex-col overflow-hidden shadow-2xl
              inset-0 rounded-none
              sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:rounded-2xl"
            style={{
              background: "#1a1205",
              border: `1.5px solid ${GOLD}`,
              /* height: auto on mobile (inset-0), fixed on desktop */
              height: undefined,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{
                background: "linear-gradient(90deg, #2a1d08 0%, #1a1205 100%)",
                borderBottom: `1px solid ${GOLD}44`,
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, #f0d070)`,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: GOLD }}>
                    NexaAI 3X
                  </p>
                  <p className="text-xs text-gray-400">
                    Your Jewellery Business AI
                  </p>
                </div>
              </div>
              <button
                data-ocid="nexaai.close_button"
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages — flex-1 so it fills remaining space */}
            <ScrollArea className="flex-1 px-4 py-3 min-h-0">
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed"
                      style={
                        msg.role === "ai"
                          ? {
                              background: "#2a1d08",
                              color: "#f5e6c0",
                              border: `1px solid ${GOLD}33`,
                              borderBottomLeftRadius: "4px",
                            }
                          : {
                              background: `linear-gradient(135deg, ${GOLD} 0%, #f0d070 100%)`,
                              color: "#1a1205",
                              fontWeight: 600,
                              borderBottomRightRadius: "4px",
                            }
                      }
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div
              className="px-3 py-3 flex gap-2 flex-shrink-0"
              style={{ borderTop: `1px solid ${GOLD}44` }}
            >
              <Input
                data-ocid="nexaai.input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask NexaAI anything..."
                className="flex-1 text-xs bg-black/40 border-none text-white placeholder:text-gray-500 focus-visible:ring-1"
                style={{ outline: `1px solid ${GOLD}44` }}
              />
              <Button
                data-ocid="nexaai.submit_button"
                onClick={send}
                size="sm"
                className="px-3 text-black font-bold flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, #f0d070)`,
                }}
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
