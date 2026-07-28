/* ============================================================
   STYLEHUB — PRODUCT LISTING PAGE LOGIC
   Filters by category, brand, size, color, price + search + sort
   ============================================================ */

const state = {
  category: qs("category") || "",
  q: (qs("q") || "").toLowerCase(),
  brands: new Set(),
  sizes: new Set(),
  colors: new Set(),
  maxPrice: 9000,
  sort: "featured",
};

function uniq(arr){ return [...new Set(arr)]; }

function buildFilterUI(){
  document.querySelector(`input[name="category"][value="${state.category}"]`).checked = true;
  document.getElementById("search-input").value = qs("q") || "";

  const brands = uniq(PRODUCTS.map(p => p.brand)).sort();
  document.getElementById("brand-filters").innerHTML = brands.map(b => `
    <label class="filter-option"><input type="checkbox" data-brand="${b}"> ${b}</label>`).join("");

  const sizes = uniq(PRODUCTS.flatMap(p => p.sizes));
  document.getElementById("size-filters").innerHTML = sizes.map(s => `
    <button type="button" class="size-chip" data-size="${s}">${s}</button>`).join("");

  const colorMap = { White:"#fff", "Sky Blue":"#8ecae6", Charcoal:"#333", Indigo:"#3f5c8a", Black:"#111", "Stone Wash":"#a9a29a",
    Navy:"#1b263b", Tan:"#c8956d", Brown:"#6b4226", Olive:"#6b6b3a", Champagne:"#f0dfc4", Emerald:"#0f6b4c", Ivory:"#fdf6ec",
    Blush:"#f3c9d0", Nude:"#e3bd9c", Red:"#c0223a", Gold:"#d4af37", Terracotta:"#c16b4a", Blue:"#3a6bc9", Green:"#3a9b5c",
    Pink:"#e91e63", Lavender:"#c9b6e4", Cream:"#f7f1e6", Sage:"#a8bfa0", Multicolor:"conic-gradient(red,orange,yellow,green,blue,violet)" };
  const colors = uniq(PRODUCTS.flatMap(p => p.colors));
  document.getElementById("color-filters").innerHTML = colors.map(c => `
    <span class="swatch" data-color="${c}" title="${c}" style="background:${colorMap[c] || '#ccc'};"></span>`).join("");

  document.getElementById("price-range").value = state.maxPrice;
}

function attachFilterEvents(){
  document.querySelectorAll('input[name="category"]').forEach(el =>
    el.addEventListener("change", () => { state.category = el.value; render(); }));

  document.getElementById("brand-filters").addEventListener("change", e => {
    const b = e.target.dataset.brand;
    e.target.checked ? state.brands.add(b) : state.brands.delete(b);
    render();
  });

  document.getElementById("size-filters").addEventListener("click", e => {
    if (!e.target.dataset.size) return;
    e.target.classList.toggle("selected");
    const s = e.target.dataset.size;
    state.sizes.has(s) ? state.sizes.delete(s) : state.sizes.add(s);
    render();
  });

  document.getElementById("color-filters").addEventListener("click", e => {
    if (!e.target.dataset.color) return;
    e.target.classList.toggle("selected");
    const c = e.target.dataset.color;
    state.colors.has(c) ? state.colors.delete(c) : state.colors.add(c);
    render();
  });

  document.getElementById("price-range").addEventListener("input", e => {
    state.maxPrice = Number(e.target.value);
    document.getElementById("price-val").textContent = "Up to " + formatINR(state.maxPrice);
    render();
  });

  document.getElementById("sort-select").addEventListener("change", e => { state.sort = e.target.value; render(); });

  document.getElementById("search-input").addEventListener("input", e => {
    state.q = e.target.value.toLowerCase();
    render();
  });
}

function filteredProducts(){
  let list = PRODUCTS.filter(p => {
    if (state.category && p.category !== state.category) return false;
    if (state.q && !(p.name.toLowerCase().includes(state.q) || p.sub.toLowerCase().includes(state.q) || p.brand.toLowerCase().includes(state.q))) return false;
    if (state.brands.size && !state.brands.has(p.brand)) return false;
    if (state.sizes.size && !p.sizes.some(s => state.sizes.has(s))) return false;
    if (state.colors.size && !p.colors.some(c => state.colors.has(c))) return false;
    if (p.price > state.maxPrice) return false;
    return true;
  });
  switch(state.sort){
    case "price-asc": list.sort((a,b)=>a.price-b.price); break;
    case "price-desc": list.sort((a,b)=>b.price-a.price); break;
    case "rating": list.sort((a,b)=>b.rating-a.rating); break;
    case "newest": list = list.slice().reverse(); break;
    default: break;
  }
  return list;
}

function cardHTML(p){
  return `
  <div class="product-card">
    <div class="product-thumb">
      ${p.tag ? `<span class="product-badge">${p.tag}</span>` : ""}
      <button class="wishlist-btn ${Store.isWishlisted(p.id) ? 'active' : ''}" onclick="toggleWish(this,'${p.id}')">♡</button>
      <a href="product-detail.html?id=${p.id}"><img src="${p.img}" alt="${p.name}" loading="lazy"></a>
    </div>
    <div class="product-info">
      <div class="product-brand">${p.brand}</div>
      <div class="product-name"><a href="product-detail.html?id=${p.id}">${p.name}</a></div>
      <div class="product-price"><span class="price-now">${formatINR(p.price)}</span><span class="price-was">${formatINR(p.mrp)}</span></div>
      <div class="product-rating">${starString(p.rating)} <span style="color:#6E6E80;">(${p.reviews})</span></div>
    </div>
  </div>`;
}

function toggleWish(btn, id){
  const active = Store.toggleWishlist(id);
  btn.classList.toggle("active", active);
  showToast(active ? "Added to wishlist" : "Removed from wishlist");
}

function render(){
  const list = filteredProducts();
  document.getElementById("product-grid").innerHTML = list.map(cardHTML).join("");
  document.getElementById("result-count").textContent = `${list.length} product${list.length !== 1 ? "s" : ""} found`;
  document.getElementById("no-results").style.display = list.length ? "none" : "block";
  document.getElementById("product-grid").style.display = list.length ? "grid" : "none";

  const title = state.category ? state.category[0].toUpperCase() + state.category.slice(1) + "'s Collection" : (state.q ? `Search results for "${state.q}"` : "All Products");
  document.getElementById("page-title").textContent = title;
  document.getElementById("crumb").textContent = title;
}

document.addEventListener("DOMContentLoaded", () => {
  buildFilterUI();
  attachFilterEvents();
  render();
});
