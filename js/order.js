// Order functionality
let cart = [];
let orderData = null;

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('shopCart');
    cart = savedCart ? JSON.parse(savedCart) : [];
}

// Generate Order ID
function generateOrderId() {
    return 'ORD' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Calculate totals
function calculateTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = cart.reduce((total, item) => {
        const itemDiscount = (item.originalPrice - item.price) * item.quantity;
        return total + itemDiscount;
    }, 0);
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;

    return { subtotal, discount, tax, total };
}

// Display order items in summary
function displayOrderItems() {
    const orderItemsContainer = document.getElementById('orderItems');
    orderItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p style="color: #999; text-align: center;">No items in cart</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <span class="item-name">${item.title}</span>
            <span class="item-qty">x${item.quantity}</span>
            <span class="item-price">₹${(item.price * item.quantity)}</span>
        `;
        orderItemsContainer.appendChild(itemElement);
    });
}

// Update order summary
function updateOrderSummary() {
    const { subtotal, discount, tax, total } = calculateTotals();

    document.getElementById('summarySubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('summaryDiscount').textContent = `-₹${discount.toLocaleString('en-IN')}`;
    document.getElementById('summaryTax').textContent = `₹${tax.toLocaleString('en-IN')}`;
    document.getElementById('summaryTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
}

// Get DOM elements
const orderForm = document.getElementById('orderForm');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const confirmationModal = document.getElementById('confirmationModal');
const continueShopping = document.getElementById('continueShopping');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartIcon = document.querySelector('.cart-icon');
const cartBadge = document.querySelector('.cart-badge');

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

// Cart icon click - go to cart page
cartIcon.addEventListener('click', function() {
    window.location.href = 'cart.html';
});

// Update cart badge
function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
}

// Form validation
function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zipcode = document.getElementById('zipcode').value.trim();
    const country = document.getElementById('country').value.trim();
    const termsAccepted = document.getElementById('termsAccepted').checked;

    // Validation checks
    if (!fullName || fullName.length < 3) {
        alert('❌ Please enter a valid full name (minimum 3 characters)');
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('❌ Please enter a valid email address');
        return false;
    }

    if (!/^[\d+\-\s()]+$/.test(phone) || phone.length < 10) {
        alert('❌ Please enter a valid phone number');
        return false;
    }

    if (!address || address.length < 5) {
        alert('❌ Please enter a valid address');
        return false;
    }

    if (!city) {
        alert('❌ Please enter city name');
        return false;
    }

    if (!state) {
        alert('❌ Please enter state name');
        return false;
    }

    if (!zipcode || zipcode.length < 3) {
        alert('❌ Please enter a valid ZIP code');
        return false;
    }

    if (!country) {
        alert('❌ Please enter country name');
        return false;
    }

    if (!termsAccepted) {
        alert('❌ Please accept the Terms & Conditions');
        return false;
    }

    return true;
}

// Handle form submission
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert('❌ Your cart is empty! Please add items before placing an order.');
        window.location.href = 'products.html';
        return;
    }

    if (!validateForm()) {
        return;
    }

    // Get form data
    const formData = new FormData(orderForm);
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    // Simulate payment processing
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Processing...';

    // Simulate API call delay
    setTimeout(() => {
        // Create order object
        const orderId = generateOrderId();
        const { subtotal, discount, tax, total } = calculateTotals();

        orderData = {
            orderId: orderId,
            customerName: formData.get('fullName'),
            customerEmail: formData.get('email'),
            customerPhone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zipcode: formData.get('zipcode'),
            country: formData.get('country'),
            paymentMethod: paymentMethod,
            items: cart,
            subtotal: subtotal,
            discount: discount,
            tax: tax,
            total: total,
            orderDate: new Date().toLocaleDateString('en-IN'),
            status: 'Confirmed'
        };

        // Save order to localStorage
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        // Clear cart
        localStorage.removeItem('shopCart');
        cart = [];

        // Show confirmation modal
        showConfirmationModal();

        // Reset button
        placeOrderBtn.disabled = false;
        placeOrderBtn.textContent = 'Place Order';
    }, 1500);
});

// Show confirmation modal
function showConfirmationModal() {
    // Populate confirmation details
    const paymentMethodMap = {
        'creditcard': '💳 Credit/Debit Card',
        'upi': '📱 UPI',
        'netbanking': '🏦 Net Banking',
        'cod': '💰 Cash on Delivery'
    };

    document.getElementById('orderId').textContent = orderData.orderId;
    document.getElementById('customerName').textContent = orderData.customerName;
    document.getElementById('customerEmail').textContent = orderData.customerEmail;
    document.getElementById('totalAmount').textContent = `₹${orderData.total.toLocaleString('en-IN')}`;
    document.getElementById('paymentMethodDisplay').textContent = paymentMethodMap[orderData.paymentMethod];

    // Show modal
    confirmationModal.style.display = 'flex';

    // Scroll to top
    window.scrollTo(0, 0);
}

// Continue shopping button
continueShopping.addEventListener('click', function() {
    confirmationModal.style.display = 'none';
    window.location.href = 'products.html';
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    displayOrderItems();
    updateOrderSummary();
    updateCartBadge();

    // Redirect if cart is empty
    if (cart.length === 0) {
        alert('⚠️ Your cart is empty! Redirecting to products page...');
        setTimeout(() => {
            window.location.href = 'products.html';
        }, 1000);
    }
});

// Prevent going back if order is placed
window.addEventListener('beforeunload', function(e) {
    if (document.getElementById('confirmationModal').style.display === 'flex') {
        e.preventDefault();
        e.returnValue = '';
    }
});
