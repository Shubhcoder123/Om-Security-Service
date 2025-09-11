// Initialize cart if it doesn't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Check if we're on the index page or checkout page
const isCheckoutPage = window.location.pathname.includes('checkout.html');

// Function to update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart count in navigation
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Function to add item to cart
function addToCart(id, name, price, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex > -1) {
        // Update quantity if product already exists
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: quantity,
            image: `assets/images/${name.toLowerCase().replace(/\s+/g, '')}.png`
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show confirmation message
    alert(`Added ${quantity} ${name} to cart!`);
}

// Function to display cart items on checkout page
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartContainer = document.getElementById('cart-items');
    
    if (!cartContainer) {
        return; // Not on checkout page
    }
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        updateSummary(0);
        return;
    }
    
    let cartHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>
                <div class="item-total">₹${itemTotal}</div>
                <button class="remove-item-btn" data-id="${item.id}">×</button>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
    updateSummary(subtotal);
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            removeItemFromCart(itemId);
        });
    });
}

// Function to remove item from cart
function removeItemFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    displayCartItems();
    updateCartCount();
}

// Function to update summary values
function updateSummary(subtotal) {
    const shipping = 20;
    const total = subtotal + shipping;
    
    if (document.getElementById('items-total')) {
        document.getElementById('items-total').textContent = `₹${subtotal}`;
    }
    if (document.getElementById('grand-total')) {
        document.getElementById('grand-total').textContent = `₹${total}`;
    }
}

// Function to handle form submission
function setupFormHandlers() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            
            if (!name || !phone || !address) {
                alert('Please fill in all customer details');
                return;
            }
            
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            if (cart.length === 0) {
                alert('Your cart is empty');
                return;
            }
            
            // Here you would typically send the order to your server
            alert('Order placed successfully!');
            
            // Clear cart after successful order
            localStorage.setItem('cart', JSON.stringify([]));
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
}

// Initialize page based on which page we're on
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on all pages
    updateCartCount();
    
    // If we're on the index page, set up product functionality
    if (!isCheckoutPage) {
        // Quantity control functionality
        document.querySelectorAll('.qty-btn').forEach(button => {
            button.addEventListener('click', function() {
                const input = this.parentNode.querySelector('input');
                let value = parseInt(input.value);
                
                if (this.textContent === '+') {
                    value++;
                } else if (this.textContent === '-' && value > 1) {
                    value--;
                }
                
                input.value = value;
            });
        });
        
        // Add to cart functionality
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productId = productCard.getAttribute('data-id');
                const productName = productCard.getAttribute('data-name');
                const productPrice = parseFloat(productCard.getAttribute('data-price'));
                const quantity = parseInt(productCard.querySelector('input').value);
                
                addToCart(productId, productName, productPrice, quantity);
            });
        });
    } else {
        // We're on the checkout page
        displayCartItems();
        setupFormHandlers();
    }
});

<script>
    // Search functionality
    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.querySelector('.search-bar input');
        const searchButton = document.querySelector('.search-bar button');
        const fruitCards = document.querySelectorAll('.fruit-card');
        
        // Function to filter fruits based on search input
        function filterFruits() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            fruitCards.forEach(card => {
                const fruitName = card.querySelector('.fruit-name').textContent.toLowerCase();
                
                if (fruitName.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        // Add event listeners
        searchInput.addEventListener('input', filterFruits);
        searchButton.addEventListener('click', filterFruits);
        
        // Clear search when 'Escape' key is pressed
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Escape') {
                searchInput.value = '';
                filterFruits();
            }
        });
    });
</script>