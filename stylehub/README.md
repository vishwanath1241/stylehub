# StyleHub — Fashion & Apparel E-Commerce Website

A premium, frontend-only fashion e-commerce website built for men, women and kids — built as a web development internship project.

**Live demo:** _add your deployed URL here after hosting (see "Deploy" below)_

![StyleHub banner](https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200)

## Overview

StyleHub simulates a real-world fashion storefront: browsing by category, filtering products, viewing product detail with size/color selection, managing a cart, checking out, and a simulated account system with order history and tracking. There is no backend — all data (products, cart, orders, wishlist, users) is handled in the browser with JavaScript, and cart/wishlist/orders persist across page loads using `localStorage`.

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero banner, category tiles, featured/bestseller products, seasonal offer strip, testimonials, newsletter |
| Product Listing | `products.html` | Grid of products with filters (category, brand, size, color, price) + search + sort |
| Product Detail | `product-detail.html` | Image gallery, size/color selector, quantity, add to cart, wishlist, reviews, size guide, related products |
| Shopping Cart | `cart.html` | Line items, quantity adjustment, remove item, coupon code, order totals |
| Checkout | `checkout.html` | Shipping address form, payment method, order summary, coupon carry-over, order placement |
| User Account | `account.html` | Profile, order history + simulated tracking, saved addresses, wishlist, size preferences |
| Login / Register | `login.html` | Tabbed simulated authentication (no real backend — any email/password works) |
| About Us | `about.html` | Brand story, design team, sustainability commitments |
| Contact Us | `contact.html` | Store locator (4 cities), hours, phone, contact form |

## Features

**Core**
- Category-wise product display (Men / Women / Kids, with sub-categories)
- Size & color selection on product detail
- Add to cart, quantity adjustment, live price calculation
- Order summary and checkout flow with form validation
- Simulated login/register with session persistence

**Bonus**
- Product filters: category, brand, size, color, price range
- Live search (navbar + listing page)
- Wishlist (heart icon on every product card)
- Product reviews & star ratings (+ "write a review" demo)
- Coupon code application (`STYLE10`, `WELCOME200`, `FREESHIP`)
- Size guide table on product detail
- Related products on product detail
- Simulated order tracking (Confirmed → Packed → Shipped → Out for Delivery → Delivered)

## Tech Stack

- **HTML5** — semantic structure across 9 pages
- **CSS3** — custom design system (no framework), responsive grid/flexbox layout, mobile nav
- **Vanilla JavaScript (ES6)** — all interactivity, filtering, cart/checkout logic, `localStorage` persistence
- **No backend / database** — `js/data.js` holds all product data as JS arrays/objects, per the project brief

## Project Structure

```
stylehub/
├── index.html
├── products.html
├── product-detail.html
├── cart.html
├── checkout.html
├── login.html
├── account.html
├── about.html
├── contact.html
├── css/
│   └── style.css          # full design system
├── js/
│   ├── data.js             # product data, reviews, stores, coupons
│   ├── cart.js              # cart / wishlist / auth / orders (Store object)
│   ├── main.js               # nav, search, toast, helpers
│   ├── products-page.js       # listing page filters/sort/search
│   ├── product-detail.js       # product detail page logic
│   ├── cart-page.js             # cart page logic
│   ├── checkout.js               # checkout logic
│   └── account.js                 # account page logic
└── README.md
```

## Design

- **Colors:** Pink `#E91E63`, White `#FFFFFF`, Dark `#1A1A2E`, Gold `#D4AF37`
- **Typography:** Playfair Display (editorial serif for headings) + Poppins (clean sans body/UI)
- **Signature motif:** dashed gold "stitch line" dividers (referencing garment seams) and a diagonal-cut hero panel

## Running Locally

No build step required — it's static HTML/CSS/JS.

```bash
# Option 1: just open it
open index.html

# Option 2: serve it (recommended, avoids any file:// quirks)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

**GitHub Pages**
1. Push this folder to a public GitHub repo.
2. Repo → Settings → Pages → Source: `main` branch, `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

**Netlify / Vercel**
1. Create a new site, connect the GitHub repo (or drag-and-drop the folder for Netlify).
2. No build command needed — root directory as-is, publish directory `/`.

## Notes

- Cart, wishlist, login session and order history are stored in the browser's `localStorage`, so they persist between visits on the same browser/device but are not shared across devices (there's no server).
- Demo login accepts any email + a password of 4+ characters — it's a simulated auth flow, not a real one.
- Product photography is sourced from Unsplash for demo purposes only.
