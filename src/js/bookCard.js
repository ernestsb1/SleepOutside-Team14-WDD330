export function renderBooks(container, books) {
  container.innerHTML = '';
  if (!books || books.length === 0) {
    container.innerHTML = '<p>No books found.</p>';
    return;
  }

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';

    card.innerHTML = `
      <img src="${book.thumbnail}" alt="${book.title}" />
      <h3>${book.title}</h3>
      <p>${book.authors.join(', ')}</p>
      <div class="actions">
        <a class="btn small" href="./pages/book.html?id=${encodeURIComponent(book.id)}">View</a>
        <button class="btn small outline save-btn" data-id="${book.id}">Save</button>
      </div>
    `;
    card.__book = book;
    container.appendChild(card);
  });
}

function escapeHtml(s=''){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
