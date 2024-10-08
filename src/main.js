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
    '/movie/top_rated', '/movie/upcoming'];

const create = (elemento) => document.createElement(elemento);

// let observer = new IntersectionObserver(handleIntersect);
// observer.observe();

// function handleIntersect (entries) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {

//         }
//     })
// }


 function createMoviesCards (movies, containerName) {
    const movieCardsContainer = document.getElementById(containerName);

    movieCardsContainer.innerHTML = '';

    if (movies.length === 0) {
        similarMoviesSection.style.display = 'none';
    } else {

        
        movies.forEach(movie => {
            const movieCard = create('div');
            movieCard.className = 'movie-card';
            
            const posterContainer = create('div');
            posterContainer.className = 'poster-container skeleton';
            
            const movieImg = create('img');
            movieImg.className = 'movie-img';
            movieImg.style.opacity = '0';
            movieImg.onload = () => {
                posterContainer.className = 'poster-container';
                movieImg.style.opacity = '1';
                
            }
            
            if (movie.title === undefined) {
                movieImg.alt = movie.name;
                posterContainer.addEventListener('click', () => {
                    location.hash = `#preview/tv=${movie.id}`;
                });
            } else {
                movieImg.alt = movie.title;
                posterContainer.addEventListener('click', () => {
                    location.hash = `#preview/movie=${movie.id}`;
                });
            }
            movieImg.setAttribute('data-img', URL_BASE_IMG + movie.poster_path);
            posterContainer.appendChild(movieImg);
            
            movieImg.addEventListener('error', () => {
                movieImg.style.display = "none";
                const imgAlternativeContainer = create('div');
                imgAlternativeContainer.className = 'imgAlternativeContainer';
                const movieTitleAlt = create('p');
                movieTitleAlt.textContent = movieImg.getAttribute('alt');
                movieTitleAlt.className = 'movie-title-alt';
                const altIcon = create('img');
                altIcon.className = "alt-icon"
                altIcon.alt = 'icon';
                altIcon.src = './public/movie.svg'
                imgAlternativeContainer.appendChild(altIcon);
                imgAlternativeContainer.appendChild(movieTitleAlt);
                posterContainer.appendChild(imgAlternativeContainer);
                
                movieImg.style.opacity = '0';
                if (movie.genre_ids.length === 0) {
                    posterContainer.style.background = 'var(--color-cornflower-default)';
                    posterContainer.className = 'poster-container';
                } else {
                    posterContainer.className = `poster-container c${movie.genre_ids[0]}`;
                }
            });
            
            const saveButton = create('button');
            saveButton.className = 'save-button';
            
            saveButton.addEventListener('click', (event) => {
                event.stopPropagation();
            })
            
            const saveIcon = create('img');
            saveIcon.className = 'save-icon';
            saveIcon.alt = 'save';
            saveIcon.src = './public/saveIcon.svg';
            
            saveButton.appendChild(saveIcon);
            observer.observe(movieImg);
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
}

async function modifyMainPanel (movieId, panel, mediaType) {
    mainPanel.className = 'main-panel skeleton';
    movieTitleAltContainer.style.display = 'none';
    try {
        
        const { data } = await api(`/${mediaType}/${movieId}`); 
        
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

        const img = new Image();
        img.src = `${URL_BASE_IMG_2000}${data.backdrop_path}`;

        img.onload = () => {
            mainPanel.className = 'main-panel';
            panel.style.background = 
            `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${URL_BASE_IMG_2000}${data.backdrop_path}) top/cover no-repeat`;
        }

        img.addEventListener('error', () => {
            console.log('error');
            mainPanel.className = 'main-panel'
            movieTitleAltContainer.appendChild(altIcon);
            movieTitleAltContainer.style.display = 'block';
            mainPanel.style.background = 'black';
            
        });

    } catch (e) {
        console.log("Error Loading Movie: ", e);
    }

}

async function getMoviesPreview (URL, container, mediaNumber, sectionNumber) {

    createMoviesCardsSkeleton(container);
    mainPanel.className = 'main-panel skeleton';

    try {
        const { data } = await api(URL);
        const movies = data.results;
        createMoviesCards(movies, container);
        
        container.innerHTML = '';
        
        if (container === 'movie-cards1' && sectionNumber === 0) {
            const movieId = movies[mediaNumber].id;
            const mediaType = movies[mediaNumber].media_type;
            modifyMainPanel(movieId, mainPanel, mediaType);
            
        }
        if (container === 'movie-cards2' && sectionNumber === 1) {
            const movieId = movies[mediaNumber].id;
            const mediaType = 'tv';
            modifyMainPanel(movieId, mainPanel, mediaType);
        }
        if (container === 'movie-cards3' && sectionNumber === 2) {
            const movieId = movies[mediaNumber].id;
            const mediaType = 'movie';
            modifyMainPanel(movieId, mainPanel, mediaType);
        }
        if (container === 'movie-cards4' && sectionNumber === 3) {
            const movieId = movies[mediaNumber].id;
            const mediaType = 'movie';
            modifyMainPanel(movieId, mainPanel, mediaType);
        }
        if (container === 'movie-cards5' && sectionNumber === 4) {
            const movieId = movies[mediaNumber].id;
            const mediaType = 'movie';
            modifyMainPanel(movieId, mainPanel, mediaType);
        }
    } catch (e) {
        console.error('Error Loading Movies: ', e)
    }
    
}


function chargeHome() {
    homeBody.style.display = 'flex';
    mainPanel.style.display = 'flex';
    moviesBody.style.display = 'flex';
    categoriesBody.style.display = 'none';
    searchBody.style.display = 'none';
    searchInput.value = '';

    closePreview();
    
    const mediaRandomNumber = Math.floor(Math.random() * 20);
    const sectionRandomNumber = Math.floor(Math.random() * 5);


    for (let index = 0; index < containers.length; index++) {

        const sectionTitle = document.getElementById(`title${index+1}`);
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = homeTitles[index];    
        
    }

    Array(5).fill('b').forEach((b, index) => {
        loadMoviesSkeleton(`movie-cards${index+1}`);
    });

    for (let index = 0; index < containers.length; index++) {
        const sectionTitle = document.getElementById(`title${index+1}`);
        sectionTitle.textContent = homeTitles[index];      
    }

    URL_COMPLEMENTS.forEach((url, index) => {
        getMoviesPreview(url, `movie-cards${index+1}`, mediaRandomNumber, sectionRandomNumber);
    });
}

titleLogo.addEventListener('click', () => location.hash = '#home');