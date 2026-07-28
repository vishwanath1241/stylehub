/* ============================================================
   STYLEHUB — ACCOUNT PAGE LOGIC
   ============================================================ */

const TRACK_STAGES = ["Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

function renderProfile(user){
  document.getElementById("profile-info").innerHTML = `
    <div class="form-group"><label>Name</label><input value="${user.name}" disabled></div>
    <div class="form-group"><label>Email</label><input value="${user.email}" disabled></div>
    <div class="form-group"><label>Member Since</label><input value="${new Date(user.joined).toLocaleDateString()}" disabled></div>
    <p style="color:var(--gray); font-size:.85rem;">This is a simulated account for demo purposes — no real data is stored on a server.</p>`;
}

function renderOrders(){
  const orders = Store.getOrders();
  const list = document.getElementById("orders-list");
  if (!orders.length){
    list.innerHTML = `<p style="color:var(--gray);">You haven't placed any orders yet. <a href="products.html" style="color:var(--pink);">Start shopping →</a></p>`;
    return;
  }
  list.innerHTML = orders.map(o => {
    const stageIndex = TRACK_STAGES.indexOf(o.status) >= 0 ? TRACK_STAGES.indexOf(o.status) : 0;
    return `
    <div class="order-card">
      <div class="order-card-head">
        <span><strong>Order #${o.id}</strong> · ${new Date(o.date).toLocaleDateString()}</span>
        <span class="status-pill">${o.status}</span>
      </div>
      <div class="track-bar">
        ${TRACK_STAGES.map((s,i)=>`<div class="track-step ${i<=1?'done':''}">${s}</div>`).join("")}
      </div>
      <div style="font-size:.85rem; color:var(--gray);">${o.items.length} item(s) · Total ${formatINR(o.total)}</div>
      <div style="margin-top:10px; display:flex; gap:14px; flex-wrap:wrap;">
        ${o.items.map(it => `<img src="${it.img}" alt="${it.name}" style="width:50px;height:60px;object-fit:cover;">`).join("")}
      </div>
    </div>`;
  }).join("");
}

function renderAddresses(){
  const orders = Store.getOrders();
  const list = document.getElementById("addresses-list");
  const seen = new Map();
  orders.forEach(o => { if (o.shipping) seen.set(o.shipping.address + o.shipping.pin, o.shipping); });
  const addrs = [...seen.values()];
  list.innerHTML = addrs.length ? addrs.map(a => `
    <div class="order-card">
      <strong>${a.name}</strong><br>
      <span style="color:var(--gray); font-size:.9rem;">${a.address}, ${a.city}, ${a.state} - ${a.pin}<br>Phone: ${a.phone}</span>
    </div>`).join("") : `<p style="color:var(--gray);">No saved addresses yet — they'll appear here after your first order.</p>`;
}

function renderWishlist(){
  const ids = Store.getWishlist();
  const grid = document.getElementById("wishlist-grid");
  if (!ids.length){
    grid.innerHTML = `<p style="color:var(--gray);">Your wishlist is empty. <a href="products.html" style="color:var(--pink);">Browse products →</a></p>`;
    return;
  }
  grid.innerHTML = ids.map(id => {
    const p = PRODUCTS.find(p => p.id === id);
    if (!p) return "";
    return `
    <div class="product-card">
      <div class="product-thumb">
        <button class="wishlist-btn active" onclick="Store.toggleWishlist('${p.id}'); renderWishlist(); updateWishlistBadge();">♥</button>
        <a href="product-detail.html?id=${p.id}"><img src="${p.img}" alt="${p.name}"></a>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name"><a href="product-detail.html?id=${p.id}">${p.name}</a></div>
        <div class="product-price"><span class="price-now">${formatINR(p.price)}</span></div>
      </div>
    </div>`;
  }).join("");
}

function initAccount(){
  const user = Store.getUser();
  if (!user){
    document.getElementById("logged-out-view").style.display = "block";
    document.getElementById("logged-in-view").style.display = "none";
    return;
  }

  renderProfile(user);
  renderOrders();
  renderAddresses();
  renderWishlist();

  const justPlaced = qs("justPlaced");
  if (justPlaced) showToast("Order " + justPlaced + " placed successfully!");

  const requestedTab = qs("tab") || "profile";
  activateTab(requestedTab);

  document.querySelectorAll(".account-nav a[data-tab]").forEach(a => {
    a.addEventListener("click", (e) => { e.preventDefault(); activateTab(a.dataset.tab); });
  });
  document.getElementById("logout-link").addEventListener("click", (e) => {
    e.preventDefault();
    Store.logout();
    showToast("Logged out");
    setTimeout(() => location.reload(), 400);
  });
  document.getElementById("save-prefs").addEventListener("click", () => showToast("Size preferences saved"));
}

function activateTab(tab){
  document.querySelectorAll(".account-nav a[data-tab]").forEach(a => a.classList.toggle("active", a.dataset.tab === tab));
  document.querySelectorAll(".account-panel").forEach(p => p.classList.remove("active"));
  const panel = document.getElementById("panel-" + tab);
  if (panel) panel.classList.add("active");
}

document.addEventListener("DOMContentLoaded", initAccount);
