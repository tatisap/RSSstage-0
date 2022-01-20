export function changeSeason () {
    const btnsParent = document.querySelector('.seasons-buttons');
    const portfolioBtns = document.querySelectorAll('.transparent-button');
    const portfolioImgs = document.querySelectorAll('.portfolio-img');

    btnsParent.addEventListener('click', () => {
        if ( event.target.classList.contains('transparent-button') ) {
            portfolioBtns.forEach( (button) => button.classList.remove('active') );
            event.target.classList.add('active');
            portfolioImgs.forEach( (img, index) => img.src = `./assets/img/portfolio-imgs/${event.target.dataset.season}/portfolio-img-${index}.jpg` );
        }
    });
}