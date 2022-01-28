export function initButtonsEffects() {
  const buttons = document.querySelectorAll('.hire-button, .transparent-button, .order-button, .send-button');

  buttons.forEach(button => button.addEventListener('click', getCircleEffect));
}

function getCircleEffect(event) {
  const x = event.clientX;
  const y = event.clientY;

  const buttonCoords = event.target.getBoundingClientRect();
  const buttonTop = buttonCoords.y;
  const buttonLeft = buttonCoords.x;

  const xInside = x - buttonLeft;
  const yInside = y - buttonTop;

  const circle = document.createElement('span');
  circle.classList.add('circle');
  circle.style.top = yInside + 'px';
  circle.style.left = xInside + 'px';

  event.target.appendChild(circle);

  setTimeout(() => circle.remove(), 500);
}