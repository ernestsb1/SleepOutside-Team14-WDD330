// src/js/lists.js
import { getLists, createList, getListBooks, removeFromList } from './storage.js';
import { createRatingStars } from './rating-stars.js';

const container = document.getElementById('lists-container');
const empty = document.getElementById('empty-lists');
const newListInput = document.getElementById('new-list-name');
const createBtn = document.getElementById('create-list-btn');

// Render all lists
function render() {
  const lists = getLists();
  container.innerHTML = '';
  const listNames = Object.keys(lists);
  if (!listNames.length) {
    empty.style.display = 'block';
    return;
  } else empty.style.display = 'none';

  listNames.forEach(listName => {
    const listDiv = document.createElement('div');
    listDiv.className = 'reading-list';
    listDiv.innerHTML = `<h3>${listName}</h3>
      <div class="list-books" id="list-${listName}"></div>`;
    container.appendChild(listDiv);

    const books = getListBooks(listName);
    const booksContainer = listDiv.querySelector(`#list-${listName}`);
    books.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book-card';
      bookDiv.innerHTML = `
        <img src="${book.thumbnail || ''}" alt="${book.title}">
        <h4>${book.title}</h4>
        <p class="author">${(book.authors || []).join(', ')}</p>
        <div class="list-actions">
          <a class="btn small" href="../pages/book.html?id=${encodeURIComponent(book.id)}">View</a>
          <button class="btn small danger remove" data-list="${listName}" data-id="${book.id}">Remove</button>
          <div class="rating-container" id="rating-${book.id}"></div>
        </div>
      `;
      booksContainer.appendChild(bookDiv);
      const ratingDiv = bookDiv.querySelector(`#rating-${book.id}`);
      createRatingStars(ratingDiv, book.id);
    });
  });

  // Attach remove buttons
  container.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromList(btn.dataset.list, btn.dataset.id);
      render();
    });
  });
}

// Create new list
createBtn.addEventListener('click', () => {
  const name = newListInput.value.trim();
  if (!name) return alert("Please enter a list name.");
  createList(name);
  newListInput.value = '';
  render();
});

render();
