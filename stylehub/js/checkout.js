/* ============================================================
   STYLEHUB — CHECKOUT PAGE LOGIC
   ============================================================ */

function renderCheckout(){
  const cart = Store.getCart();
  const root = document.getElementById("checkout-content");

  if (!cart.length){
    root.innerHTML = `
      <div class="empty-state">
        <div class="icon">🛍</div>
        <h3>Your cart is empty</h3>
        <p style="color:var(--gray); margin-bottom:24px;">Add some items before checking out.</p>
        <a href="products.html" class="btn btn-primary">Shop Now</a>
      </div>`;
    return;
  }

  const subtotal = cartSubtotal();
  const savedCode = sessionStorage.getItem("stylehub_coupon");
  const coupon = savedCode && COUPONS[savedCode] ? COUPONS[savedCode] : null;
  let discount = 0;
  if (coupon){
    if (coupon.type === "percent") discount = Math.round(subtotal * coupon.value / 100);
    if (coupon.type === "flat" && subtotal >= 1999) discount = coupon.value;
  }
  const shipping = subtotal >= 1999 || (coupon && coupon.type === "shipping") ? 0 : 149;
  const total = Math.max(0, subtotal - discount + shipping);
  const user = Store.getUser();

  root.innerHTML = `
    <div class="checkout-layout">
      <form id="checkout-form">
        <div class="form-card">
          <h3>Shipping Address</h3>
          <div class="form-row">
            <div class="form-group"><label>Full Name</label><input required name="fullname" value="${user ? user.name : ''}"></div>
            <div class="form-group"><label>Phone Number</label><input required name="phone" type="tel" pattern="[0-9]{10}" placeholder="10-digit number"></div>
          </div>
          <div class="form-group"><label>Address Line</label><input required name="address" placeholder="House no., street, area"></div>
          <div class="form-row">
            <div class="form-group"><label>City</label><input required name="city"></div>
            <div class="form-group"><label>State</label><input required name="state"></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>PIN Code</label><input required name="pin" pattern="[0-9]{6}" placeholder="6-digit PIN"></div>
            <div class="form-group"><label>Email</label><input required type="email" name="email" value="${user ? user.email : ''}"></div>
          </div>
        </div>

        <div class="form-card">
          <h3>Payment Method</h3>
          <label class="pay-option selected"><input type="radio" name="payment" value="card" checked> Credit / Debit Card</label>
          <label class="pay-option"><input type="radio" name="payment" value="upi"> UPI</label>
          <label class="pay-option"><input type="radio" name="payment" value="cod"> Cash on Delivery</label>
          <div id="card-fields" class="form-row" style="margin-top:16px;">
            <div class="form-group"><label>Card Number</label><input name="cardnum" placeholder="1234 5678 9012 3456"></div>
            <div class="form-group"><label>Expiry</label><input name="expiry" placeholder="MM/YY"></div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block">Place Order — ${formatINR(total)}</button>
      </form>

      <div class="summary-card">
        <h3 style="margin-bottom:18px;">Order Summary</h3>
        ${cart.map(item => {
          const p = PRODUCTS.find(p => p.id === item.id);
          return p ? `<div class="order-line"><span>${p.name} (${item.size}) × ${item.qty}</span><span>${formatINR(cartLineTotal(item))}</span></div>` : "";
        }).join("")}
        <div class="stitch" style="margin: 14px 0;"></div>
        <div class="summary-row"><span>Subtotal</span><span>${formatINR(subtotal)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? "FREE" : formatINR(shipping)}</span></div>
        ${discount ? `<div class="summary-row"><span>Discount (${savedCode})</span><span>-${formatINR(discount)}</span></div>` : ""}
        <div class="summary-row total"><span>Total</span><span>${formatINR(total)}</span></div>
      </div>
    </div>`;

  document.querySelectorAll('.pay-option').forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll('.pay-option').forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      opt.querySelector('input').checked = true;
      document.getElementById("card-fields").style.display = opt.querySelector('input').value === "card" ? "grid" : "none";
    });
  });

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const order = {
      items: cart.map(item => {
        const p = PRODUCTS.find(p => p.id === item.id);
        return { name: p.name, price: p.price, qty: item.qty, size: item.size, color: item.color, img: p.img };
      }),
      shipping: { name: fd.get("fullname"), phone: fd.get("phone"), address: fd.get("address"), city: fd.get("city"), state: fd.get("state"), pin: fd.get("pin") },
      payment: fd.get("payment"),
      subtotal, discount, shippingFee: shipping, total,
      coupon: savedCode || null,
    };
    if (!Store.getUser()) Store.login(fd.get("email"), fd.get("fullname"));
    const placed = Store.placeOrder(order);
    sessionStorage.removeItem("stylehub_coupon");
    window.location.href = "account.html?tab=orders&justPlaced=" + placed.id;
  });
}

document.addEventListener("DOMContentLoaded", renderCheckout);
