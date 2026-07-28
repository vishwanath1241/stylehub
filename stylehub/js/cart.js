/* ============================================================
   STYLEHUB — CART / WISHLIST / AUTH (client-side "state layer")
   Persisted with localStorage so it survives page navigation.
   ============================================================ */

const Store = {
  KEYS: { cart: "stylehub_cart", wishlist: "stylehub_wishlist", user: "stylehub_user", orders: "stylehub_orders" },

  _read(key, fallback){
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch(e){ return fallback; }
  },
  _write(key, val){ localStorage.setItem(key, JSON.stringify(val)); },

  getCart(){ return this._read(this.KEYS.cart, []); },
  setCart(cart){ this._write(this.KEYS.cart, cart); updateCartBadge(); },

  addToCart(productId, size, color, qty){
    const cart = this.getCart();
    const existing = cart.find(i => i.id === productId && i.size === size && i.color === color);
    if (existing) existing.qty += qty;
    else cart.push({ id: productId, size, color, qty });
    this.setCart(cart);
  },
  updateQty(index, qty){
    const cart = this.getCart();
    if (!cart[index]) return;
    cart[index].qty = Math.max(1, qty);
    this.setCart(cart);
  },
  removeFromCart(index){
    const cart = this.getCart();
    cart.splice(index, 1);
    this.setCart(cart);
  },
  clearCart(){ this.setCart([]); },

  getWishlist(){ return this._read(this.KEYS.wishlist, []); },
  toggleWishlist(productId){
    let wl = this.getWishlist();
    if (wl.includes(productId)) wl = wl.filter(id => id !== productId);
    else wl.push(productId);
    this._write(this.KEYS.wishlist, wl);
    updateWishlistBadge();
    return wl.includes(productId);
  },
  isWishlisted(productId){ return this.getWishlist().includes(productId); },

  getUser(){ return this._read(this.KEYS.user, null); },
  login(email, name){
    this._write(this.KEYS.user, { email, name: name || email.split("@")[0], joined: new Date().toISOString() });
  },
  logout(){ localStorage.removeItem(this.KEYS.user); },

  getOrders(){ return this._read(this.KEYS.orders, []); },
  placeOrder(order){
    const orders = this.getOrders();
    order.id = "SH" + Date.now().toString().slice(-8);
    order.date = new Date().toISOString();
    order.status = "Confirmed";
    orders.unshift(order);
    this._write(this.KEYS.orders, orders);
    this.clearCart();
    return order;
  },
};

function cartLineTotal(item){
  const p = PRODUCTS.find(p => p.id === item.id);
  return p ? p.price * item.qty : 0;
}
function cartSubtotal(){
  return Store.getCart().reduce((sum, item) => sum + cartLineTotal(item), 0);
}
function cartCount(){
  return Store.getCart().reduce((sum, item) => sum + item.qty, 0);
}
function updateCartBadge(){
  document.querySelectorAll(".js-cart-count").forEach(el => el.textContent = cartCount());
}
function updateWishlistBadge(){
  document.querySelectorAll(".js-wishlist-count").forEach(el => el.textContent = Store.getWishlist().length);
}
document.addEventListener("DOMContentLoaded", () => { updateCartBadge(); updateWishlistBadge(); });
