const spinnerOverlay = document.getElementById('spinnerOverlay');
const productContainer = document.getElementById('productContainer');

export function showSpinner() {
  spinnerOverlay.classList.add('active');
}

export function hideSpinner() {
  spinnerOverlay.classList.remove('active');
}

export async function loadProducts() {
  showSpinner();
  try {
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch('/data/products.json');
    const products = await response.json();

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
