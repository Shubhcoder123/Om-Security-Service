const progressBar = document.getElementById('progress-bar');
const progressPercentage = document.getElementById('progress-percentage');

// Fast loading (1.5s)
let progress = 0;
const interval = setInterval(() => {
  progress += 20;
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);

    setTimeout(() => {
      window.location.href = "home.html";
    }, 500);
  }

  progressBar.style.width = progress + "%";
  progressPercentage.textContent = progress + "%";
}, 300);
