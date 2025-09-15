document.querySelector('.enter-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
<button onclick="window.location.href='loading.html'">
  EXPLORE SERVICES
</button>

    // Create transition effect
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = '#0a1929';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 1s ease-in-out';
    
    
   
});