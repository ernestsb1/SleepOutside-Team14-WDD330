// spinner.js

export function showSpinner() {
  const spinner = document.getElementById('spinner');
  if (spinner) spinner.classList.remove('hidden');
}

export function hideSpinner() {
  const spinner = document.getElementById('spinner');
  if (spinner) spinner.classList.add('hidden');
}

// Load products with spinner
export async function loadProducts() {
  showSpinner(); // show spinner before loading

  try {
    const response = await fetch('/data/products.json');
    const products = await response.json();

    const container = document.getElementById('product-container');
    container.innerHTML = '';

    products.forEach(item => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Price: $${item.price}</p>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    console.error('Failed to load products', error);
  } finally {
    hideSpinner(); // hide spinner when done
  }
}
