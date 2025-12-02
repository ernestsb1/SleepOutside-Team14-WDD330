  import { searchBooks } from './api.js';
import { renderBooks } from './bookCard.js';

const trendingBtn = document.getElementById("toggle-featured");
const allBtn = document.getElementById("toggle-all");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const trendingSection = document.getElementById("featured-section");
const trendingContainer = document.getElementById("featured-container");

const allSection = document.getElementById("all-section");
const booksContainer = document.getElementById("results-container");

// Toggle Featured
trendingBtn.addEventListener("click", async () => {
  const isVisible = trendingSection.style.display === "block";
  trendingSection.style.display = isVisible ? "none" : "block";
  if (!isVisible) {
    const books = await searchBooks(""); // default query
    const featured = books.filter(b => b.trending);
    renderBooks(trendingContainer, featured);
  }
});

// Toggle All
allBtn.addEventListener("click", async () => {
  const isVisible = allSection.style.display === "block";
  allSection.style.display = isVisible ? "none" : "block";
  if (!isVisible) {
    const books = await searchBooks("");
    renderBooks(booksContainer, books);
  }
});

// Search
async function handleSearch() {
  const query = searchInput.value.trim();
  const books = await searchBooks(query);
  const featured = books.filter(b => b.trending);
  renderBooks(trendingContainer, featured);
  renderBooks(booksContainer, books);
  trendingSection.style.display = "block";
  allSection.style.display = "block";
}

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keyup", e => { if(e.key === "Enter") handleSearch(); });
