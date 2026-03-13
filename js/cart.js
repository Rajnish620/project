// Cart functionality
let cart = [];

// Update display when cart changes
function updateCartDisplay() {
    displayCartItems();
    updateCartSummary();
    updateCartBadge();
}

const cartManager = {
    loadCart() {
        const savedCart = localStorage.getItem('shopCart');
        cart = savedCart ? JSON.parse(savedCart) : [];
    },

    saveCart() {
        localStorage.setItem('shopCart', JSON.stringify(cart));
    },

    removeItem(productId) {
        cart = cart.filter(item => item.id !== productId);
        this.saveCart();
    },

    updateQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
            }
        }
    },

    getTotalPrice() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getTotalDiscount() {
        return cart.reduce((total, item) => {
            const discount = (item.originalPrice - item.price) * item.quantity;
            return total + discount;
        }, 0);
    }
};

// Get DOM elements
const cartItemsContainer = document.getElementById('cartItemsContainer');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartBadge = document.querySelector('.cart-badge');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartIcon = document.querySelector('.cart-icon');

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

// Cart icon click stays on cart page
cartIcon.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'cart.html';
});

// Checkout link validation
const checkoutLink = document.getElementById('checkoutBtn');
if (checkoutLink) {
    checkoutLink.addEventListener('click', function(e) {
        cartManager.loadCart();
        if (cart.length === 0) {
            e.preventDefault();
            alert('❌ Your cart is empty! Please add items first.');
        }
    });
}

// Update cart badge
function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
}

// Display cart items
function displayCartItems() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        showEmptyCart();
        return;
    }

    emptyCartMessage.style.display = 'none';
    document.querySelector('.cart-wrapper').style.display = 'grid';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="item-image">
            <div class="item-details">
                <h3>${item.title}</h3>
                <div class="item-price">₹${item.price}</div>
                <div class="item-controls">
                    <button class="qty-btn minus-btn" data-id="${item.id}">−</button>
                    <input type="number" class="qty-input" value="${item.quantity}" data-id="${item.id}" min="1">
                    <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
            </div>
            <div class="item-total">
                <div class="item-total-price">₹${(item.price * item.quantity)}</div>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners
    attachEventListeners();
}

// Attach event listeners to cart item buttons
function attachEventListeners() {
    // Quantity increase buttons
    document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const item = cart.find(item => item.id === productId);
            if (item) {
                cartManager.updateQuantity(productId, item.quantity + 1);
                updateCartDisplay();
            }
        });
    });

    // Quantity decrease buttons
    document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const item = cart.find(item => item.id === productId);
            if (item && item.quantity > 1) {
                cartManager.updateQuantity(productId, item.quantity - 1);
                updateCartDisplay();
            }
        });
    });

    // Quantity input change
    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.dataset.id);
            const newQuantity = parseInt(this.value);
            if (newQuantity > 0) {
                cartManager.updateQuantity(productId, newQuantity);
                updateCartDisplay();
            }
        });
    });

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            cartManager.removeItem(productId);
            updateCartDisplay();
        });
    });
}

// Show empty cart message
function showEmptyCart() {
    document.querySelector('.cart-wrapper').style.display = 'none';
    emptyCartMessage.style.display = 'block';
    cartBadge.textContent = '0';
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cartManager.getTotalPrice();
    const discount = cartManager.getTotalDiscount();
    const total = subtotal;

    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('discount').textContent = `-₹${discount.toLocaleString('en-IN')}`;
    document.getElementById('total').textContent = `₹${total.toLocaleString('en-IN')}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    cartManager.loadCart();
    updateCartDisplay();
});
