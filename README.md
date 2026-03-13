# ShopHub - Ecommerce Website

## 📋 Project Overview
A fully responsive, modern ecommerce website built with pure HTML, CSS, and JavaScript. The project includes product listing, category filtering, shopping cart functionality, and a beautiful user interface.

## 📁 Project Structure

```
project/
├── 📄 index.html                    # Home page
├── 📄 products.html                 # Product listing page
├── 📄 data.json                     # Product data (21 products)
│
├── 📁 css/
│   ├── style.css                    # Home page styles
│   └── products.css                 # Product page styles
│
├── 📁 js/
│   ├── script.js                    # Home page scripts
│   └── products.js                  # Product page scripts & cart logic
│
├── 📁 images/
│   └── (Reserved for local images)
│
└── 📄 README.md                     # This file
```

## 🎯 Features

### ✨ Home Page (index.html)
- Welcome message
- Interactive button
- Smooth animations
- Fully responsive

### 🛍️ Product Page (products.html)
- **Header Section**
  - Brand name (ShopHub)
  - Navigation menu
  - Cart icon with badge counter
  - Login button
  - Responsive hamburger menu
  
- **Category Filtering**
  - All Products
  - Electronics (5 products)
  - Fashion (4 products)
  - Books (4 products)
  - Home & Kitchen (4 products)
  - Sports (4 products)

- **Product Cards**
  - Product image
  - Title and description
  - Original price with discount
  - Discount percentage badge
  - Add to cart button
  - Hover animations

- **Shopping Cart**
  - Cart counter in header
  - Add to cart notifications
  - Real-time cart updates

- **Footer**
  - About section
  - Quick links
  - Customer service info
  - Contact details
  - Social media links

## 📱 Responsive Design

### Desktop (1200px and above)
- Full horizontal layout
- Sidebar category filter
- Multi-column product grid
- All navigation visible

### Tablet (768px - 1024px)
- Responsive grid layout
- Category filters in horizontal row
- Navigation adjusted
- Optimized spacing

### Mobile (480px - 768px)
- Single column product grid
- Hamburger menu for navigation
- Stacked category buttons
- Touch-friendly buttons

### Small Mobile (below 480px)
- Full-width layout
- Simplified navigation
- Single product column
- Optimized footer

## 🚀 Quick Start

### 1. Open the Website
- Open `index.html` in your browser for the home page
- Open `products.html` for the product listing page

### 2. View Products
- Click on "Products" link from home page or open products.html directly
- Browse all 21 products across 5 categories
- Filter by category using sidebar buttons

### 3. Add to Cart
- Click "Add to Cart" button on any product
- See cart counter increase in header
- Get notification confirmation

### 4. Responsive Testing
- Resize browser window to see responsive design
- Use browser DevTools:
  - Press F12 (Windows/Linux) or Cmd+Option+I (Mac)
  - Click responsive design mode icon
  - Test on different screen sizes

## 📊 Product Data

### data.json Structure
```json
{
  "products": [
    {
      "id": 1,
      "category": "electronics",
      "title": "Product Name",
      "description": "Product description",
      "image": "image_url",
      "originalPrice": 4999,
      "discountPrice": 2999,
      "discount": 40
    }
  ]
}
```

**Total Products: 21** across 5 categories with:
- Unique product images (from Unsplash)
- Real pricing with discounts
- Detailed descriptions

## 🎨 Design Features

### Color Scheme
- Primary: Purple gradient (#667eea to #764ba2)
- Secondary: Dark blue (#2c3e50)
- Accent: Red for discounts (#ff4444)

### Typography
- Font: Segoe UI, Tahoma, Geneva, Verdana
- Responsive font sizes

### Animations
- Smooth hover effects
- Fade-in animations for products
- Slide-in notifications
- Hamburger menu animation

## 💻 Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Responsive design with Flexbox and Grid
- **JavaScript ES6** - Dynamic functionality
- **JSON** - Data storage
- **Unsplash API** - Product images

## 🔧 Customization

### Add New Products
1. Edit `data.json`
2. Add new product object with all required fields
3. Refresh the page - products load automatically

### Change Colors
1. Edit `css/products.css`
2. Find gradient values: `#667eea` and `#764ba2`
3. Replace with your colors

### Modify Categories
1. Edit `products.html` - Category buttons
2. Update `data.json` - Product categories
3. Ensure category names match

## 📞 Contact
- Email: support@shophub.com
- Phone: +1 (800) 123-4567
- Address: 123 Shopping St, NY 10001

## 📝 Notes

- All images are from Unsplash CDN (no local images required)
- No external dependencies - pure HTML/CSS/JS
- Works offline (except for image loading)
- Browser compatibility: All modern browsers

## 🎓 Learning Resource

This project demonstrates:
- ✅ Responsive web design
- ✅ Async/await with fetch API
- ✅ DOM manipulation
- ✅ Event handling
- ✅ Array filtering
- ✅ CSS Grid & Flexbox
- ✅ Mobile-first approach
- ✅ State management (cart counter)

## ✅ Checklist

- [x] Responsive Header
- [x] Category Filtering
- [x] Product Grid
- [x] Shopping Cart
- [x] Footer
- [x] Mobile Menu
- [x] Notifications
- [x] Image Optimization
- [x] Smooth Animations
- [x] Clean Code Structure

---

**Made with ❤️ by ShopHub Team**
