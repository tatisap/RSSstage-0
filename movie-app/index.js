const searchForm = document.querySelector('.search-form');
const mainContainer = document.querySelector('.main-container');
const closeButton = document.querySelector('.no-value button.close');

async function getPopularMovies() {
  const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=fcbdf426eda6fb1641d20038dd9e99f5&language=en-US&page=1';
  const popularMoviesRes = await fetch(popularMoviesUrl);
  const popularMoviesData = await popularMoviesRes.json();

  const configRes = await fetch('https://api.themoviedb.org/3/configuration?api_key=fcbdf426eda6fb1641d20038dd9e99f5');
  const configData = await configRes.json();

  addCards(popularMoviesData);
  addPosters(popularMoviesData, configData);
  addTitles(popularMoviesData);
  addRatings(popularMoviesData);
  addOverviews(popularMoviesData);
}

async function getDataByQuery(event) {
  event.preventDefault();

  if (event.target.query.value ==='') {
    switchMessage(event);
    return;
  }

  mainContainer.innerHTML = '';
  document.body.classList.remove('all-height');

  const query = event.target.query.value;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=fcbdf426eda6fb1641d20038dd9e99f5&language=en-US&query=${query}&page=1&include_adult=false`;
  const foundMoviesRes = await fetch(searchUrl);
  const foundMoviesData = await foundMoviesRes.json();

  const configRes = await fetch('https://api.themoviedb.org/3/configuration?api_key=fcbdf426eda6fb1641d20038dd9e99f5');
  const configData = await configRes.json();

  if (foundMoviesData.total_results === 0) {
    addNoResultsElement();
    document.body.classList.add('all-height');
  } else {
    addCards(foundMoviesData);
    addPosters(foundMoviesData, configData);
    addTitles(foundMoviesData);
    addRatings(foundMoviesData);
    addOverviews(foundMoviesData);
  }
}

function addCards(data) {
  for (let i = 0; i < data.results.length; i++) {
    mainContainer.append( createNewMovieCard() );
  }
}

function addPosters(data, config) {
  const posters = document.querySelectorAll('.movie-poster');
  for (let i = 0; i < posters.length; i++) { 
    posters[i].style.display = 'inline';

    if ( data.results[i].poster_path === null ) {
      posters[i].style.display = 'none';
    } else {
      posters[i].src = config.images.secure_base_url + config.images.backdrop_sizes[0] + data.results[i].poster_path;
      posters[i].alt = data.results[i].title;
    }
  }
}

function addTitles(data) {
  const titles = document.querySelectorAll('.movie-title');
  for (let i = 0; i < titles.length; i++) { 
    titles[i].textContent = data.results[i].title;
  }
}

function addRatings(data) {
  const ratings = document.querySelectorAll('.movie-rating');
  for (let i = 0; i < ratings.length; i++) { 
    ratings[i].textContent = data.results[i].vote_average;

    (data.results[i].vote_average >= 7) ? ratings[i].classList.add('green-rating') :
    (data.results[i].vote_average < 7 && data.results[i].vote_average >= 5) ? ratings[i].classList.add('orange-rating') :
    ratings[i].classList.add('red-rating');
  }
}

function addOverviews(data) {
  const overviews = document.querySelectorAll('.movie-overview');
  for (let i = 0; i < overviews.length; i++) { 
    overviews[i].textContent = data.results[i].overview;
  }
}

function createNewMovieCard() {
  let card = document.createElement('div');
  card.classList.add('movie-card');

  let posterWrapper = document.createElement('div');
  posterWrapper.classList.add('movie-poster-wrapper');

  let info = document.createElement('div');
  info.classList.add('movie-info');

  let overview = document.createElement('div');
  overview.classList.add('movie-overview');

  let showButton = document.createElement('button');
  showButton.classList.add('show-overview');
  showButton.textContent = 'Show overview';
  showButton.addEventListener('click', switchOverview);
  
  card.append(posterWrapper);
  card.append(info);
  card.append(overview);
  card.append(showButton);

  let poster = document.createElement('img');
  poster.classList.add('movie-poster');

  posterWrapper.append(poster);

  let title = document.createElement('h2');
  title.classList.add('movie-title');

  let rating = document.createElement('div');
  rating.classList.add('movie-rating');

  info.append(title);
  info.append(rating);

  return card;
}

function switchOverview(event) {
  let overview = event.target.parentElement.querySelector('.movie-overview');
  overview.classList.toggle('open');
  event.target.textContent = (event.target.textContent === 'Show overview') ? 'Close overview' : 'Show overview';
}

function addNoResultsElement() {
  let noResults = document.createElement('div');
  noResults.classList.add('no-results');
  noResults.textContent = 'No results';
  mainContainer.append(noResults);
}

function switchMessage(event) {
  const message = document.querySelector('.no-value');
  (event.target.classList.contains('close')) ? message.classList.remove('open') :
    message.classList.add('open');
}

getPopularMovies();
searchForm.addEventListener('submit', getDataByQuery);
closeButton.addEventListener('click', switchMessage);

console.log('Cамооценка: \n' +
'1) Вёрстка +10; \n' +
'2) При загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10; \n' +
'3) Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10; \n' +
'4) Поиск +30; \n' +
'5) Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10: \n' +
'Допфункционал: \n' +
'- наличие на карточке фильма его описания и рейтинга на IMDb; \n' +
'- оповешение о пустом поисковом запросе при нажатии Enter или кнопки Submit в случае, если поле поиска пустое; \n' +
'- No results, если поиск не дал результатов; \n' +
'- замещающая картинка при отсутствии постера фильма.');