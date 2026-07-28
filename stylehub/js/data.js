/* ============================================================
   STYLEHUB — DATA LAYER
   All product, review and store data lives here as plain JS.
   No backend / database — this simulates one, per project spec.
   ============================================================ */

const PRODUCTS = [
  // ---------------- MEN ----------------
  { id: "m001", name: "Oxford Slim Fit Shirt", category: "men", sub: "Shirts & T-Shirts", price: 1899, mrp: 2499, brand: "Vantage", colors: ["White","Sky Blue","Charcoal"], sizes: ["S","M","L","XL","XXL"], rating: 4.4, reviews: 128, img: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600", gallery: ["https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800","https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"], desc: "A tailored Oxford shirt cut from breathable cotton twill. Sharp collar, mother-of-pearl buttons, made for boardrooms and beyond.", tag: "Bestseller" },
  { id: "m002", name: "Heritage Denim Jeans", category: "men", sub: "Jeans & Trousers", price: 2799, mrp: 3499, brand: "Northline", colors: ["Indigo","Black","Stone Wash"], sizes: ["30","32","34","36","38"], rating: 4.6, reviews: 214, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600", gallery: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=800","https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800"], desc: "Straight-leg denim woven from heavyweight selvedge cotton with just enough stretch to move with you all day.", tag: "New" },
  { id: "m003", name: "Two-Button Wool Blazer", category: "men", sub: "Suits & Blazers", price: 6499, mrp: 8999, brand: "Sartoria", colors: ["Navy","Charcoal","Black"], sizes: ["38","40","42","44"], rating: 4.7, reviews: 76, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600", gallery: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800","https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800"], desc: "A half-canvassed wool blazer with a soft shoulder and nipped waist — the one blazer that earns its keep in every wardrobe.", tag: "Premium" },
  { id: "m004", name: "Leather Chelsea Boots", category: "men", sub: "Footwear", price: 4299, mrp: 5299, brand: "Northline", colors: ["Tan","Black"], sizes: ["7","8","9","10","11"], rating: 4.5, reviews: 91, img: "https://images.unsplash.com/photo-1638247025967-b4e6b52490fd?w=600", gallery: ["https://images.unsplash.com/photo-1638247025967-b4e6b52490fd?w=800","https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800"], desc: "Full-grain leather Chelsea boots with an elastic gusset and a stacked leather heel — built to be resoled, not replaced.", tag: "" },
  { id: "m005", name: "Classic Leather Belt", category: "men", sub: "Accessories", price: 999, mrp: 1299, brand: "Vantage", colors: ["Brown","Black"], sizes: ["32","34","36","38"], rating: 4.3, reviews: 58, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", gallery: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"], desc: "Full-grain leather belt with a brushed gold buckle. Ages beautifully with wear.", tag: "" },
  { id: "m006", name: "Crewneck Cotton Tee", category: "men", sub: "Shirts & T-Shirts", price: 799, mrp: 999, brand: "Northline", colors: ["Black","White","Olive"], sizes: ["S","M","L","XL"], rating: 4.2, reviews: 302, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600", gallery: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"], desc: "Heavyweight 220gsm combed cotton tee with a boxy, modern fit.", tag: "Bestseller" },

  // ---------------- WOMEN ----------------
  { id: "w001", name: "Satin Slip Gown", category: "women", sub: "Dresses & Gowns", price: 3899, mrp: 4999, brand: "Marielle", colors: ["Champagne","Emerald","Black"], sizes: ["XS","S","M","L"], rating: 4.8, reviews: 164, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600", gallery: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800","https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"], desc: "Bias-cut satin gown that skims the body in liquid, light-catching folds. Adjustable straps, cowl back.", tag: "Editor's Pick" },
  { id: "w002", name: "Silk Wrap Blouse", category: "women", sub: "Tops & Blouses", price: 2199, mrp: 2799, brand: "Marielle", colors: ["Ivory","Blush","Black"], sizes: ["XS","S","M","L","XL"], rating: 4.5, reviews: 133, img: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=600", gallery: ["https://images.unsplash.com/photo-1551803091-e20673f15770?w=800"], desc: "Featherweight mulberry silk with a soft wrap front that ties at the waist.", tag: "New" },
  { id: "w003", name: "High-Rise Wide Leg Jeans", category: "women", sub: "Jeans & Skirts", price: 2599, mrp: 3299, brand: "Northline", colors: ["Light Wash","Black","Indigo"], sizes: ["24","26","28","30","32"], rating: 4.6, reviews: 210, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600", gallery: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"], desc: "A flattering high-rise cut with a fluid wide leg. Rigid enough to hold shape, soft enough to live in.", tag: "Bestseller" },
  { id: "w004", name: "Pointed Toe Heels", category: "women", sub: "Footwear", price: 3299, mrp: 3999, brand: "Marielle", colors: ["Nude","Black","Red"], sizes: ["5","6","7","8","9"], rating: 4.4, reviews: 88, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600", gallery: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800"], desc: "A 70mm stiletto heel in soft nappa leather — sharp enough for the office, easy enough for dinner after.", tag: "" },
  { id: "w005", name: "Gold Layered Necklace", category: "women", sub: "Accessories", price: 1499, mrp: 1899, brand: "Aurel", colors: ["Gold"], sizes: ["One Size"], rating: 4.7, reviews: 145, img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600", gallery: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800"], desc: "18k gold-plated layered chains with a coin pendant. Tarnish-resistant, everyday-proof.", tag: "New" },
  { id: "w006", name: "Pleated Midi Skirt", category: "women", sub: "Jeans & Skirts", price: 1999, mrp: 2599, brand: "Marielle", colors: ["Black","Terracotta","Ivory"], sizes: ["XS","S","M","L"], rating: 4.3, reviews: 97, img: "https://images.unsplash.com/photo-1583496661160-fb5886a13d24?w=600", gallery: ["https://images.unsplash.com/photo-1583496661160-fb5886a13d24?w=800"], desc: "Sun-ray pleats in a fluid crepe that moves with every step. Elasticated waistband for all-day comfort.", tag: "" },

  // ---------------- KIDS ----------------
  { id: "k001", name: "Dino Print Tee & Shorts Set", category: "kids", sub: "Boys Clothing", price: 899, mrp: 1199, brand: "Little Northline", colors: ["Blue","Green"], sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], rating: 4.6, reviews: 71, img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600", gallery: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800"], desc: "Soft cotton tee-and-shorts set with an all-over dino print. Machine washable, built for playground days.", tag: "Bestseller" },
  { id: "k002", name: "Tulle Party Dress", category: "kids", sub: "Girls Clothing", price: 1499, mrp: 1999, brand: "Little Marielle", colors: ["Pink","Lavender"], sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], rating: 4.8, reviews: 112, img: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=600", gallery: ["https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=800"], desc: "A twirl-ready tulle skirt with a soft cotton-lined bodice and a satin sash.", tag: "New" },
  { id: "k003", name: "Organic Cotton Onesie Set", category: "kids", sub: "Infant Wear", price: 799, mrp: 999, brand: "Little Northline", colors: ["Cream","Sage"], sizes: ["0-3M","3-6M","6-12M"], rating: 4.9, reviews: 203, img: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600", gallery: ["https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800"], desc: "GOTS-certified organic cotton, snap closures, and flat-lock seams that are gentle on newborn skin.", tag: "Bestseller" },
  { id: "k004", name: "Light-Up Sneakers", category: "kids", sub: "Kids Footwear", price: 1299, mrp: 1699, brand: "Little Northline", colors: ["Blue","Pink","Black"], sizes: ["9C","10C","11C","12C","1Y"], rating: 4.5, reviews: 64, img: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600", gallery: ["https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800"], desc: "Cushioned sneakers with LED soles that light up with every step. Velcro strap for easy on-off.", tag: "" },
  { id: "k005", name: "Rainbow Hair Clip Set", category: "kids", sub: "Kids Accessories", price: 399, mrp: 599, brand: "Aurel Kids", colors: ["Multicolor"], sizes: ["One Size"], rating: 4.6, reviews: 84, img: "https://images.unsplash.com/photo-1584285405429-136bf988c1c1?w=600", gallery: ["https://images.unsplash.com/photo-1584285405429-136bf988c1c1?w=800"], desc: "A set of 6 gentle-grip hair clips in rainbow shades. No-slip, no-snag.", tag: "New" },
];

const REVIEWS = {
  m001: [
    { name: "Arjun K.", rating: 5, text: "Fits true to size and the fabric feels premium. Wore it to work all week." },
    { name: "Devesh R.", rating: 4, text: "Great shirt, slightly long in the sleeve for me but easy fix at a tailor." },
  ],
  w001: [
    { name: "Meera S.", rating: 5, text: "The drape is stunning — photographs beautifully and feels even better on." },
    { name: "Ananya T.", rating: 5, text: "Ordered for a wedding, got so many compliments. True to size." },
  ],
};

const STORE_LOCATIONS = [
  { city: "Mumbai", area: "Bandra Linking Road", hours: "10:00 AM – 9:00 PM", phone: "+91 22 4000 1122" },
  { city: "Bengaluru", area: "Indiranagar 100ft Road", hours: "10:00 AM – 9:00 PM", phone: "+91 80 4000 3344" },
  { city: "Delhi", area: "Select Citywalk, Saket", hours: "11:00 AM – 9:30 PM", phone: "+91 11 4000 5566" },
  { city: "Belagavi", area: "College Road", hours: "10:30 AM – 8:30 PM", phone: "+91 831 400 7788" },
];

const COUPONS = {
  "STYLE10":  { type: "percent", value: 10, desc: "10% off your order" },
  "WELCOME200": { type: "flat", value: 200, desc: "₹200 off orders above ₹1999" },
  "FREESHIP": { type: "shipping", value: 0, desc: "Free shipping on this order" },
};

function formatINR(n){
  return "₹" + Number(n).toLocaleString("en-IN");
}
