import { loadHeaderFooter } from "./utils.mjs";

// Initialize header and footer
loadHeaderFooter();

// Spinner and product loading logic
const spinnerOverlay = document.getElementById('spinnerOverlay');
const productContainer = document.getElementById('productContainer');

// Show spinner overlay
function showSpinner() {
  spinnerOverlay.classList.add('active');
}

// Hide spinner overlay
function hideSpinner() {
  spinnerOverlay.classList.remove('active');
}

// Load products from JSON and display them
async function loadProducts() {
  showSpinner();

  try {
    // Simulate loading delay for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch('/data/products.json');
    const products = await response.json();

    // Clear previous products
    productContainer.innerHTML = '';

    // Create product cards dynamically
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <p>${product.description}</p>
      `;
      productContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading products:', error);
  } finally {
    hideSpinner();
  }
}

// Initialize product loading on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});
