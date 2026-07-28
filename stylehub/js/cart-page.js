/* ============================================================
   STYLEHUB — CART PAGE LOGIC
   ============================================================ */

let appliedCoupon = null;

function renderCart(){
  const cart = Store.getCart();
  const root = document.getElementById("cart-content");

  if (!cart.length){
    root.innerHTML = `
      <div class="empty-state">
        <div class="icon">🛍</div>
        <h3>Your cart is empty</h3>
        <p style="color:var(--gray); margin-bottom:24px;">Looks like you haven't added anything yet.</p>
        <a href="products.html" class="btn btn-primary">Start Shopping</a>
      </div>`;
    return;
  }

  const itemsHTML = cart.map((item, i) => {
    const p = PRODUCTS.find(p => p.id === item.id);
    if (!p) return "";
    return `
    <div class="cart-item">
      <a href="product-detail.html?id=${p.id}"><img src="${p.img}" alt="${p.name}"></a>
      <div>
        <div class="cart-item-name"><a href="product-detail.html?id=${p.id}">${p.name}</a></div>
        <div class="cart-item-meta">Size: ${item.size} · Color: ${item.color}</div>
        <div class="cart-item-meta">${formatINR(p.price)} each</div>
        <button class="cart-item-remove" data-i="${i}">Remove</button>
      </div>
      <div class="qty-selector">
        <button type="button" class="qty-minus" data-i="${i}">−</button>
        <input type="text" value="${item.qty}" readonly>
        <button type="button" class="qty-plus" data-i="${i}">+</button>
      </div>
      <div style="font-weight:700; color:var(--pink-dark);">${formatINR(cartLineTotal(item))}</div>
    </div>`;
  }).join("");

  const subtotal = cartSubtotal();
  const shipping = subtotal >= 1999 || (appliedCoupon && appliedCoupon.type === "shipping") ? 0 : 149;
  let discount = 0;
  if (appliedCoupon){
    if (appliedCoupon.type === "percent") discount = Math.round(subtotal * appliedCoupon.value / 100);
    if (appliedCoupon.type === "flat" && subtotal >= 1999) discount = appliedCoupon.value;
  }
  const total = Math.max(0, subtotal - discount + shipping);

  root.innerHTML = `
    <div class="cart-layout">
      <div>${itemsHTML}</div>
      <div class="summary-card">
        <h3 style="margin-bottom:20px;">Order Summary</h3>
        <div class="summary-row"><span>Subtotal (${cartCount()} items)</span><span>${formatINR(subtotal)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? "FREE" : formatINR(shipping)}</span></div>
        ${discount ? `<div class="summary-row"><span>Discount</span><span>-${formatINR(discount)}</span></div>` : ""}
        <div class="coupon-row">
          <input type="text" id="coupon-input" placeholder="Coupon code" value="${appliedCoupon ? appliedCoupon._code : ''}">
          <button class="btn btn-outline btn-sm" id="apply-coupon">Apply</button>
        </div>
        <div id="coupon-msg" style="font-size:.8rem; color:var(--success); margin-bottom:10px;">${appliedCoupon ? "✓ " + appliedCoupon.desc + " applied" : ""}</div>
        <div class="summary-row total"><span>Total</span><span>${formatINR(total)}</span></div>
        <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top:18px;">Proceed to Checkout</a>
        <a href="products.html" class="btn btn-outline btn-block" style="margin-top:10px;">Continue Shopping</a>
      </div>
    </div>`;

  document.querySelectorAll(".qty-plus").forEach(b => b.addEventListener("click", () => {
    const i = Number(b.dataset.i); Store.updateQty(i, Store.getCart()[i].qty + 1); renderCart();
  }));
  document.querySelectorAll(".qty-minus").forEach(b => b.addEventListener("click", () => {
    const i = Number(b.dataset.i); Store.updateQty(i, Store.getCart()[i].qty - 1); renderCart();
  }));
  document.querySelectorAll(".cart-item-remove").forEach(b => b.addEventListener("click", () => {
    Store.removeFromCart(Number(b.dataset.i)); showToast("Item removed"); renderCart();
  }));
  const applyBtn = document.getElementById("apply-coupon");
  if (applyBtn) applyBtn.addEventListener("click", () => {
    const code = document.getElementById("coupon-input").value.trim().toUpperCase();
    if (COUPONS[code]){
      appliedCoupon = { ...COUPONS[code], _code: code };
      sessionStorage.setItem("stylehub_coupon", code);
      showToast("Coupon applied: " + appliedCoupon.desc);
    } else {
      appliedCoupon = null;
      showToast("Invalid coupon code");
    }
    renderCart();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = sessionStorage.getItem("stylehub_coupon");
  if (saved && COUPONS[saved]) appliedCoupon = { ...COUPONS[saved], _code: saved };
  renderCart();
});
