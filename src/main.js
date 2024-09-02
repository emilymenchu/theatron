const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${API_KEY}`
    }
});
const URL_BASE_IMG = 'https://image.tmdb.org/t/p/w500/';
const URL_BASE_IMG_2000 = 'https://image.tmdb.org/t/p/original';

const URL_TRENDING = '/trending/all/day'
const URL_MOVIE_POPULAR = '/movie/popular';
const URL_TOP_RATED_MOVIES = '/movie/top_rated';
const URL_UPCOMING_MOVIES = '/movie/upcoming';
const URL_TOP_RATED_SERIES = '/tv/top_rated';

const URL_CATEGORIES = (mediaType) => `/genre/${mediaType}/list`;

const containers = document.querySelectorAll('#homeBody .movie-cards');

const homeTitles = ['Trending Now', 'top rated series', 'popular movies', 
    'top rated movies', 'Upcoming movies']

const URL_COMPLEMENTS = ['/trending/all/day', '/tv/top_rated', '/movie/popular', 
    '/movie/top_rated', '/movie/upcoming', ]

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
            movieImg.addEventListener('click', () => popupMoviePreview(movie.id, 'tv'))
        } else {
            movieImg.alt = movie.title;
            movieImg.addEventListener('click', () => popupMoviePreview(movie.id, 'movie'))
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
    
    if (container === 'movie-cards1' && sectionNumber === 0) {
        const movieId = movies[mediaNumber].id;
        const mediaType = movies[mediaNumber].media_type;
        modifyMainPanel(movieId, mainPanel, mediaType);
        console.log(mediaType);

    }
    if (container === 'movie-cards2' && sectionNumber === 1) {
        const movieId = movies[mediaNumber].id;
        const mediaType = 'tv';
        modifyMainPanel(movieId, mainPanel, mediaType);
        console.log(mediaType);
    }
    if (container === 'movie-cards3' && sectionNumber === 2) {
        const movieId = movies[mediaNumber].id;
        const mediaType = 'movie';
        modifyMainPanel(movieId, mainPanel, mediaType);
        console.log(mediaType);
    }
    if (container === 'movie-cards4' && sectionNumber === 3) {
        const movieId = movies[mediaNumber].id;
        const mediaType = 'movie';
        modifyMainPanel(movieId, mainPanel, mediaType);
        console.log(mediaType);
    }
    if (container === 'movie-cards5' && sectionNumber === 4) {
        const movieId = movies[mediaNumber].id;
        const mediaType = 'movie';
        modifyMainPanel(movieId, mainPanel, mediaType);
        console.log(mediaType);
    }
    
}

function chargeHome() {
    homeBody.style.display = 'flex';
    mainPanel.style.display = 'flex'
    categoriesBody.style.display = 'none';
    searchBody.style.display = 'none';
    
    const mediaRandomNumber = Math.floor(Math.random() * 20);
    const sectionRandomNumber = Math.floor(Math.random() * 5);
    console.log(mediaRandomNumber, sectionRandomNumber);

        containers.forEach((container, index) => {
            container.innerHTML = '';
            const sectionTitle = document.getElementById(`title${index+1}`);
            sectionTitle.textContent = homeTitles[index];

        })

        URL_COMPLEMENTS.forEach((url, index) => {
            getMoviesPreview(url, `movie-cards${index+1}`, mediaRandomNumber, sectionRandomNumber);
        })
}