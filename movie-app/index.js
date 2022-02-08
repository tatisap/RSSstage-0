const posters = document.querySelectorAll('.movie-poster');
const titles = document.querySelectorAll('.movie-title');
const ratings = document.querySelectorAll('.movie-rating');
const searchForm = document.querySelector('.search-form');

async function getPopularMovies() {
  const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=fcbdf426eda6fb1641d20038dd9e99f5&language=en-US&page=1';
  const popularMoviesRes = await fetch(popularMoviesUrl);
  const popularMoviesData = await popularMoviesRes.json();
  console.log(popularMoviesData);

  const configRes = await fetch('https://api.themoviedb.org/3/configuration?api_key=fcbdf426eda6fb1641d20038dd9e99f5');
  const configData = await configRes.json();

  addPosters(popularMoviesData, configData);
  addTitles(popularMoviesData);
  addRatings(popularMoviesData);
}

async function getDataByQuery(event) {
  event.preventDefault();

  const query = event.target.query.value;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=fcbdf426eda6fb1641d20038dd9e99f5&language=en-US&query=${query}&page=1&include_adult=false`;
  const foundMoviesRes = await fetch(searchUrl);
  const foundMoviesData = await foundMoviesRes.json();
  console.log(foundMoviesData);

  const configRes = await fetch('https://api.themoviedb.org/3/configuration?api_key=fcbdf426eda6fb1641d20038dd9e99f5');
  const configData = await configRes.json();

  addPosters(foundMoviesData, configData);
  addTitles(foundMoviesData);
  addRatings(foundMoviesData);
}

function addPosters(data, config) {
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
  for (let i = 0; i < titles.length; i++) { 
    titles[i].textContent = data.results[i].original_title;
  }
}

function addRatings(data) {
  for (let i = 0; i < ratings.length; i++) { 
    ratings[i].textContent = data.results[i].vote_average;
  }
}

getPopularMovies();
searchForm.addEventListener('submit', getDataByQuery);