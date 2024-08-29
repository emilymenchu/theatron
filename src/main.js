const api = axios.create({
    baseUrl: 'http://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
});

const URL_BASE = 'http://api.themoviedb.org/3';
const URL_BASE_IMG = 'https://image.tmdb.org/t/p/w500/';
const URL_BASE_IMG_2000 = 'https://image.tmdb.org/t/p/original';

const URL_TRENDING = URL_BASE + '/trending/all/day'

const URL_MOVIE_POPULAR = URL_BASE + '/movie/popular';
const URL_TOP_RATED_MOVIES = URL_BASE + '/movie/top_rated';
const URL_UPCOMING_MOVIES = URL_BASE + '/movie/upcoming';

const URL_CATEGORIES = URL_BASE + '/genre/movie/list'

const URL_TOP_RATED_SERIES = URL_BASE + '/tv/top_rated';

// Se crean los elementos del navbar
const homeLink = document.getElementById('home-link');
const moviesLink = document.getElementById('movies-link');
const categoriesLink = document.getElementById('categories-link');
const myListLink = document.getElementById('my-list-link');

// Elementos del panel principal
const mainPanel = document.getElementById('main-movie-img-container');
const homeMainTitle = document.getElementById('main-title');
const homeMovieDescription = document.getElementById('movie-description')
const homeMovieRating = document.getElementById('rating');
const homeMovieDuration = document.getElementById('duration');
const homeMovieReleaseDate = document.getElementById('release-date');
const homeMovieMediaType = document.getElementById('media-type');

//Crear los elementos de todas las divisiones
const homeBody = document.getElementById('main-home');
const categoriesBody = document.getElementById('categories-body');
const searchBody = document.getElementById('search-body');
const moviePreview = document.getElementById('movie-preview');

//Variable que guarda la página actual
let currentPage = 'none';

 function createMoviesCards (movies, containerName) {
    const movieCardsContainer = document.getElementById(containerName);

     movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        const posterContainer = document.createElement('div');
        posterContainer.className = 'poster-container';

        const movieImg = document.createElement('img');
        movieImg.className = 'movie-img';
        if (movie.title === undefined) {
            movieImg.alt = movie.name;
        } else {
            movieImg.alt = movie.title;
        }
        movieImg.src = URL_BASE_IMG + movie.poster_path;

        const saveButton = document.createElement('button');
        saveButton.className = 'save-button';

        const saveIcon = document.createElement('img');
        saveIcon.className = 'save-icon';
        saveIcon.alt = 'save';
        saveIcon.src = './public/saveIcon.svg';

        saveButton.appendChild(saveIcon);
        posterContainer.appendChild(movieImg);
        posterContainer.appendChild(saveButton);

        const movieTitleLike = document.createElement('div');
        movieTitleLike.className = 'movie-title-like';

        const movieTitle = document.createElement('p');
        movieTitle.className = 'movie-title';
        if (movie.title === undefined) {
            movieTitle.textContent = movie.name;
        } else {
            movieTitle.textContent = movie.title;
        }

        const likeButton = document.createElement('button');
        likeButton.className = 'like-button';

        const likeIcon = document.createElement('img');
        likeIcon.className = 'like-icon';
        likeIcon.alt = 'like';
        likeIcon.src = './public/likeIcon.svg';

        likeButton.appendChild(likeIcon);

        movieTitleLike.appendChild(movieTitle);
        movieTitleLike.appendChild(likeButton);

        movieCard.appendChild(posterContainer);
        movieCard.appendChild(movieTitleLike);
      
        movieCardsContainer.appendChild(movieCard);
    });
}

async function modifyMainPanel (movieId, panel, mediaType) {
   
    const URL = URL_BASE + `/${mediaType}/${movieId}`;
    console.log(URL);
    const res = await fetch (URL, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + API_KEY
            }
    })

    const data = await res.json();
    console.log(data);

    if (mediaType === 'movie') {
        homeMainTitle.textContent = data.title;
        homeMovieReleaseDate.textContent = data.release_date;
        homeMovieMediaType.textContent = 'Movie';
    } else {
        homeMainTitle.textContent = data.name;
        homeMovieReleaseDate.textContent = data.first_air_date;
        homeMovieMediaType.textContent = 'Series';
    }

    homeMovieRating.textContent = data.vote_average.toFixed(1);
    homeMovieDescription.textContent= data.overview;
    panel.style.background = 
    `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${URL_BASE_IMG_2000}${data.backdrop_path}) top/cover no-repeat`;

}

async function getMoviesPreview (URL, container, mediaNumber, sectionNumber) {
    const res = await fetch(URL, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        }
    }  );

    const data = await res.json();
    
    const movies = data.results;
    console.log(movies)
    createMoviesCards(movies, container);
    
    if (container === 'trending' && sectionNumber === 0) {
        const movieId = movies[mediaNumber].id;
        const mediaType = movies[mediaNumber].media_type;
        modifyMainPanel(movieId, mainPanel, mediaType);
        console.log(mediaType);

    }
    if (container === 'top-rated-series' && sectionNumber === 1) {
        const movieId = movies[mediaNumber].id;
        const mediaType = 'tv';
        modifyMainPanel(movieId, mainPanel, mediaType);
        console.log(mediaType);
    }
    if (container === 'popular-movies' && sectionNumber === 2) {
        const movieId = movies[mediaNumber].id;
        const mediaType = 'movie';
        modifyMainPanel(movieId, mainPanel, mediaType);
        console.log(mediaType);
    }
    if (container === 'top-rated-movies' && sectionNumber === 3) {
        const movieId = movies[mediaNumber].id;
        const mediaType = 'movie';
        modifyMainPanel(movieId, mainPanel, mediaType);
        console.log(mediaType);
    }
    if (container === 'upcoming-movies' && sectionNumber === 4) {
        const movieId = movies[mediaNumber].id;
        const mediaType = 'movie';
        modifyMainPanel(movieId, mainPanel, mediaType);
        console.log(mediaType);
    }
    
}

async function chargeHome() {
    homeBody.style.display = 'flex';
    categoriesBody.style.display = 'none';
    searchBody.style.display = 'none';

    if (currentPage !== 'home'){
        const containers = document.querySelectorAll('#main-home .movie-cards');

        containers.forEach(container => {
            container.innerHTML = '';
        })

        const mediaRandomNumber = Math.floor(Math.random() * 20);
        const sectionRandomNumber = Math.floor(Math.random() * 5);
        console.log(mediaRandomNumber, sectionRandomNumber);

        getMoviesPreview(URL_TRENDING, 'trending', mediaRandomNumber, sectionRandomNumber);
        getMoviesPreview(URL_TOP_RATED_SERIES, 'top-rated-series', mediaRandomNumber, sectionRandomNumber);
        getMoviesPreview(URL_MOVIE_POPULAR, 'popular-movies', mediaRandomNumber, sectionRandomNumber);
        getMoviesPreview(URL_TOP_RATED_MOVIES, 'top-rated-movies', mediaRandomNumber, sectionRandomNumber);
        getMoviesPreview(URL_UPCOMING_MOVIES, 'upcoming-movies', mediaRandomNumber, sectionRandomNumber);

        currentPage = 'home'
    }

}

chargeHome();

homeLink.addEventListener('click', chargeHome);

async function getCategoriesPreview() {
    const res = await fetch(URL_CATEGORIES, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        }
    })

    const data = await res.json();

    const categories = data.genres;

    const categoriesContainer = document.getElementById('categories-container');

    if (currentPage !== 'categories'){
        categoriesContainer.innerHTML = '';

        categories.forEach(category => {
            const categoryButton = document.createElement('button');
            categoryButton.id = 'c' + category.id;
            categoryButton.textContent = category.name;
    
            categoriesContainer.appendChild(categoryButton);
        })

        currentPage = 'categories';
    }

}

async function chargeCategories(event) {
    event.preventDefault;
    categoriesBody.style.display = 'flex';
    homeBody.style.display = 'none';
    searchBody.style.display = 'none';
    getCategoriesPreview();
}

categoriesLink.addEventListener('click', chargeCategories);

function mostrarPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';

    moviePreview.style.display = 'block';
    overlay.style.display = 'block';

    document.body.appendChild(overlay);
    overlay. addEventListener('click', function() {
        popup.style.display = 'none';
        overlay.remove();
    });
}
//mostrarPopup();