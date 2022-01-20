export function initMenu() {
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
      blackout.classList.toggle('blackout');
    }
  }
  nav.addEventListener('click', closeMenu);
}
