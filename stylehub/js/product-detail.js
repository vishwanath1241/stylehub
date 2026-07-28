/* ============================================================
   STYLEHUB — PRODUCT DETAIL PAGE LOGIC
   ============================================================ */

const SIZE_GUIDE = {
  apparel: [["XS","32-34","24-26"],["S","36-38","28-30"],["M","39-41","31-33"],["L","42-44","34-36"],["XL","45-47","37-39"]],
};

function initProductDetail(){
  const id = qs("id");
  const p = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  document.title = p.name + " — StyleHub";
  document.getElementById("crumb-cat").textContent = p.category[0].toUpperCase() + p.category.slice(1);
  document.getElementById("crumb-cat").href = "products.html?category=" + p.category;
  document.getElementById("crumb-name").textContent = p.name;

  let selectedSize = p.sizes[0];
  let selectedColor = p.colors[0];
  let selectedImg = 0;

  const root = document.getElementById("pd-root");
  root.innerHTML = `
  <div class="pd-layout">
    <div>
      <div class="pd-gallery-main"><img id="pd-main-img" src="${p.gallery[0]}" alt="${p.name}"></div>
      <div class="pd-thumbs">
        ${p.gallery.map((g,i)=>`<img src="${g}" data-i="${i}" class="${i===0?'active':''}" alt="${p.name} view ${i+1}">`).join("")}
      </div>
    </div>
    <div>
      <div class="pd-brand">${p.brand}</div>
      <h1 class="pd-title">${p.name}</h1>
      <div class="pd-rating">${starString(p.rating)} <span style="color:var(--gray);">${p.rating} · ${p.reviews} reviews</span></div>
      <div class="pd-price">${formatINR(p.price)} <span class="price-was">${formatINR(p.mrp)}</span></div>
      <p class="pd-desc">${p.desc}</p>

      <div class="option-label"><span>Color: <strong id="color-label">${selectedColor}</strong></span></div>
      <div class="swatch-row" id="pd-colors" style="margin-bottom:22px;"></div>

      <div class="option-label"><span>Size: <strong id="size-label">${selectedSize}</strong></span><a id="size-guide-link" href="#size-guide">Size Guide</a></div>
      <div class="size-row" id="pd-sizes" style="margin-bottom:22px;"></div>

      <div class="option-label"><span>Quantity</span></div>
      <div class="qty-selector">
        <button type="button" id="qty-minus">−</button>
        <input type="text" id="qty-input" value="1" readonly>
        <button type="button" id="qty-plus">+</button>
      </div>

      <div class="pd-actions">
        <button class="btn btn-primary" id="add-cart-btn" style="flex:1;">Add to Cart</button>
        <button class="btn btn-outline-pink" id="wish-btn">${Store.isWishlisted(p.id) ? '♥ Wishlisted' : '♡ Wishlist'}</button>
      </div>

      <ul class="pd-meta">
        <li>✓ Free shipping on orders above ₹1999</li>
        <li>✓ Easy 15-day returns & exchanges</li>
        <li>✓ Cash on delivery available</li>
      </ul>

      <div class="tabs-nav">
        <button class="tab-btn active" data-tab="desc">Description</button>
        <button class="tab-btn" data-tab="reviews">Reviews (${p.reviews})</button>
        <button class="tab-btn" data-tab="size-guide">Size Guide</button>
      </div>
      <div class="tab-panel active" id="tab-desc">
        <p>${p.desc}</p>
        <p style="color:var(--gray); font-size:.9rem;">Category: ${p.sub} · Brand: ${p.brand}</p>
      </div>
      <div class="tab-panel" id="tab-reviews">
        <div id="reviews-list"></div>
        <button class="btn btn-outline btn-sm" id="add-review-btn" style="margin-top:16px;">Write a Review</button>
      </div>
      <div class="tab-panel" id="tab-size-guide" >
        <table class="size-guide-table" id="size-guide">
          <thead><tr><th>Size</th><th>Chest (in)</th><th>Waist (in)</th></tr></thead>
          <tbody>${SIZE_GUIDE.apparel.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody>
        </table>
        <p style="color:var(--gray); font-size:.85rem; margin-top:12px;">Measurements are approximate. If between sizes, we recommend sizing up.</p>
      </div>
    </div>
  </div>`;

  // colors
  const colorMap = { White:"#fff", "Sky Blue":"#8ecae6", Charcoal:"#333", Indigo:"#3f5c8a", Black:"#111", "Stone Wash":"#a9a29a",
    Navy:"#1b263b", Tan:"#c8956d", Brown:"#6b4226", Olive:"#6b6b3a", Champagne:"#f0dfc4", Emerald:"#0f6b4c", Ivory:"#fdf6ec",
    Blush:"#f3c9d0", Nude:"#e3bd9c", Red:"#c0223a", Gold:"#d4af37", Terracotta:"#c16b4a", Blue:"#3a6bc9", Green:"#3a9b5c",
    Pink:"#e91e63", Lavender:"#c9b6e4", Cream:"#f7f1e6", Sage:"#a8bfa0", Multicolor:"conic-gradient(red,orange,yellow,green,blue,violet)" };
  const colorsEl = document.getElementById("pd-colors");
  colorsEl.innerHTML = p.colors.map((c,i)=>`<span class="swatch ${i===0?'selected':''}" data-color="${c}" style="background:${colorMap[c]||'#ccc'};" title="${c}"></span>`).join("");
  colorsEl.addEventListener("click", e => {
    if (!e.target.dataset.color) return;
    selectedColor = e.target.dataset.color;
    document.getElementById("color-label").textContent = selectedColor;
    colorsEl.querySelectorAll(".swatch").forEach(s => s.classList.toggle("selected", s === e.target));
  });

  // sizes
  const sizesEl = document.getElementById("pd-sizes");
  sizesEl.innerHTML = p.sizes.map((s,i)=>`<button type="button" class="size-chip ${i===0?'selected':''}" data-size="${s}">${s}</button>`).join("");
  sizesEl.addEventListener("click", e => {
    if (!e.target.dataset.size) return;
    selectedSize = e.target.dataset.size;
    document.getElementById("size-label").textContent = selectedSize;
    sizesEl.querySelectorAll(".size-chip").forEach(s => s.classList.toggle("selected", s === e.target));
  });

  // gallery
  document.querySelectorAll(".pd-thumbs img").forEach(img => {
    img.addEventListener("click", () => {
      document.getElementById("pd-main-img").src = img.src;
      document.querySelectorAll(".pd-thumbs img").forEach(i => i.classList.remove("active"));
      img.classList.add("active");
    });
  });

  // qty
  const qtyInput = document.getElementById("qty-input");
  document.getElementById("qty-plus").addEventListener("click", () => qtyInput.value = Number(qtyInput.value) + 1);
  document.getElementById("qty-minus").addEventListener("click", () => qtyInput.value = Math.max(1, Number(qtyInput.value) - 1));

  // add to cart
  document.getElementById("add-cart-btn").addEventListener("click", () => {
    Store.addToCart(p.id, selectedSize, selectedColor, Number(qtyInput.value));
    showToast(`Added ${p.name} (${selectedSize}, ${selectedColor}) to cart`);
  });

  // wishlist
  document.getElementById("wish-btn").addEventListener("click", (e) => {
    const active = Store.toggleWishlist(p.id);
    e.target.textContent = active ? "♥ Wishlisted" : "♡ Wishlist";
    showToast(active ? "Added to wishlist" : "Removed from wishlist");
  });

  // tabs
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
    });
  });
  document.getElementById("size-guide-link").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector('.tab-btn[data-tab="size-guide"]').click();
  });

  // reviews
  const reviews = REVIEWS[p.id] || [];
  document.getElementById("reviews-list").innerHTML = reviews.length ? reviews.map(r => `
    <div class="review-item"><strong>${r.name}</strong><div class="stars">${starString(r.rating)}</div><p>${r.text}</p></div>
  `).join("") : `<p style="color:var(--gray);">No written reviews yet — be the first to share your thoughts.</p>`;
  document.getElementById("add-review-btn").addEventListener("click", () => {
    const name = prompt("Your name:");
    if (!name) return;
    const text = prompt("Your review:");
    if (!text) return;
    reviews.push({ name, rating: 5, text });
    document.getElementById("reviews-list").innerHTML = reviews.map(r => `
      <div class="review-item"><strong>${r.name}</strong><div class="stars">${starString(r.rating)}</div><p>${r.text}</p></div>
    `).join("");
    showToast("Thanks for your review!");
  });

  // related products
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  document.getElementById("related-grid").innerHTML = related.map(rp => `
    <div class="product-card">
      <div class="product-thumb">
        ${rp.tag ? `<span class="product-badge">${rp.tag}</span>` : ""}
        <a href="product-detail.html?id=${rp.id}"><img src="${rp.img}" alt="${rp.name}" loading="lazy"></a>
      </div>
      <div class="product-info">
        <div class="product-brand">${rp.brand}</div>
        <div class="product-name"><a href="product-detail.html?id=${rp.id}">${rp.name}</a></div>
        <div class="product-price"><span class="price-now">${formatINR(rp.price)}</span><span class="price-was">${formatINR(rp.mrp)}</span></div>
      </div>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", initProductDetail);
