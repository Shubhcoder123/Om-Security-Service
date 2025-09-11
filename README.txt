
# Grozii — Grocery Delivery Website

A modern, scrollable, mobile-friendly grocery delivery website with:
- Product catalog, search, category filters
- Cart and checkout flow
- **Customer Requirement** popup card (free-text order + phone + address)
- Local SVG images everywhere (no external downloads needed)
- LocalStorage-based demo backend (replace with your real backend later)

## File Structure
```
grozii_grocery_site/
├─ index.html
├─ checkout.html
├─ success.html
├─ styles.css
├─ app.js
├─ data/
│  └─ products.json
└─ assets/
   └─ images/
      ├─ hero.svg
      ├─ fruits.svg
      ├─ vegetables.svg
      ├─ dairy.svg
      ├─ bakery.svg
      ├─ beverages.svg
      ├─ staples.svg
      ├─ personalcare.svg
      └─ cleaning.svg
```

## How to Use
1. Download and unzip the project.
2. Open `index.html` in your browser.
3. Use the **Customer Requirement** button on the hero to open the popup and place a free-text order.
4. Add some items to the cart and go to **Checkout** to place a normal order.
5. Orders/requirements are saved in your browser's localStorage for demo/testing.

> Set your WhatsApp number in `app.js` by editing `ADMIN_PHONE`.
