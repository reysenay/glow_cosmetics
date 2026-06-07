/*
    STAGE 6 - JavaScript and DOM
    This file contains the product catalogue, category filters, search, product details, and cart actions.
    The code is divided into simple functions so it can be explained during the presentation.
*/
// Variables that store the cart items and the selected category.
let cart = [];
let selectedCategory = "All";
let selectedProductForModal = null;
// Main HTML elements with IDs are selected with getElementById.
const productGrid = document.getElementById("product-grid");
const categoryButtons = document.getElementById("category-buttons");
const catalogTitle = document.getElementById("catalog-title");
const productCount = document.getElementById("product-count");
const searchInput = document.getElementById("search-input");
const selectedProduct = document.getElementById("selected-product");
const cartList = document.getElementById("cart-list");
const totalPriceText = document.getElementById("total-price");
const clearCartButton = document.getElementById("clear-cart");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const sendMessageButton = document.getElementById("send-message");
const formFeedback = document.getElementById("form-feedback");
// Required elements for the product detail modal.
const productModal = document.getElementById("product-modal");
const closeModalButton = document.getElementById("close-modal");
const modalImage = document.getElementById("modal-image");
const modalCategory = document.getElementById("modal-category");
const modalName = document.getElementById("modal-name");
const modalDescription = document.getElementById("modal-description");
const modalHighlights = document.getElementById("modal-highlights");
const modalDetails = document.getElementById("modal-details");
const modalPrice = document.getElementById("modal-price");
const modalAddCartButton = document.getElementById("modal-add-cart");
// Set is used to collect category names without duplicates.
function getCategories() {
    const categorySet = new Set();

    products.forEach(function(product) {
        categorySet.add(product.category);
    });

    return ["All"].concat(Array.from(categorySet));
}
// Creates the category buttons on the left side.
function renderCategoryButtons() {
    categoryButtons.innerHTML = "";

    getCategories().forEach(function(category) {
        const button = document.createElement("button");
        button.className = "category-button";
        button.textContent = category;
        // The active category is shown with a different color.
        if (category === selectedCategory) {
            button.classList.add("active");
        }
        // When the user clicks a category, products are rendered again.
        button.addEventListener("click", function() {
            selectedCategory = category;
            renderCategoryButtons();
            renderProducts();
        });

        categoryButtons.appendChild(button);
    });
}
// Filters products according to the selected category and search text.
function getFilteredProducts() {
    const searchText = searchInput.value.toLowerCase();

    return products.filter(function(product) {
        const categoryMatches = selectedCategory === "All" || product.category === selectedCategory;
        const textMatches =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText);

        return categoryMatches && textMatches;
    });
}
// Prints product cards on the page.
function renderProducts() {
    const filteredProducts = getFilteredProducts();
    productGrid.innerHTML = "";

    catalogTitle.textContent = selectedCategory === "All" ? "All Products" : selectedCategory;
    productCount.textContent = filteredProducts.length + " products shown from " + products.length + " total products.";

    filteredProducts.forEach(function(product) {
        const card = document.createElement("article");
        card.className = "product-card";

        /*
            The card content is written with innerHTML.
            Product information comes from the list in products.js.
        */
        card.innerHTML =
            '<img src="' + product.image + '" alt="' + product.name + '">' +
            '<p class="eyebrow">' + product.category + '</p>' +
            '<h3>' + product.name + '</h3>' +
            '<p>' + product.description + '</p>' +
            '<p class="price-text">' + product.price + ' TL</p>' +
            '<div class="product-actions">' +
                '<button type="button" class="details-button">Details</button>' +
                '<button type="button" class="cart-button">Add</button>' +
            '</div>';
        // querySelector is used for class selection inside each card.
        card.querySelector(".details-button").addEventListener("click", function() {
            openProductModal(product);
        });

        card.querySelector(".cart-button").addEventListener("click", function() {
            addToCart(product);
        });

        productGrid.appendChild(card);
    });
}
// Opens the product detail modal.
function openProductModal(product) {
    selectedProductForModal = product;

    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalCategory.textContent = product.category;
    modalName.textContent = product.name;
    modalDescription.textContent = product.description;
    modalDetails.textContent = product.details;
    modalPrice.textContent = product.price;
    renderModalHighlights(product);

    productModal.classList.remove("hidden");
}
// Creates the small information buttons inside the detail modal.
function renderModalHighlights(product) {
    modalHighlights.innerHTML = "";

    const highlights = [
        product.category,
        product.brand,
        product.source,
        product.price + " TL"
    ];

    highlights.forEach(function(highlight) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = highlight;
        modalHighlights.appendChild(button);
    });
}
// Closes the product detail modal.
function closeProductModal() {
    productModal.classList.add("hidden");
}
// Adds the product to the cart and updates the cart display.
function addToCart(product) {
    cart.push(product);
    selectedProduct.textContent = "Last selected product: " + product.name;
    renderCart();
}
// Prints the cart list and total price on the screen.
function renderCart() {
    let totalPrice = 0;
    cartList.innerHTML = "";

    cart.forEach(function(product) {
        const item = document.createElement("li");
        item.textContent = product.name + " - " + product.price + " TL";
        cartList.appendChild(item);
        totalPrice = totalPrice + product.price;
    });

    totalPriceText.textContent = totalPrice;
}
// Shows a short message on the page when the contact form is submitted.
function sendContactMessage() {
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    if (nameValue === "" || emailValue === "" || messageValue === "") {
        formFeedback.textContent = "Please fill in name, email, and message.";
        formFeedback.classList.add("warning");
        return;
    }

    formFeedback.textContent = "Thank you, " + nameValue + ". Your message has been received.";
    formFeedback.classList.remove("warning");
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
}
// Products are filtered again whenever the search input changes.
searchInput.addEventListener("input", function() {
    renderProducts();
});
// Clears the shopping cart.
clearCartButton.addEventListener("click", function() {
    cart = [];
    selectedProduct.textContent = "No product selected yet.";
    renderCart();
});
// The Add to Cart button inside the modal adds the selected product to the cart.
modalAddCartButton.addEventListener("click", function() {
    if (selectedProductForModal !== null) {
        addToCart(selectedProductForModal);
        closeProductModal();
    }
});

closeModalButton.addEventListener("click", closeProductModal);
sendMessageButton.addEventListener("click", sendContactMessage);
// If the user clicks the dark background, the detail modal closes.
productModal.addEventListener("click", function(event) {
    if (event.target === productModal) {
        closeProductModal();
    }
});
// When the page first opens, categories, products, and cart are rendered.
renderCategoryButtons();
renderProducts();
renderCart();
