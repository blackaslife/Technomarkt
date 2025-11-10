const range = document.querySelector('.range');
const scale = document.querySelector('.scale');
const minToggle = document.querySelector('.min-toggle');
const maxToggle = document.querySelector('.max-toggle');
const inputs = document.querySelectorAll('.range-value');

let rangeWidth = 180; // ширина шкали, як у твоєму inline-style
let min = 0;
let max = 30000;
let minValue = 0;
let maxValue = 30000;

// Початкові позиції бігунків
minToggle.style.left = '0px';
maxToggle.style.left = rangeWidth + 'px';

function updateScale() {
  const minLeft = parseInt(minToggle.style.left);
  const maxLeft = parseInt(maxToggle.style.left);
  const scaleWidth = maxLeft - minLeft;
  scale.style.left = minLeft + 'px';
  scale.style.width = scaleWidth + 'px';
}

// Функція оновлення значень при русі
function updateValues() {
  const minLeft = parseInt(minToggle.style.left);
  const maxLeft = parseInt(maxToggle.style.left);
  minValue = Math.round((minLeft / rangeWidth) * max);
  maxValue = Math.round((maxLeft / rangeWidth) * max);
  inputs[0].value = minValue;
  inputs[1].value = maxValue;
}

function startDrag(toggle, event) {
  event.preventDefault();
  const startX = event.clientX;
  const startLeft = parseInt(toggle.style.left);

  function onMouseMove(e) {
    const delta = e.clientX - startX;
    let newLeft = startLeft + delta;

    // Обмеження межами
    if (toggle === minToggle) {
      newLeft = Math.max(0, Math.min(newLeft, parseInt(maxToggle.style.left) - 10));
    } else {
      newLeft = Math.min(rangeWidth, Math.max(newLeft, parseInt(minToggle.style.left) + 10));
    }

    toggle.style.left = newLeft + 'px';
    updateScale();
    updateValues();
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

minToggle.addEventListener('mousedown', e => startDrag(minToggle, e));
maxToggle.addEventListener('mousedown', e => startDrag(maxToggle, e));

// Синхронізація при введенні вручну
inputs[0].addEventListener('input', e => {
  minValue = parseInt(e.target.value) || 0;
  if (minValue < 0) minValue = 0;
  if (minValue > maxValue) minValue = maxValue;
  const pos = (minValue / max) * rangeWidth;
  minToggle.style.left = pos + 'px';
  updateScale();
});

inputs[1].addEventListener('input', e => {
  maxValue = parseInt(e.target.value) || max;
  if (maxValue > max) maxValue = max;
  if (maxValue < minValue) maxValue = minValue;
  const pos = (maxValue / max) * rangeWidth;
  maxToggle.style.left = pos + 'px';
  updateScale();
});

updateScale();
updateValues();