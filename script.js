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

document.querySelectorAll('.project-category').forEach(button => {
  const dialog = document.getElementById(button.getAttribute('aria-controls'));
  const content = dialog.querySelector('.project-dialog-content');

  button.addEventListener('click', () => {
    dialog.showModal();
    content.scrollTop = 0;
  });

  let pressedBackdrop = false;
  const isBackdrop = target => target === dialog || target === content;
  dialog.addEventListener('pointerdown', event => {
    pressedBackdrop = isBackdrop(event.target);
  });
  dialog.addEventListener('click', event => {
    if (pressedBackdrop && isBackdrop(event.target)) dialog.close();
    pressedBackdrop = false;
  });
});

const systemsEngineerDuration = document.getElementById('systems-engineer-duration');
if (systemsEngineerDuration) {
  const start = systemsEngineerDuration.parentElement.querySelector('time');
  const [year, month] = start.dateTime.split('-').map(Number);
  const now = new Date();
  const months = Math.max(1, (now.getFullYear() - year) * 12 + now.getMonth() - month + 2);
  systemsEngineerDuration.textContent = months === 1 ? '1 month' : `${months} months`;
}
