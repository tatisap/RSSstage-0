export function initButtonsEffect() {
  const buttons = document.querySelectorAll('.hire-button, .transparent-button, .order-button, .send-button');

  buttons.forEach(button => button.addEventListener('click', function (e) {
    const x = e.clientX;
    const y = e.clientY;

    const coords = button.getBoundingClientRect();
    const buttonTop = coords.y;
    const buttonLeft = coords.x;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    button.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
  }));
}