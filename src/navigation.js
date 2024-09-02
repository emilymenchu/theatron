window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator(){    

    if (location.hash.startsWith('#search=')){
        console.log('Search')
    } else if (location.hash.startsWith('#movies')){
        chargeMoviesCategories();
    } else if (location.hash.startsWith('#series')){
        chargeSeriesCategories()
    } else {
        chargeHome();
    }
}


function chargeHome() {
    homeBody.style.display = 'flex';
    mainPanel.style.display = 'flex';
    moviesBody.style.display = 'flex';
    categoriesBody.style.display = 'none';
    searchBody.style.display = 'none';

        containers.forEach((container, index) => {
            container.innerHTML = '';
            const sectionTitle = document.getElementById(`title${index+1}`);
            sectionTitle.textContent = homeTitles[index];
        })

        const mediaRandomNumber = Math.floor(Math.random() * 20);
        const sectionRandomNumber = Math.floor(Math.random() * 5);
        console.log(mediaRandomNumber, sectionRandomNumber);

        

        getMoviesPreview(URL_TRENDING, 'movie-cards1', mediaRandomNumber, sectionRandomNumber);
        getMoviesPreview(URL_TOP_RATED_SERIES, 'movie-cards2', mediaRandomNumber, sectionRandomNumber);
        getMoviesPreview(URL_MOVIE_POPULAR, 'movie-cards3', mediaRandomNumber, sectionRandomNumber);
        getMoviesPreview(URL_TOP_RATED_MOVIES, 'movie-cards4', mediaRandomNumber, sectionRandomNumber);
        getMoviesPreview(URL_UPCOMING_MOVIES, 'movie-cards5', mediaRandomNumber, sectionRandomNumber);

}

function chargeMoviesCategories() {
    categoriesBody.style.display = 'flex';
    mainPanel.style.display = 'none';
    searchBody.style.display = 'none';
    getMoviesCategoriesList();
}

function chargeSeriesCategories() {
    categoriesBody.style.display = 'flex';
    mainPanel.style.display = 'none';
    searchBody.style.display = 'none';
    getSeriesCategoriesList();
}

function chargeMyList () {

}