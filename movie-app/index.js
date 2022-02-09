const searchForm = document.querySelector('.search-form');
const mainContainer = document.querySelector('.main-container');

async function getPopularMovies() {
  const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=fcbdf426eda6fb1641d20038dd9e99f5&language=en-US&page=1';
  const popularMoviesRes = await fetch(popularMoviesUrl);
  const popularMoviesData = await popularMoviesRes.json();
  console.log(popularMoviesData);

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

  mainContainer.innerHTML = '';
  document.body.classList.remove('all-height');

  const query = event.target.query.value;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=fcbdf426eda6fb1641d20038dd9e99f5&language=en-US&query=${query}&page=1&include_adult=false`;
  const foundMoviesRes = await fetch(searchUrl);
  const foundMoviesData = await foundMoviesRes.json();
  console.log(foundMoviesData);

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
      posters[i].src = config.images.base_url + config.images.backdrop_sizes[0] + data.results[i].poster_path;
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

  let showButton = document.createElement('button');
  showButton.classList.add('show-overview');
  showButton.textContent = 'Show overview';
  showButton.addEventListener('click', switchOverview);
  
  card.append(posterWrapper);
  card.append(info);
  card.append(showButton);

  let poster = document.createElement('img');
  poster.classList.add('movie-poster');

  posterWrapper.append(poster);

  let title = document.createElement('h2');
  title.classList.add('movie-title');

  let rating = document.createElement('div');
  rating.classList.add('movie-rating');

  let overview = document.createElement('div');
  overview.classList.add('movie-overview');

  info.append(title);
  info.append(rating);
  info.append(overview);

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

getPopularMovies();
searchForm.addEventListener('submit', getDataByQuery);