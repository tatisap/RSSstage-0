const hamburgerButton = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-list');
const blackout = document.createElement('div');

export function initAdaptiveMenu() {
  document.body.append(blackout);

  hamburgerButton.addEventListener('click', switchMenu);

  nav.addEventListener('click', closeMenu);
}

function switchMenu() {
  hamburgerButton.classList.toggle('is-active');
  nav.classList.toggle('is-active');
  navList.classList.toggle('is-active');
  blackout.classList.toggle('blackout');
}

function closeMenu(event) {
  if (event.target.classList.contains('nav-link')) {
    hamburgerButton.classList.remove('is-active');
    nav.classList.remove('is-active');
    navList.classList.remove('is-active');  
    blackout.classList.remove('blackout');
  }
}
