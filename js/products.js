// Product Data
let products = [];
let cart = [];

// CartManager - Handle all cart operations
const CartManager = {
    init() {
        this.loadCart();
        this.updateCartBadge();
    },

    loadCart() {
        const savedCart = localStorage.getItem('shopCart');
        cart = savedCart ? JSON.parse(savedCart) : [];
    },

    saveCart() {
        localStorage.setItem('shopCart', JSON.stringify(cart));
        this.updateCartBadge();
    },

    addProduct(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.discountPrice,
                originalPrice: product.originalPrice,
                image: product.image,
                quantity: 1
            });
        }
        
        this.saveCart();
    },

    updateCartBadge() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
    }
};

// Load products from JSON file
async function loadProducts() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        products = data.products;
        
        // Initialize the page
        filterAndDisplayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        productGrid.innerHTML = '<div class="no-products">Error loading products. Please refresh the page.</div>';
    }
}

// Get DOM elements
const categoryBtns = document.querySelectorAll('.category-btn');
const productGrid = document.getElementById('productGrid');
const cartBadge = document.querySelector('.cart-badge');
const cartIcon = document.querySelector('.cart-icon');
const loginBtn = document.querySelector('.login-btn');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Current active category
let activeCategory = 'all';

// Cart icon click - Navigate to cart page
cartIcon.addEventListener('click', function() {
    window.location.href = 'cart.html';
});

// Login button functionality
loginBtn.addEventListener('click', function() {
    alert('👤 Login feature will be implemented soon!');
});

// Hamburger menu toggle
hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickInsideHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideMenu && !isClickInsideHamburger && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Event listeners for category buttons
categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update active category
        activeCategory = this.getAttribute('data-category');
        
        // Filter and display products
        filterAndDisplayProducts();
    });
});

// Filter products by category
function filterAndDisplayProducts() {
    let filteredProducts;
    
    if (activeCategory === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === activeCategory);
    }
    
    displayProducts(filteredProducts);
}

// Display products in grid
function displayProducts(productsToDisplay) {
    // Clear existing products
    productGrid.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productGrid.innerHTML = '<div class="no-products">No products found in this category.</div>';
        return;
    }
    
    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-banner">
            <img src="${product.image}" alt="${product.title}" class="product-image">
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-pricing">
                <span class="product-price">₹${product.discountPrice}</span>
                <span class="product-original-price">₹${product.originalPrice}</span>
                <span class="discount-badge">${product.discount}% OFF</span>
            </div>
            <button class="add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
    
    // Add to cart button click handler
    card.querySelector('.add-to-cart').addEventListener('click', function() {
        addToCart(product);
    });
    
    return card;
}

// Add to cart function
function addToCart(product) {
    CartManager.addProduct(product);
    
    // Show notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = `✅ "${product.title}" added to cart!`;
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Initialize - Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    CartManager.init();
    loadProducts();
});
