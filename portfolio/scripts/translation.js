const i18Obj = {
  'en': {
    'skills': 'Skills',
    'portfolio': 'Portfolio',
    'video': 'Video',
    'price': 'Price',
    'contacts': 'Contacts',
    'hero-title': 'Alexa Rise',
    'hero-text': 'Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise',
    'hire': 'Hire me',
    'skill-title-1': 'Digital photography',
    'skill-text-1': 'High-quality photos in the studio and on the nature',
    'skill-title-2': 'Video shooting',
    'skill-text-2': 'Capture your moments so that they always stay with you',
    'skill-title-3': 'Rotouch',
    'skill-text-3': 'I strive to make photography surpass reality',
    'skill-title-4': 'Audio',
    'skill-text-4': 'Professional sounds recording for video, advertising, portfolio',
    'winter': 'Winter',
    'spring': 'Spring',
    'summer': 'Summer',
    'autumn': 'Autumn',
    'price-desc-1-span-1': 'One location',
    'price-desc-1-span-2': '120 photos in color',
    'price-desc-1-span-3': '12 photos in retouch',
    'price-desc-1-span-4': 'Readiness 2-3 weeks',
    'price-desc-1-span-5': 'Make up, visage',
    'price-desc-2-span-1': 'One or two locations',
    'price-desc-2-span-2': '200 photos in color',
    'price-desc-2-span-3': '20 photos in retouch',
    'price-desc-2-span-4': 'Readiness 1-2 weeks',
    'price-desc-2-span-5': 'Make up, visage',
    'price-desc-3-span-1': 'Three locations or more',
    'price-desc-3-span-2': '300 photos in color',
    'price-desc-3-span-3': '50 photos in retouch',
    'price-desc-3-span-4': 'Readiness 1 week',
    'price-desc-3-span-5': 'Make up, visage, hairstyle',
    'order': 'Order shooting',
    'contact-me': 'Contact me',
    'send-message': 'Send message'
  },
  'ru': {
    'skills': 'Навыки',
    'portfolio': 'Портфолио',
    'video': 'Видео',
    'price': 'Цены',
    'contacts': 'Контакты',
    'hero-title': 'Алекса Райс',
    'hero-text': 'Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом',
    'hire': 'Пригласить',
    'skill-title-1': 'Фотография',
    'skill-text-1': 'Высококачественные фото в студии и на природе',
    'skill-title-2': 'Видеосъемка',
    'skill-text-2': 'Запечатлите лучшие моменты, чтобы они всегда оставались с вами',
    'skill-title-3': 'Ретушь',
    'skill-text-3': 'Я стремлюсь к тому, чтобы фотография превосходила реальность',
    'skill-title-4': 'Звук',
    'skill-text-4': 'Профессиональная запись звука для видео, рекламы, портфолио',
    'winter': 'Зима',
    'spring': 'Весна',
    'summer': 'Лето',
    'autumn': 'Осень',
    'price-desc-1-span-1': 'Одна локация',
    'price-desc-1-span-2': '120 цветных фото',
    'price-desc-1-span-3': '12 отретушированных фото',
    'price-desc-1-span-4': 'Готовность через 2-3 недели',
    'price-desc-1-span-5': 'Макияж, визаж',
    'price-desc-2-span-1': 'Одна-две локации',
    'price-desc-2-span-2': '200 цветных фото',
    'price-desc-2-span-3': '20 отретушированных фото',
    'price-desc-2-span-4': 'Готовность через 1-2 недели',
    'price-desc-2-span-5': 'Макияж, визаж',
    'price-desc-3-span-1': 'Три локации и больше',
    'price-desc-3-span-2': '300 цветных фото',
    'price-desc-3-span-3': '50 отретушированных фото',
    'price-desc-3-span-4': 'Готовность через 1 неделю',
    'price-desc-3-span-5': 'Макияж, визаж, прическа',
    'order': 'Заказать съемку',
    'contact-me': 'Свяжитесь со мной',
    'send-message': 'Отправить'
  }
}
const languagesParent = document.querySelector('.switch-lng');
const languages = document.querySelectorAll('[data-lng]');

let currentLanguage = localStorage.getItem('lang');

export function initTranslation () {
  languagesParent.addEventListener('click', translate);
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);
}
  
function translate(event) {
  currentLanguage = event.target.dataset.lng;
  getTranslation(currentLanguage);
  languages.forEach( (language) => language.classList.remove('active') );
  event.target.classList.add('active');
}

function getTranslation(lng) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => element.textContent = i18Obj[lng][element.dataset.i18n]);
}

function setLocalStorage() {
  localStorage.setItem('lang', currentLanguage);
}

function getLocalStorage() {
  if(localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslation(lang);
    languages.forEach( (language) => (language.dataset.lng === lang) ? language.classList.add('active') : language.classList.remove('active') );
  }
}


