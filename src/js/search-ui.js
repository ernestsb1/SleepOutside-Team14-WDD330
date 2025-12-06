// ==================== IMPORTS ====================
import { searchBooks } from './api.js';
import { addToList } from './storage.js'; // make sure this exists in storage.js
import { renderBooks } from './bookCard.js';

// ==================== DOM ITEMS ====================
const trendingBtn = document.getElementById("toggle-featured");
const allBtn = document.getElementById("toggle-all");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const trendingSection = document.getElementById("featured-section");
const trendingContainer = document.getElementById("featured-container");

const allSection = document.getElementById("all-section");
const booksContainer = document.getElementById("results-container");

// Default list name for saved books
const DEFAULT_LIST = "Saved Books";

// ==================== RENDER CARDS WRAPPER ====================
function renderBooksWithSave(container, books) {
  container.innerHTML = '';

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = "book-card";

    card.innerHTML = `
      <img src="${book.thumbnail || ''}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>${(book.authors || []).join(', ')}</p>
      <div class="actions">
        <a class="btn small" href="./pages/book.html?id=${encodeURIComponent(book.id)}">View</a>
        <button class="btn small save-btn">Save</button>
      </div>
    `;

    // Save button works now
    card.querySelector('.save-btn').addEventListener('click', () => {
      addToList(DEFAULT_LIST, book);
      alert(`"${book.title}" added to "${DEFAULT_LIST}"`);
    });

    container.appendChild(card);
  });
}

// ==================== TOGGLE FEATURED ====================
trendingBtn.addEventListener("click", async () => {
  const isVisible = trendingSection.style.display === "block";
  trendingSection.style.display = isVisible ? "none" : "block";
  if (!isVisible) {
    const books = await searchBooks(""); // default query
    const featured = books.filter(b => b.trending);
    renderBooksWithSave(trendingContainer, featured);
  }
});

// ==================== TOGGLE ALL ====================
allBtn.addEventListener("click", async () => {
  const isVisible = allSection.style.display === "block";
  allSection.style.display = isVisible ? "none" : "block";
  if (!isVisible) {
    const books = await searchBooks("");
    renderBooksWithSave(booksContainer, books);
  }
});

// ==================== SEARCH HANDLER ====================
async function handleSearch() {
  const query = searchInput.value.trim();
  const books = await searchBooks(query);
  const featured = books.filter(b => b.trending);
  renderBooksWithSave(trendingContainer, featured);
  renderBooksWithSave(booksContainer, books);
  trendingSection.style.display = "block";
  allSection.style.display = "block";
}

// ==================== EVENT LISTENERS ====================
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keyup", e => { if(e.key === "Enter") handleSearch(); });
