const buttonsParent = document.querySelector('.seasons-buttons');
const portfolioButtons = document.querySelectorAll('.transparent-button');
const portfolioImages = document.querySelectorAll('.portfolio-img');

export function initChangingSeason() {
  buttonsParent.addEventListener('click', changeSeason);
} 
    
function changeSeason(event) {
  if ( event.target.classList.contains('transparent-button') ) {
    portfolioButtons.forEach( (button) => button.classList.remove('active') );
    event.target.classList.add('active');
    portfolioImages.forEach( (img, index) => img.src = `./assets/img/portfolio-imgs/${event.target.dataset.season}/portfolio-img-${index}.jpg` );
  }
}

export function preloadImages(season) {
  for(let i = 0; i <= 5; i++) {
    const img = new Image();
    img.src = `./assets/img/portfolio-imgs/${season}/portfolio-img-${i}.jpg`;
  }
}