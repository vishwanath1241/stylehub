/* ============================================================
   STYLEHUB — SHARED UI HELPERS (nav, toast, search, stars)
   ============================================================ */

function initNav(){
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links){
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
  // highlight active link
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
}

function showToast(msg){
  let toast = document.querySelector(".toast");
  if (!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 2400);
}

function initSearch(){
  document.querySelectorAll(".js-search-form").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const q = form.querySelector("input").value.trim();
      window.location.href = "products.html" + (q ? ("?q=" + encodeURIComponent(q)) : "");
    });
  });
}

function starString(rating){
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function qs(name){
  return new URLSearchParams(window.location.search).get(name);
}

function requireLogin(redirectTo){
  if (!Store.getUser()){
    window.location.href = "login.html?next=" + encodeURIComponent(redirectTo || location.pathname.split("/").pop());
    return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initSearch();
});
