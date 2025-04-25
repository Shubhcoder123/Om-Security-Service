document.addEventListener("DOMContentLoaded", () => {
  const tagButtons = document.querySelectorAll(".tag");
  const allCards = document.querySelectorAll(".tool-card");
  const searchInput = document.getElementById("searchInput");

  // 🔍 Search + Tag Filtering
  function filterCards() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeTag = document.querySelector(".tag.active")?.innerText.toLowerCase() || "all";

    allCards.forEach(card => {
      const title = card.getAttribute("data-title")?.toLowerCase() || "";
      const tags = card.getAttribute("data-tags")?.toLowerCase() || "";

      const matchesSearch = title.includes(searchTerm) || tags.includes(searchTerm);
      const matchesTag = activeTag === "all" || tags.includes(activeTag);

      card.style.display = matchesSearch && matchesTag ? "block" : "none";
    });
  }

  // 🔘 Tag click event
  tagButtons.forEach(button => {
    button.addEventListener("click", () => {
      tagButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      filterCards();
    });
  });

  // ⌨️ Search input event
  if (searchInput) {
    searchInput.addEventListener("input", filterCards);
  }

  // 🌐 Open links externally (Cordova/WebView)
  document.querySelectorAll("a.use-btn").forEach(link => {
    link.addEventListener("click", function (e) {
      if (window.cordova || window.Android) {
        e.preventDefault();
        const url = this.href;
        window.open(url, "_system");
      }
    });
  });

  // 🎯 Center subtitle manually
  function centerSubtitle() {
    const subtitle = document.querySelector(".subtitle");
    if (subtitle) {
      subtitle.style.textAlign = "center";
      subtitle.style.marginTop = "10px";
    }
  }

  window.addEventListener("resize", centerSubtitle);
  centerSubtitle(); // Initial call
});
<script>
// Search functionality
const searchInput = document.getElementById('searchInput');
const allToolCards = document.querySelectorAll('.all-tools .tool-card, .popular-tools .tool-card, .tools-grid .tool-card');

searchInput.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();

  allToolCards.forEach(card => {
    const title = card.getAttribute('data-title')?.toLowerCase() || '';
    if (title.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Tag filtering
const tagButtons = document.querySelectorAll('.tag');

tagButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedTag = button.innerText.trim().toLowerCase();

    allToolCards.forEach(card => {
      const tags = card.getAttribute('data-tags')?.toLowerCase() || '';
      if (selectedTag === 'all' || tags.includes(selectedTag)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Highlight active tag
    tagButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

// Animate popular tools
const popularContainer = document.getElementById('popularTools');

setInterval(() => {
  const firstCard = popularContainer.firstElementChild;

  popularContainer.style.transition = 'transform 0.5s ease';
  popularContainer.style.transform = 'translateX(-270px)'; // Width + margin

  setTimeout(() => {
    popularContainer.style.transition = 'none';
    popularContainer.appendChild(firstCard);
    popularContainer.style.transform = 'translateX(0)';
  }, 500);
}, 3000);
</script>
// Tag filtering
const tagButtons = document.querySelectorAll('.tag');
const allCards = document.querySelectorAll('.tool-card');

tagButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedTag = button.innerText.trim().toLowerCase();

    allCards.forEach(card => {
      const tags = card.getAttribute('data-tags')?.toLowerCase() || '';
      const match = selectedTag === 'all' || tags.includes(selectedTag);
      if (match) {
        card.classList.remove('fade-out');
        card.classList.add('fade-in');
        card.style.display = 'block';
      } else {
        card.classList.remove('fade-in');
        card.classList.add('fade-out');
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });

    tagButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();

  allCards.forEach(card => {
    const title = card.getAttribute('data-title')?.toLowerCase() || '';
    const tags = card.getAttribute('data-tags')?.toLowerCase() || '';
    const match = title.includes(keyword) || tags.includes(keyword);
    if (match) {
      card.classList.remove('fade-out');
      card.classList.add('fade-in');
      card.style.display = 'block';
    } else {
      card.classList.remove('fade-in');
      card.classList.add('fade-out');
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
});
<script>
  const searchInput = document.getElementById("searchInput");
  const tags = document.querySelectorAll(".tag");
  const allToolCards = document.querySelectorAll(".tool-card");

  function filterTools() {
    const activeTag = document.querySelector(".tag.active")?.textContent.toLowerCase() || "all";
    const query = searchInput.value.trim().toLowerCase();

    allToolCards.forEach(card => {
      const title = card.dataset.title?.toLowerCase() || "";
      const tags = card.dataset.tags?.toLowerCase() || "";

      const matchesTag = activeTag === "all" || tags.includes(activeTag);
      const matchesSearch = title.includes(query);

      if (matchesTag && matchesSearch) {
        card.style.display = "block";
        requestAnimationFrame(() => card.classList.add("fade-in"));
      } else {
        card.classList.remove("fade-in");
        card.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", filterTools);

  tags.forEach(tag => {
    tag.addEventListener("click", () => {
      tags.forEach(t => t.classList.remove("active"));
      tag.classList.add("active");
      filterTools();
    });
  });

  // Initialize
  filterTools();
</script>

