const products = [
    { id: 1, name: "T-Shirt", price: 500 },
    { id: 2, name: "Shoes", price: 1500 },
    { id: 3, name: "Bag", price: 800 },
    { id: 4, name: "Smartphone", price: 15000 },
    { id: 5, name: "Laptop", price: 55000 },
    { id: 6, name: "Headphones", price: 2000 },
    { id: 7, name: "Smart Watch", price: 3500 },
    { id: 8, name: "Bluetooth Speaker", price: 1800 },
    { id: 9, name: "Keyboard", price: 1200 },
    { id: 10, name: "Mouse", price: 600 },
    { id: 11, name: "Tablet", price: 22000 },
    { id: 12, name: "Power Bank", price: 1500 },
    { id: 13, name: "Camera", price: 30000 }
];


let cart = [];

function addToCart(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    } else {
        const product = products.find(product => product.id === id);

        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

function increaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    }

    updateCart();
}

function decreaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity--;

        if (item.quantity === 0) {
            cart = cart.filter(product => product.id !== id);
        }
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty">Your cart is empty.</p>';
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <strong>${item.name}</strong>
                    <p>₹${item.price} each</p>
                    <p>Subtotal: ₹${itemTotal}</p>
                </div>

                <div class="quantity">
                    <button onclick="decreaseQuantity(${item.id})">
                        −
                    </button>

                    <strong>${item.quantity}</strong>

                    <button onclick="increaseQuantity(${item.id})">
                        +
                    </button>
                </div>

                <button class="remove"
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;
    });

    totalElement.textContent = `₹${total}`;
    cartCount.textContent = count;
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(`Order total: ₹${total}\nThank you for shopping!`);
}

updateCart();