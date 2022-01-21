export function theme () {
  const variableElementsSelectors = 'body, .header-container, ' +
  '.logo, .nav-link, .lng-en, .lng-ru, .theme-switcher, ' +
  '.hamburger .line, .hire-button, .send-button, .section-title, ' +
  '.transparent-button, .play-button, .price, .contacts-container, ' +
  '.contacts-title, .contact-form, .message-form, .footer-link, ' +
  '.social-media-item, .nav, .hero-container, .section-title-text, ' +
  '.order-button'; 
  const variableElements = document.querySelectorAll(variableElementsSelectors);

  const switcher = document.querySelector('.theme-switcher');

  switcher.addEventListener('click', changeTheme);

  function changeTheme() {
    variableElements.forEach(elem => {
        elem.classList.toggle('light-theme');
    });
  }
}