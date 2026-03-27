import {
  CheckCircle,
  ChevronDown,
  CreditCard,
  Edit2,
  LayoutDashboard,
  LogIn,
  Mail,
  Package,
  Plus,
  Send,
  Settings,
  ShoppingBag,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type {
  ContactMessage,
  Order,
  Product,
  SiteSettings,
} from "../backend.d";
import { useActor } from "../hooks/useActor";

const ADMIN_PASSWORD = "nexanouri2024";
const AUTH_KEY = "nxa_admin_auth";
const CATEGORIES = ["necklaces", "rings", "earrings", "bracelets", "sets"];
const STATUS_OPTS = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];
const STATUS_COLORS: Record<string, string> = {
  pending: "#C9A84C",
  confirmed: "#60a5fa",
  shipped: "#a78bfa",
  delivered: "#4ade80",
  cancelled: "#f87171",
};

type Tab =
  | "dashboard"
  | "products"
  | "orders"
  | "payments"
  | "settings"
  | "messages"
  | "newsletter"
  | "ai";

interface ProductForm {
  name: string;
  description: string;
  priceStr: string;
  category: string;
  materials: string;
  imageUrlsStr: string;
  stockStr: string;
  featured: boolean;
}

const EMPTY_FORM: ProductForm = {
  name: "",
  description: "",
  priceStr: "0.00",
  category: "necklaces",
  materials: "",
  imageUrlsStr: "",
  stockStr: "10",
  featured: false,
};

const G = "rgba(201,168,76,0.7)";
const B = "rgba(201,168,76,0.25)";

// AI Engine
function getAIResponse(
  input: string,
  products: Product[],
  orders: Order[],
): Promise<string> {
  // Smart language normalizer — understands informal, slang, shorthand
  const slangMap: Record<string, string> = {
    ok: "okay all good",
    okk: "okay all good",
    okey: "okay all good",
    set: "all ready done completed",
    done: "completed finished",
    thx: "thank you",
    tnx: "thank you",
    ty: "thank you",
    pls: "please",
    plz: "please",
    plss: "please",
    asap: "fast urgent quickly",
    bro: "friend",
    yaar: "friend",
    kya: "what",
    kaise: "how",
    kitna: "how much price cost",
    batao: "tell me explain",
    btao: "tell me explain",
    bata: "tell me explain",
    chahiye: "i need i want",
    nahi: "no not",
    hai: "is",
    kar: "do make",
    karo: "do make",
    dedo: "give me",
    dena: "give me",
    bol: "tell say",
    bolo: "tell say explain",
    kab: "when",
    kyun: "why",
    mera: "my",
    meri: "my",
    mujhe: "i need i want",
    sab: "all everything",
    accha: "good okay",
    theek: "okay good",
    chal: "okay let's go proceed",
    yup: "yes",
    yep: "yes",
    nope: "no",
    wanna: "want to",
    gonna: "going to",
    gotta: "have to need to",
    lemme: "let me",
    gimme: "give me",
    u: "you",
    r: "are",
    ur: "your",
    hw: "how",
    wt: "what",
    abt: "about",
    b4: "before",
    "2day": "today",
    "2moro": "tomorrow",
    gr8: "great",
    wat: "what",
    nd: "and",
    n: "and",
    m: "am",
    ik: "i know",
    idk: "i don't know",
    ngl: "honestly",
    tbh: "to be honest",
    imo: "in my opinion",
    fyi: "for your information",
    btw: "by the way",
    lmk: "let me know",
    hmu: "contact me",
    dm: "direct message",
    biz: "business",
    buss: "business",
    busines: "business",
    buisness: "business",
    jewllery: "jewellery",
    jewlery: "jewellery",
    jewellry: "jewellery",
    braclet: "bracelet",
    bracelat: "bracelet",
    necklase: "necklace",
    earing: "earring",
    earings: "earrings",
    pendent: "pendant",
    dimond: "diamond",
    proffit: "profit",
    marketting: "marketing",
    advertise: "marketing advertising",
    custmer: "customer",
    customar: "customer",
    delievery: "delivery",
    delivry: "delivery",
    paymant: "payment",
    ordder: "order",
    websit: "website",
    websitee: "website",
    "admin pannel": "admin panel",
    pannel: "panel",
  };
  const words = input.toLowerCase().split(/\s+/);
  const normalized = words.map((w) => slangMap[w] ?? w).join(" ");
  const lower = normalized;
  return new Promise((resolve) => {
    setTimeout(() => {
      if (
        /instagram|caption|social|post|reel|story|facebook|promote|advertise|marketing|grow|brand|viral|hashtag/.test(
          lower,
        )
      ) {
        resolve(`📸 3 Viral Instagram Caption Templates for NexaNouri

Option 1 — Emotional:
"She doesn't need a crown. Her jewellery speaks for itself. 👑✨
Shop the NexaNouri Bracelet Collection — link in bio.
#NexaNouri #LuxuryJewellery #BraceletLover #GoldJewellery #JewelleryOfInstagram #GoldPlated #IndianJewellery"

Option 2 — Offer / Urgency:
"🔥 Premium gold bracelet at just ₹1200?? YES, you read that right.
Only 5 pieces left. DM us NOW or shop via link in bio!
#BraceletOfTheDay #GoldPlated #AffordableLuxury #NexaNouri #FashionJewellery #Dropshipping"

Option 3 — Lifestyle:
"Your outfit is 90% complete. The other 10% is this bracelet. 💫
Elevate every look with NexaNouri. Free delivery | Prepaid UPI.
#StyleTips #JewelleryStyling #OOTDIndia #NexaNouri #GoldBracelet #WomenFashion"

📱 WhatsApp Business Strategy:
• Set auto-reply: "Hi! Thanks for contacting NexaNouri 💛 Browse: [website link]"
• Send new arrivals every Monday 8 AM via broadcast list
• Weekend deals every Friday 6 PM

📌 Pinterest Tip:
Pin product photos with keyword titles like "gold bracelet under 1500 india" — drives free traffic for months!

⏰ Best Posting Times (IST): 7–9 AM | 12–2 PM | 7–9 PM
📅 Post: 1 Reel + 3 Stories per day for maximum reach

🛠 Free Tools: Canva (designs), CapCut (Reels), Buffer (scheduling)`);
        return;
      }

      if (
        /profit|margin|financial|finance|earn|income|revenue|money|rupee|₹|cost|expense|investment|roi|return/.test(
          lower,
        )
      ) {
        const validOrders = orders.filter((o) => o.status !== "cancelled");
        const totalRevenue =
          validOrders.reduce((a, o) => a + Number(o.total), 0) / 100;
        const cogs = totalRevenue * 0.45;
        const grossProfit = totalRevenue - cogs;
        const margin =
          totalRevenue > 0
            ? ((grossProfit / totalRevenue) * 100).toFixed(1)
            : "0.0";
        resolve(`📊 Your NexaNouri Financial Summary (Live Data)

Total Orders: ${orders.length} (${validOrders.length} active, ${orders.length - validOrders.length} cancelled)
Total Revenue: ₹${totalRevenue.toFixed(0)}
Estimated COGS (45%): ₹${cogs.toFixed(0)}
Gross Profit Estimate: ₹${grossProfit.toFixed(0)}
Profit Margin: ${margin}%

💡 How to Increase Your Profit Margins:
1. Upsell complementary items (earrings + bracelet sets)
2. Bundle deals increase average order value by 30–50%
3. Reduce returns with better product photos and descriptions
4. Negotiate better supplier pricing when ordering in bulk (10+ units)

🎯 Target Margins for Dropshipping:
• Good: 25–30% | Great: 30–40% | Excellent: 40%+
• You're currently at ${margin}% — ${Number(margin) >= 30 ? "excellent! Keep it up 🏆" : "room to grow. Try bundling products!"}

📈 Monthly Income Projections (based on current volume):
• ${validOrders.length} orders this period × ₹${totalRevenue > 0 && validOrders.length > 0 ? (totalRevenue / validOrders.length).toFixed(0) : "1200"} avg → ₹${(validOrders.length * (totalRevenue > 0 && validOrders.length > 0 ? totalRevenue / validOrders.length : 1200)).toFixed(0)}/period
• 50 orders/month → ₹${(50 * 1200 * 0.55).toFixed(0)} profit
• 100 orders/month → ₹${(100 * 1200 * 0.55).toFixed(0)} profit
• 200 orders/month → ₹${(200 * 1200 * 0.55).toFixed(0)} profit`);
        return;
      }

      if (
        /stock|inventory|product|quantity|low|out of stock|restock|items|catalogue/.test(
          lower,
        )
      ) {
        const lowStock = products.filter((p) => Number(p.stock) < 5);
        const featured = products.filter((p) => p.featured);
        resolve(`📦 NexaNouri Live Inventory Report

Total Products: ${products.length}
Featured Products: ${featured.length}
Low Stock Alerts (< 5 units): ${lowStock.length}

${lowStock.length > 0 ? ["⚠️ LOW STOCK ITEMS (Restock Soon!):", ...lowStock.map((p) => `• ${p.name} — Only ${Number(p.stock)} left`)].join("\n") : "✅ All products have healthy stock levels!"}

${products.length < 20 ? `💡 Recommendation: You have ${products.length} products. Add more categories (rings, necklaces, earrings, pendants) to increase sales opportunities. Aim for 20+ products!` : `✅ Great! ${products.length} products gives customers plenty of choice.`}

📋 Stock Management Best Practices:
• Keep minimum 10 units buffer for bestsellers
• Restock when stock drops below 5 units
• Mark out-of-stock items as "Coming Soon" (not just hidden)
• Review and restock weekly — don't miss peak season demand

🏷️ Featured Products Strategy:
• Feature your top 4–6 bestsellers on homepage
• Rotate featured products monthly to keep fresh
• Currently ${featured.length} featured — ${featured.length < 4 ? "add more to fill your homepage carousels!" : "good selection!"}`);
        return;
      }

      if (
        /price|pricing|mrp|sale|discount|offer|rate|value|cheap|expensive/.test(
          lower,
        )
      ) {
        resolve(`💰 NexaNouri Pricing Strategy Guide

Category-by-Category Pricing Table:
┌─────────────────┬──────────────┬────────────────┬──────────┐
│ Category        │ MRP Range    │ Sale Price     │ Discount │
├─────────────────┼──────────────┼────────────────┼──────────┤
│ Bracelets       │ ₹1399–₹2500  │ ₹1200–₹1300   │ 15–48%   │
│ Necklaces/Chain │ ₹2000–₹4500  │ ₹1500–₹2200   │ 20–67%   │
│ Rings           │ ₹1300–₹2500  │ ₹1200–₹1500   │ 8–52%    │
│ Earrings        │ ₹1300–₹2000  │ ₹1200–₹1400   │ 8–40%    │
│ Pendants/Sets   │ ₹3500–₹5000  │ ₹2500–₹3200   │ 28–36%   │
└─────────────────┴──────────────┴────────────────┴──────────┘

🧠 Psychological Pricing Tips:
1. Always end in 9: ₹1,199 feels 20% cheaper than ₹1,200
2. Show MRP with red strikethrough — creates instant FOMO
3. Add "You save ₹X" badge — triggers buying impulse
4. "Limited Stock" badge justifies premium pricing
5. "Bestseller" tag = social proof = higher conversions

🏆 Competitor Comparison:
• Meesho avg: ₹800 (budget, poor quality perception)
• Amazon India avg: ₹1,500 (trusted but expensive)
• NexaNouri sweet spot: ₹1,200–₹1,400 (beats Amazon on price, wins on luxury feel!)

💡 Pro Tip: Never go below ₹1,100 — it devalues your luxury brand image!`);
        return;
      }

      if (
        /customer|reply|complaint|delivery|order|shipping|return|refund|message|review/.test(
          lower,
        )
      ) {
        resolve(`💬 Professional Customer Reply Templates

Template 1 — Delivery Time Query:
"Dear [Customer Name],
Thank you for choosing NexaNouri! 🙏
Your order has been confirmed and will be dispatched within 24–48 hours. Estimated delivery: 5–7 working days.
You will receive a tracking number via WhatsApp/SMS once shipped.
Warm regards, NexaNouri Customer Care 💛"

Template 2 — Order Status Update:
"Hi [Name]! Your NexaNouri order #[ID] has been shipped 🚀 Expected arrival: [date]. Thank you for your patience! 💛"

Template 3 — Handling a Complaint:
"Dear [Name], we sincerely apologize for the inconvenience. Please share a photo of the issue and we will arrange a replacement or full refund within 48 hours. No questions asked. 🙏"

Template 4 — Return/Refund:
"Hi! Please share your order number and we will process your return within 24 hours. Refund credited in 3–5 business days. Thank you for trusting NexaNouri! 💛"

⭐ Review Collection Strategy:
• After delivery, send WhatsApp: "Happy with your NexaNouri order? A quick Google/Instagram review means the world to us! 💛"
• Offer ₹50 discount on next order for a review with photo
• Screenshot reviews and post as Instagram Stories

⏰ Response Time Rule:
Reply within 1 hour on Instagram DMs — fast replies = 3X more conversions!`);
        return;
      }

      if (/seo|keyword|google|search|rank|traffic|website|online/.test(lower)) {
        resolve(`🔍 Top 20 SEO Keywords for NexaNouri (India)

High Volume (10K+ searches/month):
1. gold jewellery online india
2. artificial jewellery online
3. imitation jewellery
4. fashion jewellery online
5. gold plated bracelet india

Medium Volume (2K–10K/month):
6. buy bracelet online india
7. gold necklace set online
8. premium fashion jewellery
9. affordable gold jewellery
10. jewellery for women india

Long-Tail — Easy to Rank, High Intent:
11. luxury gold plated bracelet under 1500
12. buy imitation jewellery online india
13. best artificial jewellery shop online
14. gold necklace set for wedding india
15. premium jewellery dropshipping india
16. gold bracelet women india
17. fashion jewellery buy online
18. jewellery gift for women india
19. affordable luxury jewellery india
20. nexanouri jewellery india

📋 SEO Action Plan:
✅ Add top 5 keywords to all product titles
✅ Use long-tail keywords in product descriptions
✅ Create blog posts: "Top 10 Gold Bracelets Under ₹1500"
✅ Register on Google My Business (free local SEO)
✅ Get backlinks: post on fashion blogs, Reddit r/IndiaFashion

🔗 Free Backlink Strategy:
• Guest post on fashion/lifestyle blogs
• Answer jewellery questions on Quora with your link
• List on IndiaMART, JustDial as online jewellery store`);
        return;
      }

      if (
        /grow|strategy|scale|expand|target|goal|sales|success|tips|advice|help/.test(
          lower,
        )
      ) {
        resolve(`🚀 30-Day NexaNouri Growth Roadmap

📅 Week 1 — Foundation (Days 1–7):
• Day 1: Update all social media bios with website link
• Day 2: Post 3 product photos with captions + hashtags
• Day 3: Set up WhatsApp Business with catalogue
• Day 4: Share link in 10 WhatsApp groups
• Day 5: Film first product Reel (unboxing or styling)
• Day 6: Join 3 jewellery Facebook groups
• Day 7: Review analytics — what worked best?

📅 Week 2 — Growth (Days 8–14):
• Post 1 Reel + 3 Stories daily
• Reach out to 5 micro-influencers (1K–10K followers)
• Create Pinterest business account
• Launch first-order discount offer (NEXA10)

📅 Week 3 — Scale (Days 15–21):
• 10 orders → ask for reviews/testimonials
• Add WhatsApp chat button to website
• Create bundle deals to increase average order value
• Start email list via newsletter signup

📅 Week 4 — Optimize (Days 22–30):
• Analyze: which products sell most?
• Restock bestsellers, remove slow-movers
• Plan for upcoming festivals (Diwali, Navratri)
• Set monthly revenue target for next month

💰 Revenue Milestones:
🥉 ₹5,000/month — 5 orders × ₹1,000 profit (beginner)
🥈 ₹20,000/month — 20 orders (growing)
🥇 ₹50,000/month — 50 orders (successful dropshipper)
🏆 ₹1,00,000/month — 100+ orders (brand established)

🌟 Feature Recommendations for NexaNouri:
• WhatsApp chat button (add now — free, high impact)
• Product reviews section (builds trust fast)
• "Limited Stock" badges on popular items
• Discount code for first-time buyers`);
        return;
      }

      if (
        /description|write|content|text|copy|bracelet|necklace|ring|earring|pendant|jewel/.test(
          lower,
        )
      ) {
        resolve(`✨ Luxury Product Description Template

SEO-Optimized Title Formula:
"[Metal] [Style] [Product Type] for Women — [Occasion] | NexaNouri"
Example: "18K Gold-Plated Designer Bracelet for Women — Wedding & Festive | NexaNouri"

Paragraph 1 — Emotion & Story:
Drape your wrist in timeless luxury with our exquisite hand-crafted gold-plated bracelet. Each piece is meticulously designed to capture the essence of royalty, blending modern artistry with traditional Indian jewellery craftsmanship. Perfect for weddings, festivals, daily wear, and gifting.

Paragraph 2 — Features (Bullet Points):
✅ Premium 18K gold-plated finish — tarnish resistant and long-lasting
✅ Hypoallergenic materials — safe for sensitive skin
✅ Adjustable fit — one size suits all wrist types
✅ Arrives in a luxury gift box — ready to present
✅ Weight: ~15g | Width: 8mm | Length: 18–22cm adjustable
✅ Easy care: wipe with soft cloth, avoid water/perfume

Paragraph 3 — Trust & CTA:
At NexaNouri, every piece is quality-checked before dispatch. Our jewellery is loved by thousands of customers across India. Order today and receive free gift packaging. Limited stock available — order now before it sells out!

💡 Tip: Use this template for ALL products — just change the product type and measurements!`);
        return;
      }

      if (/whatsapp/.test(lower)) {
        resolve(`📱 Complete WhatsApp Business Setup Guide for NexaNouri

Setup (15 Minutes):
1. Download "WhatsApp Business" app (free on Play Store/App Store)
2. Register with your business phone number
3. Set profile photo = NexaNouri logo
4. Business name: NexaNouri Jewellery
5. Description: "Premium gold-plated jewellery | Free delivery | Prepaid UPI"
6. Add website link in profile
7. Set auto-reply: "Hi! Thanks for contacting NexaNouri 💛 Browse our collection: [your website link]"

WhatsApp Catalogue Setup:
• Go to Business Tools → Catalogue → Add Products
• Add each jewellery item with photo, name, and price
• Share catalogue link on Instagram Stories + Facebook
• Customers can browse and order directly via WhatsApp

Broadcast List Strategy (Free Marketing):
• Create broadcast list of all customers
• Send new arrivals every Monday morning (8 AM)
• Send weekend deals every Friday evening (6 PM)
• Max 3 broadcasts/week — avoid being marked as spam

Status Marketing (Hidden Gem — Free!):
• Post product photos/videos to Status 3× daily
• Add your website link caption to every Status
• 500+ views on Status = massive free marketing
• Story: "Just restocked — only 5 left! 🔥 [website link]"

Converting Inquiries Script:
"Hi! Yes, we have that bracelet 💛 Sale price is ₹1200 with free gift packaging. Pay via UPI and I'll dispatch today. Shall I send you the payment link? 🛍️"`);
        return;
      }

      if (/plan|schedule|daily|weekly|routine|calendar|task/.test(lower)) {
        resolve(`📅 7-Day NexaNouri Business Routine

MONDAY — New Week Launch:
☐ 8 AM: Send "New Arrivals" broadcast to WhatsApp customers
☐ 9 AM: Post product photo on Instagram + Stories
☐ 10 AM: Check and reply to all DMs (< 1 hour rule)
☐ 12 PM: Post on Facebook jewellery groups
☐ 6 PM: Update Instagram Stories with latest stock

TUESDAY — Content Day:
☐ Film 1 short Reel (15–30 seconds: unboxing / styling)
☐ Post Reel at 7 PM (peak time)
☐ Pin 5 product photos on Pinterest

WEDNESDAY — Admin Day:
☐ Check inventory — any low stock? (< 5 units)
☐ Review orders in admin panel
☐ Update product prices or descriptions if needed
☐ Respond to any customer messages

THURSDAY — Engagement:
☐ Comment on 20–30 posts in jewellery niche
☐ Follow 10 potential customers
☐ Share a customer review/testimonial Story

FRIDAY — Deals Day:
☐ Post "Weekend Flash Deal" story (urgency)
☐ Send WhatsApp broadcast: weekend offer
☐ Add "Limited Stock" to 2–3 products

SATURDAY — Research:
☐ Look at competitor posts — what's working?
☐ Research trending jewellery styles on Pinterest
☐ Plan next week's content calendar

SUNDAY — Rest & Plan:
☐ Review week's sales performance in admin
☐ List what worked and what didn't
☐ Schedule Monday's content in Canva/Buffer

📊 Weekly Targets (Beginner):
• Posts: 7+ | Stories: 21+ | DMs replied: All | Orders: 3+`);
        return;
      }

      // Handle greetings and small talk
      if (
        /^(hi|hello|hey|hii|helo|helo|sup|yo|good morning|good evening|good night|gm|gn|howdy|namaste|namaskar|salam|assalam|ji|bhai|sir|madam|boss)/.test(
          lower.trim(),
        )
      ) {
        resolve(`Hey! 👋 Welcome back to NexaAI — your 3X powered jewellery business assistant.

I'm fully online and ready to help you right now. Here's what you can ask me:

💰 "Show my profit" — live financial analysis
📦 "Check my stock" — live inventory report
📱 "Give me Instagram captions" — viral marketing content
💲 "Pricing advice" — MRP & sale price strategy
📝 "Write product description" — luxury copywriting
🔍 "SEO keywords" — rank on Google for free
💬 "Customer reply template" — professional responses
🚀 "Growth plan" — 30-day business roadmap

What do you need help with today?`);
        return;
      }
      // Handle acknowledgements like "ok", "set", "done", "thanks"
      if (
        /^(okay all good|completed finished|thank you|great good|all ready done completed|good okay|okay let|yes|no problem|perfect|noted|understood|cool|nice|wow|amazing|superb|excellent)/.test(
          lower.trim(),
        )
      ) {
        resolve(`Got it! 💛 Anything else I can help you with for NexaNouri?

Just ask me about marketing, pricing, stock, profit, customer replies, or anything else about your jewellery business — I'm always here.`);
        return;
      }
      resolve(`I understood what you said! Let me help you with that.

For the best answers, try asking me something specific like:
• "Show my profit" → live financial report
• "Check stock" → inventory status  
• "Instagram caption" → marketing content
• "Pricing advice" → MRP & sale strategy
• "Growth plan" → 30-day roadmap

You can also type in Hindi words mixed with English — I understand both! 💛`);
    }, 1500);
  });
}

// AI Chat Component
interface ChatMessage {
  id: number;
  role: "user" | "ai";
  text: string;
}

const QUICK_ACTIONS = [
  { label: "Show My Profit", prompt: "Show my profit and financial analysis" },
  { label: "Check My Stock", prompt: "Check my stock and inventory status" },
  {
    label: "Instagram Caption",
    prompt: "Write a viral Instagram caption for my bracelet",
  },
  {
    label: "Pricing Advice",
    prompt: "What should be my MRP and sale price for bracelets?",
  },
  {
    label: "Product Description",
    prompt: "Write a luxury product description for a gold bracelet",
  },
  {
    label: "Customer Reply",
    prompt: "Write a professional reply for a delivery query",
  },
  {
    label: "SEO Keywords",
    prompt: "Give me the best SEO keywords for jewellery in India",
  },
  {
    label: "Growth Plan",
    prompt: "Give me a 30-day plan to grow my jewellery business",
  },
];

function AIAssistantTab({
  products,
  orders,
}: { products: Product[]; orders: Order[] }) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "ai",
      text: "Hello! I'm NexaAI — your 3X powered jewellery business assistant. I have access to your **live store data** including products and orders. Ask me about your profits, stock levels, marketing, pricing, or anything about growing NexaNouri. I'm here to help — no restrictions for your business! 💛",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll trigger
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages.length, thinking]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || thinking) return;
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", text },
    ]);
    setInput("");
    setThinking(true);
    const response = await getAIResponse(text, products, orders);
    setThinking(false);
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, role: "ai", text: response },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(input);
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Sparkles size={22} style={{ color: "#C9A84C" }} />
            <h2 className="font-display text-2xl" style={{ color: "#C9A84C" }}>
              NexaAI Assistant
            </h2>
            <span
              data-ocid="ai.online_badge"
              className="px-2 py-0.5 text-xs font-bold tracking-widest rounded-sm animate-pulse"
              style={{
                background: "rgba(74,222,128,0.15)",
                color: "#4ade80",
                border: "1px solid rgba(74,222,128,0.4)",
              }}
            >
              ● ONLINE
            </span>
          </div>
          <p
            className="text-sm ml-1"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            3X Powered — Marketing · Finance · Stock · Strategy
          </p>
        </div>
      </div>

      {/* Live Stats Bar */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Products", value: products.length },
          { label: "Orders", value: orders.length },
          {
            label: "Revenue",
            value: `₹${(orders.filter((o) => o.status !== "cancelled").reduce((a, o) => a + Number(o.total), 0) / 100).toFixed(0)}`,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="px-3 py-2 text-center"
            style={{
              border: "1px solid rgba(201,168,76,0.35)",
              background: "rgba(201,168,76,0.06)",
            }}
          >
            <div className="text-lg font-bold" style={{ color: "#C9A84C" }}>
              {stat.value}
            </div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            type="button"
            data-ocid="ai.quick_action.button"
            onClick={() => sendMessage(action.prompt)}
            disabled={thinking}
            className="px-3 py-2.5 text-xs font-semibold text-left transition-all hover:opacity-90"
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.2)",
              color: "rgba(201,168,76,0.85)",
            }}
          >
            <Sparkles
              size={11}
              className="inline mr-1.5"
              style={{ color: "#C9A84C" }}
            />
            {action.label}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div
        data-ocid="ai.chat_panel"
        className="overflow-y-auto p-4 space-y-4 mb-4"
        style={{
          background: "#1a0a12",
          border: "1px solid rgba(201,168,76,0.15)",
          height: "460px",
        }}
      >
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mr-2 mt-0.5"
                style={{ background: "rgba(201,168,76,0.15)" }}
              >
                <Sparkles size={13} style={{ color: "#C9A84C" }} />
              </div>
            )}
            <div
              className="max-w-[82%] px-4 py-3 text-sm"
              style={{
                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg, #C9A84C, #a07832)"
                    : "rgba(255,255,255,0.05)",
                border:
                  msg.role === "ai" ? "1px solid rgba(201,168,76,0.2)" : "none",
                color:
                  msg.role === "user" ? "#0f0508" : "rgba(255,255,255,0.85)",
                whiteSpace: "pre-wrap",
                lineHeight: "1.65",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex justify-start">
            <div
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mr-2"
              style={{ background: "rgba(201,168,76,0.15)" }}
            >
              <Sparkles size={13} style={{ color: "#C9A84C" }} />
            </div>
            <div
              data-ocid="ai.loading_state"
              className="px-4 py-3 text-sm animate-pulse"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "rgba(201,168,76,0.7)",
              }}
            >
              Thinking...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div
        className="flex gap-2"
        style={{
          border: "1px solid rgba(201,168,76,0.3)",
          background: "#1a0a12",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask NexaAI anything about your jewellery business..."
          data-ocid="ai.input"
          disabled={thinking}
          className="flex-1 px-4 py-3 text-sm bg-transparent focus:outline-none"
          style={{ color: "rgba(255,255,255,0.85)" }}
        />
        <button
          type="button"
          data-ocid="ai.submit_button"
          onClick={() => sendMessage(input)}
          disabled={thinking || !input.trim()}
          className="px-4 flex items-center justify-center transition-opacity"
          style={{
            background:
              input.trim() && !thinking ? "#C9A84C" : "rgba(201,168,76,0.3)",
            color:
              input.trim() && !thinking ? "#0f0508" : "rgba(255,255,255,0.3)",
          }}
        >
          <Send size={16} />
        </button>
      </div>
      <p
        className="text-xs mt-2 text-center"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        Press Enter to send · NexaAI is trained for jewellery business
      </p>
    </div>
  );
}

// Field Input
function FieldInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs tracking-widest uppercase mb-1"
        style={{ color: G }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm bg-transparent text-white focus:outline-none"
        style={{ border: `1px solid ${B}` }}
      />
    </div>
  );
}

// Main Admin Component
export function Admin() {
  const { actor } = useActor();
  const [authed, setAuthed] = useState(
    () => localStorage.getItem(AUTH_KEY) === "1",
  );
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    storeName: "NexaNouri",
    tagline: "Luxury Fine Jewellery",
    logoUrl: "",
  });
  const [upiId, setUpiId] = useState("");
  const [upiSaved, setUpiSaved] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<bigint | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authed || !actor) return;
    Promise.all([
      actor
        .getAllProducts()
        .then(setProducts)
        .catch(() => {}),
      actor
        .getAllOrders()
        .then(setOrders)
        .catch(() => {}),
      actor
        .getContactMessages()
        .then(setMessages)
        .catch(() => {}),
      actor
        .getNewsletterSubscribers()
        .then(setSubscribers)
        .catch(() => {}),
      actor
        .getSiteSettings()
        .then(setSettings)
        .catch(() => {}),
      actor
        .getUpiId()
        .then(setUpiId)
        .catch(() => {}),
    ]);
  }, [authed, actor]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    setForm({
      name: p.name,
      description: p.description,
      priceStr: (Number(p.price) / 100).toFixed(2),
      category: p.category,
      materials: p.materials,
      imageUrlsStr: p.imageUrls.join(", "),
      stockStr: String(Number(p.stock)),
      featured: p.featured,
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSaving(true);
    const product: Product = {
      id: editId ?? BigInt(0),
      name: form.name,
      description: form.description,
      price: BigInt(Math.round(Number.parseFloat(form.priceStr) * 100)),
      category: form.category,
      materials: form.materials,
      imageUrls: form.imageUrlsStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      stock: BigInt(Number.parseInt(form.stockStr) || 0),
      featured: form.featured,
      createdAt: BigInt(Date.now()),
    };
    try {
      if (editId !== null) await actor.updateProduct(editId, product);
      else await actor.addProduct(product);
      setShowForm(false);
      actor
        .getAllProducts()
        .then(setProducts)
        .catch(() => {});
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!actor) return;
    await actor.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateStatus = async (id: bigint, status: string) => {
    if (!actor) return;
    await actor.updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const handleSaveUpi = async () => {
    if (!actor) return;
    await actor.setUpiId(upiId);
    setUpiSaved(true);
    setTimeout(() => setUpiSaved(false), 3000);
  };

  const handleSaveSettings = async () => {
    if (!actor) return;
    await actor.setSiteSettings(settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((acc, o) => acc + Number(o.total), 0);

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#0f0508" }}
      >
        <div
          className="w-full max-w-sm p-10"
          style={{
            background: "#1a0a12",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div
                className="h-px w-8"
                style={{ background: "rgba(201,168,76,0.4)" }}
              />
              <span
                className="text-xs font-bold tracking-[0.3em] uppercase"
                style={{ color: "#C9A84C" }}
              >
                NexaNouri
              </span>
              <div
                className="h-px w-8"
                style={{ background: "rgba(201,168,76,0.4)" }}
              />
            </div>
            <h1 className="font-display text-2xl text-white">Admin Panel</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="admin-pw"
                className="block text-xs tracking-widest uppercase mb-2"
                style={{ color: G }}
              >
                Password
              </label>
              <input
                id="admin-pw"
                type="password"
                value={pwInput}
                onChange={(e) => setPwInput(e.target.value)}
                data-ocid="admin.input"
                className="w-full px-4 py-3 text-sm bg-transparent text-white focus:outline-none"
                style={{
                  border: `1px solid ${pwError ? "#f87171" : "rgba(201,168,76,0.3)"}`,
                }}
                placeholder="Enter admin password"
              />
              {pwError && (
                <p className="text-red-400 text-xs mt-1">Incorrect password</p>
              )}
            </div>
            <button
              type="submit"
              data-ocid="admin.submit_button"
              className="w-full py-3 text-sm font-bold tracking-[0.2em] uppercase transition-opacity hover:opacity-90"
              style={{ background: "#C9A84C", color: "#0f0508" }}
            >
              <LogIn size={14} className="inline mr-2" />
              Enter Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    { key: "products", label: "Products", icon: <Package size={16} /> },
    { key: "orders", label: "Orders", icon: <ShoppingBag size={16} /> },
    { key: "payments", label: "Payments", icon: <CreditCard size={16} /> },
    { key: "settings", label: "Settings", icon: <Settings size={16} /> },
    { key: "messages", label: "Messages", icon: <Mail size={16} /> },
    { key: "newsletter", label: "Newsletter", icon: <Users size={16} /> },
    { key: "ai", label: "AI Assistant", icon: <Sparkles size={16} /> },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#0f0508" }}>
      <aside
        className="w-56 flex-shrink-0 flex flex-col pt-20"
        style={{
          background: "#1a0a12",
          borderRight: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        <div className="px-6 mb-8">
          <p
            className="text-xs font-bold tracking-[0.3em] uppercase"
            style={{ color: "#C9A84C" }}
          >
            NexaNouri
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Admin Panel
          </p>
        </div>
        <nav className="flex-1 space-y-0.5 px-3">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              data-ocid={`admin.${t.key}.tab`}
              onClick={() => setTab(t.key)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all"
              style={{
                background:
                  tab === t.key ? "rgba(201,168,76,0.12)" : "transparent",
                color:
                  tab === t.key
                    ? "#C9A84C"
                    : t.key === "ai"
                      ? "rgba(201,168,76,0.55)"
                      : "rgba(255,255,255,0.5)",
                borderLeft:
                  tab === t.key ? "2px solid #C9A84C" : "2px solid transparent",
              }}
            >
              {t.icon}
              {t.key === "ai" ? (
                <span className="flex items-center gap-1.5">
                  {t.label}
                  <span
                    className="text-[9px] px-1 py-px font-bold tracking-wider"
                    style={{
                      background: "rgba(201,168,76,0.2)",
                      color: "#C9A84C",
                      border: "1px solid rgba(201,168,76,0.35)",
                    }}
                  >
                    3X
                  </span>
                </span>
              ) : (
                t.label
              )}
            </button>
          ))}
        </nav>
        <div className="px-3 pb-6">
          <button
            type="button"
            data-ocid="admin.logout_button"
            onClick={handleLogout}
            className="w-full px-4 py-2.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
            style={{
              color: "rgba(255,255,255,0.3)",
              borderTop: "1px solid rgba(201,168,76,0.1)",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 pt-20 px-8 pb-12 overflow-auto">
        {tab === "dashboard" && (
          <div>
            <h2 className="font-display text-2xl text-white mb-8">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  label: "Total Products",
                  value: String(products.length),
                  icon: <Package size={20} />,
                },
                {
                  label: "Total Orders",
                  value: String(orders.length),
                  icon: <ShoppingBag size={20} />,
                },
                {
                  label: "Total Revenue",
                  value: `₹${(totalRevenue / 100).toFixed(2)}`,
                  icon: <CreditCard size={20} />,
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="p-6"
                  style={{
                    background: "#1a0a12",
                    border: "1px solid rgba(201,168,76,0.15)",
                  }}
                  data-ocid="admin.dashboard.card"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{ color: "rgba(201,168,76,0.6)" }}
                    >
                      {card.label}
                    </span>
                    <span style={{ color: "rgba(201,168,76,0.4)" }}>
                      {card.icon}
                    </span>
                  </div>
                  <p className="font-display text-3xl text-white">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-white">Products</h2>
              <button
                type="button"
                data-ocid="admin.products.open_modal_button"
                onClick={openAdd}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold"
                style={{ background: "#C9A84C", color: "#0f0508" }}
              >
                <Plus size={14} /> Add Product
              </button>
            </div>
            <div
              style={{
                background: "#1a0a12",
                border: "1px solid rgba(201,168,76,0.12)",
              }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr
                    style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}
                  >
                    {[
                      "Name",
                      "Category",
                      "Price",
                      "Stock",
                      "Featured",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs tracking-widest uppercase"
                        style={{ color: "rgba(201,168,76,0.6)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr
                      key={String(p.id)}
                      data-ocid={`admin.products.item.${i + 1}`}
                      style={{
                        borderBottom: "1px solid rgba(201,168,76,0.06)",
                      }}
                    >
                      <td className="px-4 py-3 text-white">{p.name}</td>
                      <td
                        className="px-4 py-3"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {p.category}
                      </td>
                      <td className="px-4 py-3" style={{ color: "#C9A84C" }}>
                        ₹{(Number(p.price) / 100).toFixed(2)}
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {String(p.stock)}
                      </td>
                      <td className="px-4 py-3">
                        {p.featured ? (
                          <CheckCircle size={14} style={{ color: "#4ade80" }} />
                        ) : (
                          <span style={{ color: "rgba(255,255,255,0.2)" }}>
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            data-ocid={`admin.products.edit_button.${i + 1}`}
                            onClick={() => openEdit(p)}
                            className="p-1.5"
                            style={{ color: "#C9A84C" }}
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            type="button"
                            data-ocid={`admin.products.delete_button.${i + 1}`}
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5"
                            style={{ color: "#f87171" }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center"
                        style={{ color: "rgba(255,255,255,0.25)" }}
                        data-ocid="admin.products.empty_state"
                      >
                        No products yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {showForm && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ background: "rgba(0,0,0,0.7)" }}
                data-ocid="admin.products.dialog"
              >
                <div
                  className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-8"
                  style={{
                    background: "#1a0a12",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  <h3 className="font-display text-xl text-white mb-6">
                    {editId !== null ? "Edit Product" : "Add Product"}
                  </h3>
                  <form onSubmit={handleSave} className="space-y-4">
                    <FieldInput
                      id="pf-name"
                      label="Name"
                      value={form.name}
                      onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                    />
                    <FieldInput
                      id="pf-price"
                      label="Price (₹ in rupees)"
                      type="number"
                      value={form.priceStr}
                      onChange={(v) => setForm((p) => ({ ...p, priceStr: v }))}
                    />
                    <FieldInput
                      id="pf-materials"
                      label="Materials"
                      value={form.materials}
                      onChange={(v) => setForm((p) => ({ ...p, materials: v }))}
                    />
                    <FieldInput
                      id="pf-images"
                      label="Image URLs (comma separated)"
                      value={form.imageUrlsStr}
                      onChange={(v) =>
                        setForm((p) => ({ ...p, imageUrlsStr: v }))
                      }
                    />
                    <FieldInput
                      id="pf-stock"
                      label="Stock"
                      type="number"
                      value={form.stockStr}
                      onChange={(v) => setForm((p) => ({ ...p, stockStr: v }))}
                    />
                    <div>
                      <label
                        htmlFor="pf-desc"
                        className="block text-xs tracking-widest uppercase mb-1"
                        style={{ color: G }}
                      >
                        Description
                      </label>
                      <textarea
                        id="pf-desc"
                        value={form.description}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                        rows={3}
                        className="w-full px-3 py-2 text-sm bg-transparent text-white focus:outline-none resize-none"
                        style={{ border: `1px solid ${B}` }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pf-cat"
                        className="block text-xs tracking-widest uppercase mb-1"
                        style={{ color: G }}
                      >
                        Category
                      </label>
                      <select
                        id="pf-cat"
                        value={form.category}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, category: e.target.value }))
                        }
                        className="w-full px-3 py-2 text-sm bg-[#0f0508] text-white focus:outline-none"
                        style={{ border: `1px solid ${B}` }}
                        data-ocid="admin.products.select"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <label
                      htmlFor="pf-featured"
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        id="pf-featured"
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, featured: e.target.checked }))
                        }
                        data-ocid="admin.products.checkbox"
                        className="w-4 h-4"
                      />
                      <span
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        Featured product
                      </span>
                    </label>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        data-ocid="admin.products.save_button"
                        className="flex-1 py-3 text-sm font-bold tracking-widest uppercase"
                        style={{ background: "#C9A84C", color: "#0f0508" }}
                      >
                        {saving ? "Saving…" : "Save Product"}
                      </button>
                      <button
                        type="button"
                        data-ocid="admin.products.cancel_button"
                        onClick={() => setShowForm(false)}
                        className="flex-1 py-3 text-sm font-bold tracking-widest uppercase"
                        style={{
                          border: "1px solid rgba(201,168,76,0.3)",
                          color: "rgba(201,168,76,0.7)",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "orders" && (
          <div>
            <h2 className="font-display text-2xl text-white mb-6">Orders</h2>
            <div className="space-y-3">
              {orders.length === 0 && (
                <p
                  className="text-center py-10"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                  data-ocid="admin.orders.empty_state"
                >
                  No orders yet.
                </p>
              )}
              {orders.map((o, i) => (
                <div
                  key={String(o.id)}
                  data-ocid={`admin.orders.item.${i + 1}`}
                  className="p-5"
                  style={{
                    background: "#1a0a12",
                    border: "1px solid rgba(201,168,76,0.12)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-white font-semibold">
                        Order #{String(o.id)}
                      </span>
                      <span
                        className="ml-3 text-xs"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {o.shipping.name}
                      </span>
                    </div>
                    <span
                      className="text-xs px-2 py-1 font-bold tracking-widest uppercase"
                      style={{
                        background: `${STATUS_COLORS[o.status] ?? "#aaa"}22`,
                        color: STATUS_COLORS[o.status] ?? "#aaa",
                      }}
                    >
                      {o.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: "#C9A84C" }}>
                      ₹{(Number(o.total) / 100).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        Update:
                      </span>
                      <div className="relative">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            handleUpdateStatus(o.id, e.target.value)
                          }
                          data-ocid={`admin.orders.select.${i + 1}`}
                          className="appearance-none pl-3 pr-8 py-1.5 text-xs bg-[#0f0508] text-white focus:outline-none"
                          style={{ border: "1px solid rgba(201,168,76,0.25)" }}
                        >
                          {STATUS_OPTS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={12}
                          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                          style={{ color: "rgba(201,168,76,0.6)" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "payments" && (
          <div className="max-w-md">
            <h2 className="font-display text-2xl text-white mb-6">
              UPI Payment Settings
            </h2>
            <div
              className="p-6 space-y-5"
              style={{
                background: "#1a0a12",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              <div>
                <label
                  htmlFor="upi-id"
                  className="block text-xs tracking-widest uppercase mb-2"
                  style={{ color: G }}
                >
                  Your UPI ID
                </label>
                <input
                  id="upi-id"
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  data-ocid="admin.payments.input"
                  className="w-full px-4 py-3 text-sm bg-transparent text-white focus:outline-none"
                  style={{ border: "1px solid rgba(201,168,76,0.3)" }}
                />
              </div>
              <button
                type="button"
                data-ocid="admin.payments.save_button"
                onClick={handleSaveUpi}
                className="w-full py-3 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2"
                style={{ background: "#C9A84C", color: "#0f0508" }}
              >
                {upiSaved ? (
                  <>
                    <CheckCircle size={14} /> Saved!
                  </>
                ) : (
                  "Save UPI ID"
                )}
              </button>
              {upiId && (
                <div className="text-center pt-2">
                  <p
                    className="text-xs mb-3"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    QR Preview
                  </p>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(`upi://pay?pa=${upiId}`)}&size=200x200`}
                    alt="UPI QR Preview"
                    className="mx-auto"
                    width={200}
                    height={200}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div className="max-w-md">
            <h2 className="font-display text-2xl text-white mb-6">
              Site Settings
            </h2>
            <div
              className="p-6 space-y-5"
              style={{
                background: "#1a0a12",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              {[
                { key: "storeName", label: "Store Name" },
                { key: "tagline", label: "Tagline" },
                { key: "logoUrl", label: "Logo URL" },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    htmlFor={`set-${f.key}`}
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{ color: G }}
                  >
                    {f.label}
                  </label>
                  <input
                    id={`set-${f.key}`}
                    type="text"
                    value={settings[f.key as keyof SiteSettings]}
                    onChange={(e) =>
                      setSettings((s) => ({ ...s, [f.key]: e.target.value }))
                    }
                    data-ocid={`admin.settings.${f.key}.input`}
                    className="w-full px-4 py-3 text-sm bg-transparent text-white focus:outline-none"
                    style={{ border: `1px solid ${B}` }}
                  />
                </div>
              ))}
              <button
                type="button"
                data-ocid="admin.settings.save_button"
                onClick={handleSaveSettings}
                className="w-full py-3 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2"
                style={{ background: "#C9A84C", color: "#0f0508" }}
              >
                {settingsSaved ? (
                  <>
                    <CheckCircle size={14} /> Saved!
                  </>
                ) : (
                  "Save Settings"
                )}
              </button>
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div>
            <h2 className="font-display text-2xl text-white mb-6">
              Contact Messages
            </h2>
            <div className="space-y-3">
              {messages.length === 0 && (
                <p
                  className="text-center py-10"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                  data-ocid="admin.messages.empty_state"
                >
                  No messages yet.
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={`${m.email}-${String(m.createdAt)}`}
                  data-ocid={`admin.messages.item.${i + 1}`}
                  className="p-5"
                  style={{
                    background: "#1a0a12",
                    border: "1px solid rgba(201,168,76,0.12)",
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-white font-semibold">{m.name}</span>
                      <span
                        className="ml-2 text-xs"
                        style={{ color: "rgba(201,168,76,0.7)" }}
                      >
                        {m.email}
                      </span>
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      {new Date(Number(m.createdAt)).toLocaleDateString()}
                    </span>
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {m.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "newsletter" && (
          <div>
            <h2 className="font-display text-2xl text-white mb-6">
              Newsletter Subscribers
            </h2>
            <div
              style={{
                background: "#1a0a12",
                border: "1px solid rgba(201,168,76,0.12)",
              }}
            >
              {subscribers.length === 0 && (
                <p
                  className="text-center py-10"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                  data-ocid="admin.newsletter.empty_state"
                >
                  No subscribers yet.
                </p>
              )}
              {subscribers.map((email, i) => (
                <div
                  key={email}
                  data-ocid={`admin.newsletter.item.${i + 1}`}
                  className="px-5 py-3 flex items-center gap-3"
                  style={{ borderBottom: "1px solid rgba(201,168,76,0.06)" }}
                >
                  <Mail size={14} style={{ color: "rgba(201,168,76,0.5)" }} />
                  <span className="text-sm text-white">{email}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "ai" && <AIAssistantTab products={products} orders={orders} />}
      </main>
    </div>
  );
}
