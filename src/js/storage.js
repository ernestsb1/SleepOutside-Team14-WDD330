// js/storage.js — FINAL CLEAN VERSION

// ===== Keys for localStorage =====
const SINGLE_LIST_KEY = 'be_reading_list_v1';   // One global reading list
const RATINGS_KEY     = 'be_ratings_v1';        // User ratings
const PROGRESS_KEY    = 'be_progress_v1';       // Pages read
const MULTI_LIST_KEY  = 'be_lists_v1';          // Multiple lists system



// ===============================================================
// =============== 1. SINGLE DEFAULT READING LIST ================
// ===============================================================
export function getReadingList() {
  try { 
    return JSON.parse(localStorage.getItem(SINGLE_LIST_KEY)) || [];
  } catch {
    return [];
  }
}

export function addToReadingList(book) {
  if (!book || !book.id) return;

  const list = getReadingList();
  const exists = list.some(b => b.id === book.id);
  if (exists) return;

  const record = {
    id: book.id,
    title: book.title,
    authors: book.authors || [],
    thumbnail: book.thumbnail || "",
    description: book.description || ""
  };

  list.push(record);
  localStorage.setItem(SINGLE_LIST_KEY, JSON.stringify(list));
}

export function removeFromReadingList(id) {
  const list = getReadingList().filter(b => b.id !== id);
  localStorage.setItem(SINGLE_LIST_KEY, JSON.stringify(list));
}



// ===============================================================
// ==================== 2. USER RATING SYSTEM ====================
// ===============================================================
export function getRatingMap() {
  try {
    return JSON.parse(localStorage.getItem(RATINGS_KEY)) || {};
  } catch {
    return {};
  }
}

export function getRating(bookId) {
  const map = getRatingMap();
  return map[bookId] || 0;
}

export function setRating(bookId, value) {
  const map = getRatingMap();
  map[bookId] = value;
  localStorage.setItem(RATINGS_KEY, JSON.stringify(map));
}



// ===============================================================
// ================ 3. READING PROGRESS TRACKER ==================
// ===============================================================
export function getProgressMap() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  } catch {
    return {};
  }
}

export function getProgress(bookId) {
  const map = getProgressMap();
  return map[bookId] || 0;
}

export function setProgress(bookId, pagesRead) {
  const map = getProgressMap();
  map[bookId] = pagesRead;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
}



// ===============================================================
// ================ 4. MULTIPLE READING LISTS ====================
// ===============================================================
export function getLists() {
  try {
    const lists = JSON.parse(localStorage.getItem(MULTI_LIST_KEY)) || {};
    
    // Automatically create a default list if none exists
    if (Object.keys(lists).length === 0) {
      lists['My Reading List'] = [];
      localStorage.setItem(MULTI_LIST_KEY, JSON.stringify(lists));
    }

    return lists;
  } catch {
    const lists = { 'My Reading List': [] };
    localStorage.setItem(MULTI_LIST_KEY, JSON.stringify(lists));
    return lists;
  }
}

// Create a new list by name
export function createList(name) {
  const lists = getLists();
  if (!lists[name]) {
    lists[name] = [];
    saveLists(lists);
  }
}

// Add book into a specific list
export function addToList(listName, book) {
  const lists = getLists();
  if (!lists[listName]) lists[listName] = [];

  const exists = lists[listName].some(b => b.id === book.id);
  if (!exists) {
    lists[listName].push(book);
    saveLists(lists);
  }
}

// Remove a book from a specific list
export function removeFromList(listName, id) {
  const lists = getLists();
  if (!lists[listName]) return;

  lists[listName] = lists[listName].filter(b => b.id !== id);
  saveLists(lists);
}

// Get all books from a list
export function getListBooks(listName) {
  const lists = getLists();
  return lists[listName] || [];
}
