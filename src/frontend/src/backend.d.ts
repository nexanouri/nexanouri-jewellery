import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderItem {
    productId: bigint;
    quantity: bigint;
}
export interface SiteSettings {
    tagline: string;
    logoUrl: string;
    storeName: string;
}
export interface ContactMessage {
    name: string;
    createdAt: bigint;
    email: string;
    message: string;
}
export interface Order {
    id: bigint;
    status: string;
    total: bigint;
    paymentMethod: string;
    createdAt: bigint;
    shipping: ShippingDetails;
    items: Array<OrderItem>;
}
export interface Product {
    id: bigint;
    featured: boolean;
    imageUrls: Array<string>;
    name: string;
    createdAt: bigint;
    description: string;
    stock: bigint;
    materials: string;
    category: string;
    price: bigint;
}
export interface ShippingDetails {
    contact: string;
    country: string;
    city: string;
    postalCode: string;
    name: string;
    state: string;
    address: string;
}
export interface backendInterface {
    addProduct(product: Product): Promise<bigint>;
    deleteProduct(id: bigint): Promise<boolean>;
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getContactMessages(): Promise<Array<ContactMessage>>;
    getNewsletterSubscribers(): Promise<Array<string>>;
    getOrder(id: bigint): Promise<Order | null>;
    getProduct(id: bigint): Promise<Product | null>;
    getSiteSettings(): Promise<SiteSettings>;
    getUpiId(): Promise<string>;
    isAdmin(user: Principal): Promise<boolean>;
    placeOrder(order: Order): Promise<bigint>;
    setAdmin(adminId: Principal): Promise<void>;
    setSiteSettings(newSettings: SiteSettings): Promise<void>;
    setUpiId(newUpiId: string): Promise<void>;
    submitContactMessage(name: string, email: string, message: string): Promise<void>;
    subscribeNewsletter(email: string): Promise<void>;
    updateOrderStatus(id: bigint, status: string): Promise<boolean>;
    updateProduct(id: bigint, product: Product): Promise<boolean>;
    whoami(): Promise<Principal>;
}
