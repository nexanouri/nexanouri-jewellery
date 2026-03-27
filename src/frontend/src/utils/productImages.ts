export const PRODUCT_IMAGE_MAP: Record<number, string> = {
  100: "/assets/uploads/img-20260326-wa0258-019d2c8c-7702-7395-a0af-e174a12220d9-1.jpg",
  101: "/assets/uploads/img-20260326-wa0263-019d2c8c-7960-71f1-a9b9-ebfe8f588de4-2.jpg",
  102: "/assets/uploads/img-20260326-wa0255-019d2c8c-7cc5-704f-9796-b79bb8ce4686-3.jpg",
  103: "/assets/uploads/img-20260326-wa0260-019d2c8c-7d9d-713b-abbd-217a1c3903f0-4.jpg",
  104: "/assets/uploads/img-20260326-wa0261-019d2c8c-8236-776d-ad9e-0ecfdc167b61-5.jpg",
  105: "/assets/uploads/img-20260326-wa0275-019d2c8c-84b1-764e-a077-d86270140a02-6.jpg",
  106: "/assets/uploads/img-20260326-wa0256-019d2c8c-859a-7208-a677-cdc4c3090514-7.jpg",
  107: "/assets/uploads/img-20260326-wa0277-019d2c8c-85c5-77bb-bc37-6675df7482d1-8.jpg",
  108: "/assets/uploads/img-20260326-wa0269-019d2c8c-8660-753e-aa71-b0e686ad4ede-9.jpg",
  109: "/assets/uploads/img-20260326-wa0280-019d2c8c-89e3-71f9-92bf-c44d43f7185e-10.jpg",
  110: "/assets/uploads/img-20260326-wa0266-019d2c8c-8f7e-73fe-8caf-cb4799d83ba0-11.jpg",
  111: "/assets/uploads/img-20260326-wa0267-019d2c8c-905e-71d2-b754-48ba9fe57232-12.jpg",
  112: "/assets/uploads/img-20260326-wa0282-019d2c8c-92e9-762a-bb93-08d2e67a5b7b-13.jpg",
  113: "/assets/uploads/img-20260326-wa0278-019d2c8c-9531-7768-b527-bf74831d1768-14.jpg",
  114: "/assets/uploads/img-20260326-wa0283-019d2c8c-94ee-7165-833d-07e603d01022-15.jpg",
  115: "/assets/uploads/img-20260326-wa0284-019d2c8c-9595-76fb-bee0-f00d386ee711-16.jpg",
  1: "/assets/generated/necklace-celestial.dim_800x800.jpg",
  2: "/assets/generated/ring-rose-ruby.dim_800x800.jpg",
  3: "/assets/generated/earrings-pearl.dim_800x800.jpg",
  4: "/assets/generated/bracelet-diamond-tennis.dim_800x800.jpg",
  5: "/assets/generated/necklace-sapphire-stars.dim_800x800.jpg",
  6: "/assets/generated/ring-filigree-emerald.dim_800x800.jpg",
  7: "/assets/generated/earrings-gold-hoop.dim_800x800.jpg",
  8: "/assets/generated/bracelet-amethyst-charm.dim_800x800.jpg",
  9: "/assets/generated/set-bridal-diamond.dim_800x800.jpg",
  10: "/assets/generated/necklace-layered-gold.dim_800x800.jpg",
};

const CATEGORY_FALLBACKS: Record<string, string> = {
  necklaces: "/assets/generated/necklace-celestial.dim_800x800.jpg",
  rings: "/assets/generated/ring-rose-ruby.dim_800x800.jpg",
  earrings: "/assets/generated/earrings-pearl.dim_800x800.jpg",
  bracelets: "/assets/generated/bracelet-diamond-tennis.dim_800x800.jpg",
  sets: "/assets/generated/set-bridal-diamond.dim_800x800.jpg",
};

export function getProductImage(product: {
  id: bigint;
  imageUrls: string[];
  category: string;
}): string {
  if (product.imageUrls.length > 0) return product.imageUrls[0];
  return (
    PRODUCT_IMAGE_MAP[Number(product.id)] ||
    CATEGORY_FALLBACKS[product.category] ||
    "/assets/generated/necklace-celestial.dim_800x800.jpg"
  );
}

export function formatPrice(cents: bigint): string {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}
