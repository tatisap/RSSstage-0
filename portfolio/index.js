console.log ('1) Вёрстка соответствует макету. Ширина экрана 768px +48\n' +
'2) Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15\n' +
'3) На ширине экрана 768рх и меньше реализовано адаптивное меню +22');

const hamburgerButton = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const blackout = document.createElement('div');
document.body.append(blackout);

hamburgerButton.addEventListener('click', function () {
  hamburgerButton.classList.toggle('is-active');
  nav.classList.toggle('is-active');
  navList.classList.toggle('is-active');
  blackout.classList.toggle('blackout');
});

function closeMenu() {
  if (event.target.classList.contains('nav-link')) {
    hamburgerButton.classList.remove('is-active');
    nav.classList.remove('is-active');
    navList.classList.remove('is-active');  
    blackout.classList.remove('blackout');
  }
}
nav.addEventListener('click', closeMenu);