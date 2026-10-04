const photoButtons = [...document.querySelectorAll('.gallery-open')];
const viewer = document.getElementById('photo-viewer');
const viewerImage = document.getElementById('viewer-image');
const viewerCount = document.getElementById('viewer-count');
const closeViewer = document.getElementById('viewer-close');
let currentPhoto = 0;
let trigger = null;
let previousOverflow = '';

function showPhoto(index) {
  currentPhoto = (index + photoButtons.length) % photoButtons.length;
  const photo = photoButtons[currentPhoto].querySelector('img');
  viewerImage.src = photo.getAttribute('src');
  viewerImage.alt = photo.alt;
  viewerCount.textContent = `Photo ${currentPhoto + 1} of ${photoButtons.length}`;
}

photoButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    trigger = button;
    showPhoto(index);
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    viewer.showModal();
    closeViewer.focus();
  });
});
closeViewer.addEventListener('click', () => viewer.close());
viewer.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow;
  trigger?.focus({ preventScroll: true });
});
document.getElementById('viewer-previous').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.getElementById('viewer-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(currentPhoto + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
// Clicking the empty space around a photo also closes the viewer.
viewer.addEventListener('click', event => {
  if (event.target === viewer || event.target.classList.contains('viewer-stage')) viewer.close();
});
