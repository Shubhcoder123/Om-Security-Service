// ✅ FAVORITE ICON FEATURE
document.addEventListener("DOMContentLoaded", () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const toolCards = Array.from(document.querySelectorAll(".tool-card"));

  toolCards.forEach(card => {
    const title = card.getAttribute("data-title");
    const icon = card.querySelector(".favorite-icon");

    if (!icon || !title) return;

    if (favorites.includes(title)) {
      icon.classList.add("favorited");
      icon.textContent = "❤️";
      card.parentNode.prepend(card); // Move favorite to top
    }
  });

  // ✅ SEARCH FUNCTIONALITY
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      toolCards.forEach(card => {
        const title = card.getAttribute("data-title") || "";
        const desc = card.querySelector(".tool-desc")?.textContent || "";
        const matches = title.toLowerCase().includes(searchTerm) || desc.toLowerCase().includes(searchTerm);
        card.style.display = matches ? "block" : "none";
      });
    });
  }
});

function toggleFavorite(title) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const card = document.querySelector(`.tool-card[data-title="${title}"]`);
  const icon = card.querySelector(".favorite-icon");

  if (favorites.includes(title)) {
    favorites = favorites.filter(t => t !== title);
    icon.classList.remove("favorited");
    icon.textContent = "♡";
  } else {
    favorites.push(title);
    icon.classList.add("favorited");
    icon.textContent = "❤️";
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  location.reload(); // Refresh to reorder
}
