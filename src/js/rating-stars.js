export function createRatingStars(container, rating = 0) {
  container.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.textContent = i <= rating ? '★' : '☆';
    star.style.cursor = 'pointer';
    star.addEventListener('click', () => {
      createRatingStars(container, i);
    });
    container.appendChild(star);
  }
}
