document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById('searchInput');
  const allToolCards = document.querySelectorAll('.tool-card');

  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();

    allToolCards.forEach(card => {
      const title = card.querySelector('.tool-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.tool-desc')?.textContent.toLowerCase() || '';
      const tags = card.getAttribute('data-tags')?.toLowerCase() || '';

      if (title.includes(searchText) || desc.includes(searchText) || tags.includes(searchText)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

