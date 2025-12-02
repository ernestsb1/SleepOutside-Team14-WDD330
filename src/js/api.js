const BASE = 'https://www.googleapis.com/books/v1';

export async function searchBooks(query, max = 20) {
  const q = encodeURIComponent(query || 'subject:fiction');
  const res = await fetch(`${BASE}/volumes?q=${q}&maxResults=${max}`);
  if (!res.ok) throw new Error('Network error');
  const json = await res.json();
  return (json.items || []).map(mapVolume);
}

export async function getBookById(volumeId) {
  if (!volumeId) return null;
  const res = await fetch(`${BASE}/volumes/${encodeURIComponent(volumeId)}`);
  if (!res.ok) return null;
  const json = await res.json();
  return mapVolume(json);
}

function mapVolume(v) {
  if (!v) return null;
  const info = v.volumeInfo || {};
  return {
    id: v.id,
    title: info.title || 'Untitled',
    authors: info.authors || [],
    description: info.description || '',
    thumbnail: (info.imageLinks && (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail)) || '',
    publisher: info.publisher || '',
    publishedDate: info.publishedDate || '',
    pageCount: info.pageCount || null,
    categories: info.categories || [],
    trending: Math.random() < 0.3 // random for demo
  };
}
