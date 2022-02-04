const variableElementsSelectors = 'body, .header-container, ' +
  '.logo, .nav-link, .lng-en, .lng-ru, .theme-switcher, ' +
  '.hamburger .line, .hire-button, .send-button, .section-title, ' +
  '.transparent-button, .play-button, .price, .contacts-container, ' +
  '.contacts-title, .contact-form, .message-form, .footer-link, ' +
  '.social-media-item, .nav, .hero-container, .section-title-text, ' +
  '.order-button, .rs-link-wrapper'; 
const variableElements = document.querySelectorAll(variableElementsSelectors);
const switcher = document.querySelector('.theme-switcher');

let isLight = false;

export function initChangingTheme() {
  switcher.addEventListener('click', changeTheme);
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);
}

function changeTheme() {
  variableElements.forEach(elem => elem.classList.toggle('light-theme'));
  isLight = document.querySelector('body').classList.contains('light-theme');
}

function setLocalStorage() {
  (isLight) ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark');
}

function getLocalStorage() {
  if(localStorage.getItem('theme') === 'light') {
    changeTheme();
  }
}