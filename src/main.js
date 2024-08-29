const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const URL_BASE = 'http://api.themoviedb.org/3';
const URL_BASE_IMG = 'https://image.tmdb.org/t/p/w500/';
const URL_BASE_IMG_2000 = 'https://image.tmdb.org/t/p/original';

const URL_TRENDING = '/trending/all/day'

const URL_MOVIE_POPULAR = '/movie/popular';
const URL_TOP_RATED_MOVIES = '/movie/top_rated';
const URL_UPCOMING_MOVIES = '/movie/upcoming';

const URL_CATEGORIES = URL_BASE + '/genre/movie/list'

const URL_TOP_RATED_SERIES = URL_BASE + '/tv/top_rated';

const create = (elemento) => document.createElement(elemento);


 function createMoviesCards (movies, containerName) {
    const movieCardsContainer = document.getElementById(containerName);

     movies.forEach(movie => {
        const movieCard = create('div');
        movieCard.className = 'movie-card';

        const posterContainer = create('div');
        posterContainer.className = 'poster-container';

        const movieImg = create('img');
        movieImg.className = 'movie-img';
        if (movie.title === undefined) {
            movieImg.alt = movie.name;
        } else {
            movieImg.alt = movie.title;
        }
        movieImg.src = URL_BASE_IMG + movie.poster_path;

        const saveButton = create('button');
        saveButton.className = 'save-button';

        const saveIcon = create('img');
        saveIcon.className = 'save-icon';
        saveIcon.alt = 'save';
        saveIcon.src = './public/saveIcon.svg';

        saveButton.appendChild(saveIcon);
        posterContainer.appendChild(movieImg);
        posterContainer.appendChild(saveButton);

        const movieTitleLike = create('div');
        movieTitleLike.className = 'movie-title-like';

        const movieTitle = create('p');
        movieTitle.className = 'movie-title';
        if (movie.title === undefined) {
            movieTitle.textContent = movie.name;
        } else {
            movieTitle.textContent = movie.title;
        }

        const likeButton = create('button');
        likeButton.className = 'like-button';

        const likeIcon = create('img');
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
   
    const { data } = await api(`/${mediaType}/${movieId}`);


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
    const { data } = await api(URL);
    
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

        categoriesContainer.innerHTML = '';

        categories.forEach(category => {
            const categoryButton = create('button');
            categoryButton.id = 'c' + category.id;
            categoryButton.textContent = category.name;
    
            categoriesContainer.appendChild(categoryButton);
        })

        location.hash = '#categories';

}

async function chargeCategories(event) {
    event.preventDefault;
    categoriesBody.style.display = 'flex';
    homeBody.style.display = 'none';
    searchBody.style.display = 'none';
    getCategoriesPreview();
}

// categoriesLink.addEventListener('click', chargeCategories);

function mostrarPopup() {
    const overlay = create('div');
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