window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator(){    
    if (location.hash.startsWith('#movies')){
        console.log('movie')
    } else if (location.hash.startsWith('#search=')){
        console.log('Search')
    } else if (location.hash.startsWith('#movie=')){
        console.log('MoviePreview')
    } else if (location.hash.startsWith('#categories')){
        chargeCategories();
    } else if (location.hash.startsWith('#category=')){
        console.log('Category')
    } else {
        chargeHome();
    }
}

// function navigator () {

//     const hashes = {
//         '#movies': () => chargeMovies(),
//         '#search=': () => chargeSearch(),
//         '#movie=': () => chargePreview(),
//         '#categories': () => chargeCategories(),
//         '#category=': () => chargeCategory(),
//         '#mylist=': () => chargeMyList(),
//         '#home': () => chargeHome()
//     }

//     hashchange[location.hash]();
// }

function chargeHome() {
    homeBody.style.display = 'flex';
    categoriesBody.style.display = 'none';
    searchBody.style.display = 'none';

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

}

function chargeCategories() {
    categoriesBody.style.display = 'flex';
    mainPanel.style.display = 'none';
    searchBody.style.display = 'none';
    getCategoriesPreview();
}

function chargeMovies() {

}

function chargeSearch () {

}

function chargePreview () {

}

function chargeCategory () {

}
function chargeMyList () {

}