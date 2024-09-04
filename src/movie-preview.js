const overlay = create('div');


function popupMoviePreview(movieId, mediaType) {
    overlay.className = 'popup-overlay';

    document.body.classList.add('no-scroll')

    moviePreview.style.display = 'block';
    overlay.style.display = 'block';

    document.body.appendChild(overlay);
    overlay.addEventListener('click', closePreview);
    backButton.addEventListener('click', closePreview) 

    pvSimilarContainer.innerHTML = '';
    modifyPreviewPanel(movieId, mediaType);
    moviePreview.scroll(0,0);
}


async function modifyPreviewPanel (movieId, mediaType) {
   
    const { data } = await api(`/${mediaType}/${movieId}`);

    if (mediaType === 'movie') {
        mpMainTitle.textContent = data.title;
        mpReleasedDate.textContent = data.release_date;
        mpMovieMediaType.textContent = 'Movie';
    } else {
        mpMainTitle.textContent = data.name;
        mpReleasedDate.textContent = data.first_air_date;
        mpMovieMediaType.textContent = 'Series';
        creatorsContainer.style.display = 'flex'
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
    mpPanel.style.background = 
    `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${URL_BASE_IMG_2000}${data.backdrop_path}) center/cover no-repeat`;

    const categories = data.genres;

    categories.forEach(category => {
        const categoryContainer = create('div');
        categoryContainer.className = 'movie-category';
        categoryContainer.textContent = category.name;

        pvCategoriesContainer.appendChild(categoryContainer);

    });

    getSimilar(mediaType, movieId);
}

async function getSimilar(mediaType, mediaId) {
    const URL_SIMILAR = `/${mediaType}/${mediaId}/similar`;
    const { data } = await api(URL_SIMILAR);
    const movies = data.results;
    createMoviesCards(movies, 'pvSimilarContainer');
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