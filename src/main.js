let language;

const create = (elemento) => document.createElement(elemento);

function languageMenu () {
    let codigoISO = navigator.language.split('-')[0];

    let currentLanguage = Object.values(languages).find(lang => lang.code === codigoISO);

    console.log(Object.values(languages))
    if (currentLanguage !== undefined) {
        language = codigoISO;
    } else {
        language = languages.english.code;
        currentLanguage = languages.english;
    }


    languagesContainer.textContent = currentLanguage.name + ` (${currentLanguage.code}) ` + currentLanguage.flag;

    const arrowDown = create('span');
    arrowDown.className = 'arrow-down';
    languagesBaseContainer.appendChild(arrowDown);

    languagesBaseContainer.addEventListener('click', () => {
        languageMenu.classList.toggle('show');
    })

    window.addEventListener('click', function(event){
        if (!languagesBaseContainer.contains(event.target) && !languageMenu.contains(event.target)){
            languageMenu.classList.remove('show')
        }
    })

    const languageMenu = create('div');
    languageMenu.className = "languagesMenu";


    Object.values(languages).forEach(language => {
        const container = create('span');
        container.className = 'language';
        if (language.code === codigoISO) {
            container.classList.add('active');
        }
        let langText = language.name + ` (${language.code}) ` + language.flag;
        container.textContent = langText;
        languageMenu.appendChild(container);

        container.addEventListener('click', () => setLanguage(langText, language.code));
    })

    languagesBaseContainer.appendChild(languageMenu);


}

languageMenu();

function setLanguage (langText, code) {
    const languagesList = document.querySelectorAll('.language');
    languagesList.forEach(lang => {
        lang.classList.remove('active');
        if (lang.textContent === langText) {
            lang.classList.add('active');
            language = code;
            languagesContainer.textContent = langText;
            api.defaults.params["language"] = language;
            console.log(language);
            pageNavigator();
        }
    });

}


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${API_KEY}`
    },
    params: {
        "language": language
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

const URL_COMPLEMENTS = ['/trending/all/day', '/tv/top_rated', '/movie/popular', 
    '/movie/top_rated', '/movie/upcoming'];

let knownFor;

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

    const lists = {
        movieWatchList: JSON.parse(localStorage.getItem(listsName[0])),
        seriesWatchList: JSON.parse(localStorage.getItem(listsName[1])),
        favoriteMovies: JSON.parse(localStorage.getItem(listsName[2])),
        favoriteSeries: JSON.parse(localStorage.getItem(listsName[3]))
    };

    // listsName.forEach(listName => {
    //     const list = JSON.parse(localStorage.getItem(listName));
        
    // })

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
            if (movie.media_type === 'person') {
                movieImg.alt = movie.name;
                movieImg.setAttribute('data-img', URL_BASE_IMG + movie.profile_path);
                posterContainer.addEventListener('click', () => {
                    knownFor = undefined;
                    if (!movie.known_for === undefined){
                        knownFor = movie.known_for;
                    }
                    location.hash = `#preview/person=${movie.id}`;
                });
            } else if (movie.title === undefined) {
                movieImg.alt = movie.name;
                posterContainer.addEventListener('click', () => {
                    location.hash = `#preview/tv=${movie.id}`;
                });
                movieImg.setAttribute('data-img', URL_BASE_IMG + movie.poster_path);
            } else {
                movieImg.alt = movie.title;
                posterContainer.addEventListener('click', () => {
                    location.hash = `#preview/movie=${movie.id}`;
                });
                movieImg.setAttribute('data-img', URL_BASE_IMG + movie.poster_path);
            }
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
                altIcon.src = './public/movie.svg';
                imgAlternativeContainer.appendChild(altIcon);
                imgAlternativeContainer.appendChild(movieTitleAlt);
                posterContainer.appendChild(imgAlternativeContainer);
                
                movieImg.style.opacity = '0';
                if (movie.genre_ids === undefined || movie.genre_ids.length === 0) {
                    posterContainer.style.background = 'var(--color-cornflower-default)';
                    posterContainer.className = 'poster-container';
                } else {
                    posterContainer.className = `poster-container c${movie.genre_ids[0]}`;
                }
            });
            
            const saveButton = create('button');
            saveButton.className = 'save-button';
            
            
            const saveIcon = create('img');
            saveIcon.className = 'save-icon';
            saveIcon.alt = 'save';
            saveIcon.src = './public/saveIcon.svg';
            if (movie.title === undefined) {
                setButtonSrc(movie.id, lists.seriesWatchList, saveIcon, buttonTypes.save);
            } else {
                setButtonSrc(movie.id, lists.movieWatchList, saveIcon, buttonTypes.save);
            }

            
            saveButton.addEventListener('click', (event) => {
                event.stopPropagation();
                if (movie.title === undefined) {
                    addOrRemoveMedia(movie, listsName[1], saveIcon, buttonTypes.save);
                } else {
                    addOrRemoveMedia(movie, listsName[0], saveIcon, buttonTypes.save);
                }
            })

            saveButton.appendChild(saveIcon);
            observer.observe(movieImg);
            posterContainer.appendChild(saveButton);
            
            const movieTitleLike = create('div');
            movieTitleLike.className = 'movie-title-like';
            
            const movieTitle = create('p');
            movieTitle.className = 'movie-title';
            
            const likeButton = create('button');
            likeButton.className = 'like-button';
            
            const likeIcon = create('img');
            likeIcon.className = 'like-icon';
            likeIcon.alt = 'like';
            likeIcon.src = './public/likeIcon.svg';
            
            if (movie.title === undefined) {
                movieTitle.textContent = movie.name;
                setButtonSrc(movie.id, lists.favoriteSeries, likeIcon, buttonTypes.like);
            } else {
                movieTitle.textContent = movie.title;
                setButtonSrc(movie.id, lists.favoriteMovies, likeIcon, buttonTypes.like);
            }

            likeButton.addEventListener('click', () => {
                if (movie.title === undefined) {
                    addOrRemoveMedia(movie, listsName[3], likeIcon, buttonTypes.like);
                } else {
                    addOrRemoveMedia(movie, listsName[2], likeIcon, buttonTypes.like);
                }
            })

            likeButton.appendChild(likeIcon);
            
            movieTitleLike.appendChild(movieTitle);
            movieTitleLike.appendChild(likeButton);
            
            movieCard.appendChild(posterContainer);
            movieCard.appendChild(movieTitleLike);
            
            movieCardsContainer.appendChild(movieCard);
        });
    }
}

let mpMediaType;
let mpMediaId;
let mpMedia;

mainPanel.addEventListener('click', (event) => {
    if (mpMediaId !== undefined && mpMediaType !== undefined) {
        location.hash = hashes.preview + mpMediaType + '=' + mpMediaId;
    }
});

mpAButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (mpMedia !== undefined && mpMediaType !== undefined) {
        const list = mpMediaType = "movie" ? listsName[0] : listsName[1];
        addOrRemoveMediaPanel(mpMedia, list, mpAButton);
    }
});

async function modifyMainPanel (movieId, panel, mediaType) {
    mpMediaType = undefined;
    mpMediaId = undefined;
    mpMedia = undefined;
    mainPanel.className = 'main-panel skeleton';
    movieTitleAltContainer.style.display = 'none';
    try {
        
        const { data } = await api(`/${mediaType}/${movieId}`); 
        
        mpMediaType = mediaType;
        mpMediaId = movieId;
        mpMedia = data;

        if (mediaType === 'movie') {
            homeMainTitle.textContent = data.title;
            homeMovieReleaseDate.textContent = data.release_date;
            homeMovieMediaType.textContent = mediaTypeTranslations[language].movie;
        } else {
            homeMainTitle.textContent = data.name;
            homeMovieReleaseDate.textContent = data.first_air_date;
            homeMovieMediaType.textContent = mediaTypeTranslations[language].series;
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
            const altIcon = create('img');
                altIcon.className = "alt-icon"
                altIcon.alt = 'icon';
                altIcon.src = './public/movie.svg';
            movieTitleAltContainer.appendChild(altIcon);
            movieTitleAltContainer.style.display = 'block';
            mainPanel.style.background = 'black';
            
        });

    } catch (e) {
        console.log("Error Loading Movie: ", e);
    }

}

function cleanContainer (containerName) {
    const container = document.getElementById(containerName);
    container.innerHTML = '';
}

async function getMoviesPreview (URL, container, mediaNumber, sectionNumber) {

    createMoviesCardsSkeleton(container);
    mainPanel.className = 'main-panel skeleton';

    try {
        const { data } = await api(URL);
        const movies = data.results;

        cleanContainer(container);
        createMoviesCards(movies, container);
        
        container.innerHTML = '';
        
        if (container === 'movie-cards1') {
            console.log(movies);
        }

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
    // homeBody.style.display = 'flex';
    mainPanel.style.display = 'flex';
    moviesBody.style.display = 'flex';
    categoriesBody.style.display = 'none';
    searchBody.style.display = 'none';
    searchInput.value = '';
    mpWButton.textContent = mpbTranslations[language].watch;
    mpAButton.textContent = mpbTranslations[language].add;

    closePreview();
    
    const mediaRandomNumber = Math.floor(Math.random() * 20);
    const sectionRandomNumber = Math.floor(Math.random() * 5);

    const titles = Object.values(homeTitleTranslation[language]);
    for (let index = 0; index < containers.length; index++) {

        const sectionTitle = document.getElementById(`title${index+1}`);
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = titles[index];    
        
    }

    Array(5).fill('b').forEach((b, index) => {
        loadMoviesSkeleton(`movie-cards${index+1}`);
    });

    // for (let index = 0; index < containers.length; index++) {
    //     const sectionTitle = document.getElementById(`title${index+1}`);
    //     sectionTitle.textContent = homeTitles[index];      
    // }

    URL_COMPLEMENTS.forEach((url, index) => {
        getMoviesPreview(url, `movie-cards${index+1}`, mediaRandomNumber, sectionRandomNumber);
    });
}

async function chargeTopicsMedia (URL, page, categoryId) {
    const options = {
        params: {
            page
        }
    }
    if (categoryId) {
        options.params.with_genres = categoryId;
    }

    try {
        const { data } = await api(URL, options);

        if (page === 2) {
            maxPages = data.total_pages;
            console.log(maxPages)
        }

        const media = data.results;
        console.log(media)

        createMoviesCards(media, 'searchCards');

    } catch (e) {

    }
}





titleLogo.addEventListener('click', () => location.hash = '#home');