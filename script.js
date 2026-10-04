const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
function updateThemeButton() {
  const isLight = root.dataset.theme === 'light';
  themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
}
updateThemeButton();
themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('theme', root.dataset.theme); } catch {}
  updateThemeButton();
});
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('nav a')].filter(link =>
    link.getAttribute('href').startsWith('#')
  );
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  links.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
}
