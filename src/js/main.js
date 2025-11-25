import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

import { loadProducts } from './spinner.js';

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});
