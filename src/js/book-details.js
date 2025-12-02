// js/book-details.js
import { getBookById } from './api.js';
import { getLists, addToList } from './storage.js';
import { createRatingStars } from './rating-stars.js';

(async function() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const book = await getBookById(id);
  if (!book) return;

  // --- Populate book details ---
  document.getElementById("book-title").textContent = book.title;
  document.getElementById("book-author").textContent = book.authors.join(", ");
  document.getElementById("book-description").textContent = book.description;
  document.getElementById("book-thumbnail").src = book.thumbnail || "";

  // --- Rating stars ---
  createRatingStars(document.getElementById("rating-container"), book.rating || 0);

  // --- Reading lists dropdown ---
  const lists = getLists();
  const select = document.getElementById("reading-lists-select");
  select.innerHTML = Object.keys(lists).length
    ? Object.keys(lists).map(name => `<option value="${name}">${name}</option>`).join("")
    : '<option disabled>No lists yet</option>';

  // --- Add to selected list ---
  const addBtn = document.getElementById("add-to-list");
  addBtn.addEventListener("click", () => {
    const listName = select.value;
    if (!listName) return alert("Please select a reading list first.");
    addToList(listName, book);
    alert(`"${book.title}" added to "${listName}"`);
  });
})();
