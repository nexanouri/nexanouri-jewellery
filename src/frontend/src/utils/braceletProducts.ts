import type { Product } from "../backend.d";

// MRP values per product ID (in paise)
export const BRACELET_MRP: Record<number, number> = {
  100: 249900, // Classic No.36.2 — MRP ₹2,499
  101: 199900, // Classic No.24.7 — MRP ₹1,999
  102: 249900, // Classic No.46.7 — MRP ₹2,499
  103: 399900, // Heart Pendant — premium romantic design — MRP ₹3,999
  104: 449900, // Star Pendant — celestial premium — MRP ₹4,499
  105: 249900, // Flower motif — delicate design — MRP ₹2,499
  106: 199900, // Classic No.19.2 — MRP ₹1,999
  107: 499900, // Tennis bracelet — continuous diamond row, top quality — MRP ₹4,999
  108: 249900, // Hearts Links — MRP ₹2,499
  109: 249900, // Heart Chain — MRP ₹2,499
  110: 449900, // Butterfly — intricate motif, premium — MRP ₹4,499
  111: 299900, // Circle Hearts — MRP ₹2,999
  112: 449900, // Colorful Multi-stone — vibrant, unique — MRP ₹4,499
  113: 399900, // Purple Stone — elegant colored stones — MRP ₹3,999
  114: 299900, // Leaf design — nature-inspired intricate — MRP ₹2,999
  115: 399900, // Diamond Square geometric — modern premium — MRP ₹3,999
};

export const BRACELET_PRODUCTS: Product[] = [
  {
    id: 100n,
    name: "A.D.Diamond Rose Gold Bracelet No.36.2",
    description:
      "Elegant rose gold bracelet with premium AD diamond accents. D.No.000137",
    price: 120000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0258-019d2c8c-7702-7395-a0af-e174a12220d9-1.jpg",
    ],
    stock: 10n,
    featured: true,
    createdAt: 0n,
  },
  {
    id: 101n,
    name: "A.D.Diamond Rose Gold Bracelet No.24.7",
    description:
      "Stunning rose gold bracelet with sparkling AD diamond stones. D.No.000124",
    price: 120000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0263-019d2c8c-7960-71f1-a9b9-ebfe8f588de4-2.jpg",
    ],
    stock: 10n,
    featured: true,
    createdAt: 0n,
  },
  {
    id: 102n,
    name: "A.D.Diamond Rose Gold Bracelet No.46.7",
    description:
      "Luxurious rose gold bracelet with intricate AD diamond detailing. D.No.000106",
    price: 120000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0255-019d2c8c-7cc5-704f-9796-b79bb8ce4686-3.jpg",
    ],
    stock: 10n,
    featured: true,
    createdAt: 0n,
  },
  {
    id: 103n,
    name: "A.D.Diamond Rose Gold Bracelet No.34.2 Heart Pendant",
    description:
      "Romantic rose gold bracelet with heart pendant and AD diamond accents. D.No.000139",
    price: 130000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0260-019d2c8c-7d9d-713b-abbd-217a1c3903f0-4.jpg",
    ],
    stock: 10n,
    featured: true,
    createdAt: 0n,
  },
  {
    id: 104n,
    name: "A.D.Diamond Rose Gold Bracelet No.34.2 Star Pendant",
    description:
      "Celestial-inspired rose gold bracelet with star pendant and AD diamonds. D.No.000138",
    price: 130000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0261-019d2c8c-8236-776d-ad9e-0ecfdc167b61-5.jpg",
    ],
    stock: 10n,
    featured: false,
    createdAt: 0n,
  },
  {
    id: 105n,
    name: "A.D.Diamond Rose Gold Bracelet No.24.7 Flower",
    description:
      "Delicate rose gold bracelet with flower motif and shimmering AD diamonds",
    price: 120000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0275-019d2c8c-84b1-764e-a077-d86270140a02-6.jpg",
    ],
    stock: 10n,
    featured: false,
    createdAt: 0n,
  },
  {
    id: 106n,
    name: "A.D.Diamond Rose Gold Bracelet No.19.2",
    description:
      "Classic rose gold bracelet with elegant AD diamond setting. D.No.000133",
    price: 120000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0256-019d2c8c-859a-7208-a677-cdc4c3090514-7.jpg",
    ],
    stock: 10n,
    featured: false,
    createdAt: 0n,
  },
  {
    id: 107n,
    name: "A.D.Diamond Rose Gold Bracelet No.18 Tennis",
    description:
      "Dazzling tennis-style rose gold bracelet with continuous AD diamond row",
    price: 130000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0277-019d2c8c-85c5-77bb-bc37-6675df7482d1-8.jpg",
    ],
    stock: 10n,
    featured: false,
    createdAt: 0n,
  },
  {
    id: 108n,
    name: "A.D.Diamond Rose Gold Bracelet No.21.5 Hearts",
    description:
      "Charming rose gold bracelet with heart-shaped AD diamond links",
    price: 120000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0269-019d2c8c-8660-753e-aa71-b0e686ad4ede-9.jpg",
    ],
    stock: 10n,
    featured: false,
    createdAt: 0n,
  },
  {
    id: 109n,
    name: "A.D.Diamond Rose Gold Bracelet No.19 Heart Chain",
    description:
      "Graceful rose gold chain bracelet with heart charms and AD diamonds",
    price: 120000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/uploads/img-20260326-wa0280-019d2c8c-89e3-71f9-92bf-c44d43f7185e-10.jpg",
    ],
    stock: 10n,
    featured: false,
    createdAt: 0n,
  },
  {
    id: 110n,
    name: "A.D.Diamond Rose Gold Bracelet No.26.5 Butterfly",
    description:
      "Whimsical rose gold bracelet featuring butterfly motif with AD diamond wings",
    price: 130000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0266-019d2c8c-8f7e-73fe-8caf-cb4799d83ba0-11.jpg",
    ],
    stock: 10n,
    featured: false,
    createdAt: 0n,
  },
  {
    id: 111n,
    name: "A.D.Diamond Rose Gold Bracelet No.28 Circle Hearts",
    description:
      "Sophisticated rose gold bracelet with circle and heart links adorned in AD diamonds",
    price: 120000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0267-019d2c8c-905e-71d2-b754-48ba9fe57232-12.jpg",
    ],
    stock: 10n,
    featured: false,
    createdAt: 0n,
  },
  {
    id: 112n,
    name: "A.D.Diamond Rose Gold Bracelet No.35.5 Colorful",
    description:
      "Vibrant rose gold bracelet with colorful AD diamond stones in multiple hues",
    price: 130000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond, Multi-Color Stones",
    imageUrls: [
      "/assets/generated/img-20260326-wa0282-019d2c8c-92e9-762a-bb93-08d2e67a5b7b-13.jpg",
    ],
    stock: 10n,
    featured: false,
    createdAt: 0n,
  },
  {
    id: 113n,
    name: "A.D.Diamond Rose Gold Bracelet No.30.5 Purple",
    description: "Regal rose gold bracelet with deep purple AD diamond stones",
    price: 130000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond, Purple Stones",
    imageUrls: [
      "/assets/generated/img-20260326-wa0278-019d2c8c-9531-7768-b527-bf74831d1768-14.jpg",
    ],
    stock: 10n,
    featured: false,
    createdAt: 0n,
  },
  {
    id: 114n,
    name: "A.D.Diamond Rose Gold Bracelet No.47.7 Leaf",
    description:
      "Nature-inspired rose gold bracelet with leaf design and AD diamond detailing",
    price: 120000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0283-019d2c8c-94ee-7165-833d-07e603d01022-15.jpg",
    ],
    stock: 10n,
    featured: false,
    createdAt: 0n,
  },
  {
    id: 115n,
    name: "A.D.Diamond Rose Gold Bracelet No.26.5 Diamond Square",
    description:
      "Geometric rose gold bracelet with square AD diamond links in a modern design",
    price: 130000n,
    category: "bracelets",
    materials: "Rose Gold, AD Diamond",
    imageUrls: [
      "/assets/generated/img-20260326-wa0284-019d2c8c-9595-76fb-bee0-f00d386ee711-16.jpg",
    ],
    stock: 10n,
    featured: false,
    createdAt: 0n,
  },
];
