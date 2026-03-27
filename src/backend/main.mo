import Time "mo:core/Time";
import List "mo:core/List";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";

import Principal "mo:core/Principal";


actor {
  // Data types
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    materials : Text;
    imageUrls : [Text];
    stock : Nat;
    featured : Bool;
    createdAt : Int;
  };

  type OrderItem = {
    productId : Nat;
    quantity : Nat;
  };

  type ShippingDetails = {
    name : Text;
    address : Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
    contact : Text;
  };

  type Order = {
    id : Nat;
    items : [OrderItem];
    shipping : ShippingDetails;
    total : Nat;
    paymentMethod : Text;
    status : Text;
    createdAt : Int;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
    createdAt : Int;
  };

  type SiteSettings = {
    storeName : Text;
    tagline : Text;
    logoUrl : Text;
  };

  var nextProductId = 1;
  var nextOrderId = 1;

  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  let contactMessages = List.empty<ContactMessage>();
  let newsletterSubs = List.empty<Text>();
  let admins = List.fromArray([] : [Principal]);
  var upiId = "";
  var siteSettings : SiteSettings = {
    storeName = "NexaNouri";
    tagline = "Luxury Redefined";
    logoUrl = "";
  };

  // Product management
  public shared ({ caller }) func addProduct(product : Product) : async Nat {
    let newProduct = {
      product with
      id = nextProductId;
      createdAt = Time.now();
    };
    products.add(nextProductId, newProduct);
    nextProductId += 1;
    newProduct.id;
  };

  public query ({ caller }) func getProduct(id : Nat) : async ?Product {
    products.get(id);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public shared ({ caller }) func updateProduct(id : Nat, product : Product) : async Bool {
    if (products.containsKey(id)) {
      let updatedProduct = {
        product with
        id;
      };
      products.add(id, updatedProduct);
      true;
    } else {
      false;
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async Bool {
    if (products.containsKey(id)) {
      products.remove(id);
      true;
    } else {
      false;
    };
  };

  // Order management
  public shared ({ caller }) func placeOrder(order : Order) : async Nat {
    let newOrder = {
      order with
      id = nextOrderId;
      createdAt = Time.now();
    };
    orders.add(nextOrderId, newOrder);
    nextOrderId += 1;
    newOrder.id;
  };

  public query ({ caller }) func getOrder(id : Nat) : async ?Order {
    orders.get(id);
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    orders.values().toArray();
  };

  public shared ({ caller }) func updateOrderStatus(id : Nat, status : Text) : async Bool {
    switch (orders.get(id)) {
      case (null) { false };
      case (?order) {
        let updatedOrder = { order with status };
        orders.add(id, updatedOrder);
        true;
      };
    };
  };

  // Contact messages
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    let newMessage : ContactMessage = {
      name;
      email;
      message;
      createdAt = Time.now();
    };
    contactMessages.add(newMessage);
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    contactMessages.toArray();
  };

  // Newsletter subscriptions
  public shared ({ caller }) func subscribeNewsletter(email : Text) : async () {
    if (newsletterSubs.any(func(e) { e == email })) {
      return;
    };
    newsletterSubs.add(email);
  };

  public query ({ caller }) func getNewsletterSubscribers() : async [Text] {
    newsletterSubs.toArray();
  };

  // UPI payment integration
  public shared ({ caller }) func setUpiId(newUpiId : Text) : async () {
    upiId := newUpiId;
  };

  public query ({ caller }) func getUpiId() : async Text {
    upiId;
  };

  // Site settings
  public shared ({ caller }) func setSiteSettings(newSettings : SiteSettings) : async () {
    siteSettings := newSettings;
  };

  public query ({ caller }) func getSiteSettings() : async SiteSettings {
    siteSettings;
  };

  // Admin management
  public shared ({ caller }) func setAdmin(adminId : Principal) : async () {
    admins.add(adminId);
  };

  public query ({ caller }) func isAdmin(user : Principal) : async Bool {
    admins.any(func(a) { a == user });
  };

  // Whoami
  public query ({ caller }) func whoami() : async Principal {
    caller;
  };
};
