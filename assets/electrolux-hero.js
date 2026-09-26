// Page-local progressive enhancement: no video request on small screens or reduced motion.
(() => {
  const video = document.querySelector('.ep-hero-video');
  if (!video) return;
  const media = video.closest('.ep-hero-media');
  const allowed = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
  const connection = navigator.connection;
  let attempt = 0;
  function stop() {
    media.classList.remove('is-playing');
    video.pause();
    if (video.hasAttribute('src')) {
      video.removeAttribute('src');
      video.load();
    }
  }
  async function update() {
    const current = ++attempt;
    if (!allowed.matches || connection?.saveData) { stop(); return; }
    video.muted = true;
    if (!video.hasAttribute('src')) video.src = video.dataset.src;
    try {
      await video.play();
      if (current === attempt && allowed.matches) media.classList.add('is-playing');
    } catch (_) {
      if (current === attempt) stop(); // Keep the real image if autoplay or loading fails.
    }
  }
  video.addEventListener('error', () => media.classList.remove('is-playing'));
  allowed.addEventListener('change', update);
  connection?.addEventListener('change', update);
  update();
})();
