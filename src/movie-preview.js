const overlay = create('div');

overlay.addEventListener('click', () => {
    closePreview();
    if (hashHistory.length > 1) {
        console.log(previewCount);
        hashHistory.splice(-previewCount);
        location.hash = hashHistory[hashHistory.length - 1];
        console.log(previewCount)
    } else {
        location.hash = '#home';
    }
    console.log('popup overlay back button')
});
backButtonPopup.addEventListener('click', () => {
    closePreview();
    getBackInHistory();
}); 

function popupMoviePreview(movieId, mediaType) {
    overlay.className = 'popup-overlay';

    document.body.classList.add('no-scroll');

    moviePreview.style.display = 'block';
    overlay.style.display = 'block';

    document.body.appendChild(overlay);
    pvSimilarContainer.innerHTML = '';
    modifyPreviewPanel(movieId, mediaType);
    getSimilar(mediaType, movieId);
    moviePreview.scroll(0,0);
}


async function modifyPreviewPanel (movieId, mediaType) {
    mpPanel.style.display = 'block';
    mpMainPanel.style.background = 'black';
    mpMainPanel.className = 'main-panel skeleton';
    mpMovieTitleAltContainer.style.display = 'none';
    mpPanel.style.background = 'none';

    mpMainTitle.classList.add = 'skeleton skeleton-title';
    mpReleasedDate.classList.add = 'skeleton skeleton-text';
    mpMovieMediaType.classList.add = 'skeleton skeleton-text';
    creatorsContainer.classList.add = 'skeleton skeleton-text';
    mpRating.classList.add = 'skeleton skeleton-text';
    mpDescription.classList.add = 'skeleton skeleton-text';

    Array(5).fill('b').forEach(b => {
        const categoryContainer = create('div');
        categoryContainer.className = 'movie-category skeleton';
        pvCategoriesContainer.appendChild(categoryContainer)
    });


    
    try {
        const { data } = await api(`/${mediaType}/${movieId}`);

        console.log(data)
        
        mpMainPanel.classList.remove = 'skeleton';
        mpMainTitle.classList.remove = 'skeleton skeleton-title'

        mpMainTitle.classList.remove = 'skeleton skeleton-title';
        mpReleasedDate.classList.remove = 'skeleton skeleton-text';
        mpMovieMediaType.classList.remove = 'skeleton skeleton-text';
        creatorsContainer.classList.remove = 'skeleton skeleton-text';
        mpRating.classList.remove = 'skeleton skeleton-text';
        mpDescription.classList.remove = 'skeleton skeleton-text';

        pvCategoriesContainer.innerHTML = '';

        if (mediaType === 'movie') {
            mpMainTitle.textContent = data.title;
            mpReleasedDate.textContent = data.release_date;
            mpMovieMediaType.textContent = 'Movie';
        } else {
            mpMainTitle.textContent = data.name;
            mpReleasedDate.textContent = data.first_air_date;
            mpMovieMediaType.textContent = 'Series';
            creatorsContainer.style.display = 'flex';
            const creatorsList = data.created_by;
            creatorsList.forEach(creator => {
                const pCreator = create('p');
                pCreator.textContent = creator.name;
                pCreator.className = 'p-creator'
                creatorsContainer.appendChild(pCreator);
            });
        }
        
        mpRating.textContent = data.vote_average.toFixed(1);
        mpDescription.textContent= data.overview;

        const img = new Image();
        img.src = `${URL_BASE_IMG_2000}${data.backdrop_path}`;

        img.onload = () => {
            mpMainPanel.className = 'main-panel'
            mpPanel.style.background = 
            `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${URL_BASE_IMG_2000}${data.backdrop_path}) center/cover no-repeat`;
        }
        

        img.addEventListener('error', () => {
            mpPanel.style.display = 'none'
            mpMainPanel.className = 'main-panel'
            mpMovieTitleAltContainer.style.display = 'block';
            mpMainPanel.style.background = 'var(--color-cornflower-default)';
            
        });

        const categories = data.genres;
        
        categories.forEach(category => {
            const categoryContainer = create('div');
            categoryContainer.className = 'movie-category';
            categoryContainer.textContent = category.name;
            
            pvCategoriesContainer.appendChild(categoryContainer);
            
        });
    } catch (e) {
        console.error('Error getting movie img:' + e);
    }
}

async function getSimilar(mediaType, mediaId) {
    createMoviesCardsSkeleton('pvSimilarContainer');
    try {
        const URL_SIMILAR = `/${mediaType}/${mediaId}/similar`;
        const { data } = await api(URL_SIMILAR);
        const movies = data.results;
        cleanContainer('pvSimilarContainer');
        createMoviesCards(movies, 'pvSimilarContainer');
    
    } catch (e) {
        console.error('Error getting similar movies: ' + e);
    }
}


function cleanPreview() {
    mpPanel.style.background = 'none';
    mpDescription.textContent = '';
    mpRating.textContent = '';
    mpMainTitle.textContent = '';
    mpReleasedDate.textContent = '';
    mpMovieMediaType.textContent = '';

    const creators = document.querySelectorAll('.p-creator');
    creators.forEach(creator => {
        creator.remove();
    });

    creatorsContainer.style.display = 'none';
    pvCategoriesContainer.innerHTML = '';
    pvSimilarContainer.innerHTML = '';
}

function closePreview() {
    document.body.classList.remove('no-scroll');
    cleanPreview();
    moviePreview.style.display = 'none';
    overlay.remove();
}