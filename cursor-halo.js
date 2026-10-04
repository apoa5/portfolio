(() => {
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const halo = document.createElement('div');
  halo.className = 'cursor-halo';
  halo.setAttribute('aria-hidden', 'true');
  document.body.append(halo);

  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let initialized = false;
  let frame = 0;
  let lastTime = 0;
  let idleTimer = 0;

  function hide() {
    halo.classList.remove('is-moving');
    clearTimeout(idleTimer);
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    initialized = false;
  }

  function animate(time) {
    // Time-based easing keeps the same soft follow on different refresh rates.
    const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
    const ease = 1 - Math.exp(-elapsed / 75);
    lastTime = time;
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    halo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (Math.hypot(targetX - x, targetY - y) > 0.1) {
      frame = requestAnimationFrame(animate);
    } else {
      frame = 0;
      lastTime = 0;
    }
  }

  window.addEventListener('pointermove', event => {
    if (!pointer.matches || reducedMotion.matches || event.pointerType !== 'mouse') return;
    // Ignore events that do not actually move the pointer.
    if (initialized && event.clientX === targetX && event.clientY === targetY) return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (!initialized) {
      x = targetX;
      y = targetY;
      halo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      initialized = true;
    }
    halo.classList.add('is-moving');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(hide, 600);
    if (!frame) frame = requestAnimationFrame(animate);
  }, { passive: true });

  window.addEventListener('pointerout', event => {
    if (event.relatedTarget === null) hide();
  });
  window.addEventListener('blur', hide);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hide();
  });
  pointer.addEventListener('change', hide);
  reducedMotion.addEventListener('change', hide);
})();
