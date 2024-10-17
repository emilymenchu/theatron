let hashHistory = [location.hash];
console.log(hashHistory);

let previousHashPreview = location.hash;
let previewCount = 0;

let pageCounter = 1;

let maxPages = 5;

const moreButtons = document.querySelectorAll('.more-button');


const hashes = {
    home: '#home',
    search: '#search=',
    movies: '#movies-all',
    moviesCategory: '#movies-category=',
    series: '#series-all',
    seriesCategory: '#series-category=',
    preview: '#preview/',
    trending: '#trending-now',
    topRatedSeries: '#top-rated-series',
    popularMovies: '#popular-movies',
    topRatedMovies: '#top-rated-movies',
    upcomingMovies: '#upcoming-movies',
    myList: '#my-list'
}

moreButtons.forEach((moreButton, index) => {
    moreButton.addEventListener('click', () => {
        if (index === 0) {
            location.hash = hashes.trending;
        } else if (index === 1) {
            location.hash = hashes.topRatedSeries;
        } else if (index === 2) {
            location.hash = hashes.popularMovies;
        } else if (index === 3) {
            location.hash = hashes.topRatedMovies;
        } else if (index === 4) {
            location.hash = hashes.upcomingMovies;
        }
    })
});

let infiniteScrollRef;

window.addEventListener('scroll', infiniteScrollRef, false);

window.addEventListener('DOMContentLoaded', pageNavigator, false);
window.addEventListener('hashchange', pageNavigator, false);

searchButton.addEventListener('click', () => {
    if (searchInput.value != '') {
        location.hash = '#search=' + searchInput.value;
    }
});

backButtonSearch.addEventListener('click', () => {
    searchInput.value = '';
    getBackInHistory();
} );

function getBackInHistory () {

    if (hashHistory.length > 1) {
        hashHistory.pop();
        const previousHash = hashHistory[hashHistory.length - 1];
        location.hash = previousHash;
    } else {
        location.hash = hashes.home;
    }

}

function pageNavigator(){ 

    if (location.hash.startsWith('#my-list')){
        sectionFive.style.display = 'none';
    } else {
        sectionFive.style.display = 'block';
    }
    
    if (infiniteScrollRef) {
        window.removeEventListener('scroll', infiniteScrollRef, {passive: false});
        infiniteScrollRef = undefined;
    }

    pageCounter = 1;

    // if (hashHistory.length > 1 && hashHistory[hashHistory.length -1].contains(hashes.preview)) {

    //     console.log(!(hashHistory.length > 1 && !hashHistory[hashHistory.length -1].contains(hashes.preview)));

    const titles = Object.values(homeTitleTranslation[language]);    

        if (location.hash.startsWith(hashes.search)){
            const [notImportant, query] = location.hash.split('=');
            const newQuery = decodeURI(query);
            chargeSearchPage(newQuery);
        } else if (location.hash.startsWith(hashes.movies)){
            chargeMoviesCategories();
        } else if (location.hash.startsWith(hashes.moviesCategory)) {
            const { id, name } = getCategoryFromHash(hashes.moviesCategory, location.hash);
            chargeMoviesByCategory(id, name);
            infiniteScrollRef = infiniteScroll('/discover/movie', id);
        } else if (location.hash.startsWith(hashes.series)){
            chargeSeriesCategories();
        } else if (location.hash.startsWith(hashes.seriesCategory)) {
            const { id, name } = getCategoryFromHash(hashes.seriesCategory, location.hash);
            chargeSeriesByCategory(id, name);
            infiniteScrollRef = infiniteScroll('/discover/tv', id);
        } else if (location.hash.startsWith(hashes.preview)) {
            const { mediaType, mediaId } = getDataFromHashPreview();
            previewCount++;
            popupMoviePreview(mediaId, mediaType);
        } else if (location.hash.startsWith(hashes.trending)) {
            chargeTopicsPage(URL_TRENDING, titles[0]);
            infiniteScrollRef = infiniteScroll(URL_TRENDING);
        } else if (location.hash.startsWith(hashes.topRatedSeries)) {
            chargeTopicsPage(URL_TOP_RATED_SERIES, titles[1]);
            infiniteScrollRef = infiniteScroll(URL_TOP_RATED_SERIES);
        } else if (location.hash.startsWith(hashes.popularMovies)) {
            chargeTopicsPage(URL_MOVIE_POPULAR, titles[2]);
            infiniteScrollRef = infiniteScroll(URL_MOVIE_POPULAR);
        } else if (location.hash.startsWith(hashes.topRatedMovies)) {
            chargeTopicsPage(URL_TOP_RATED_MOVIES, titles[3]);
            infiniteScrollRef = infiniteScroll(URL_TOP_RATED_MOVIES);
        } else if (location.hash.startsWith(hashes.upcomingMovies)) {
            chargeTopicsPage(URL_UPCOMING_MOVIES, titles[4]);
            infiniteScrollRef = infiniteScroll(URL_UPCOMING_MOVIES);
        } else if (location.hash.startsWith(hashes.myList)){
            chargeMyListPage();
        } else if (location.hash.startsWith(hashes.home)){
            chargeHomePage();
        } else {
            location.hash = hashes.home;
        }

    
    //}

    if (infiniteScrollRef) {
        window.addEventListener('scroll', infiniteScrollRef, {passive: false});
        console.log("Infinite scroll added")
    }

    if (!location.hash.startsWith('#preview/')){
        previousHashPreview = location.hash;
        previewCount = 0;
        smoothscroll();
    }

    if (location.hash.startsWith('#home')){
        moreButtons.forEach(moreButton => {
            moreButton.style.display = 'block';    
        })
    } else {
        moreButtons.forEach(moreButton => {
            moreButton.style.display = 'none';    
        })    
    }

    if (!location.hash.startsWith(hashes.search)){
        searchBody2.style.display = 'none'
    } else {
        searchBody2.style.display = 'block'

    }

    const currentHash = location.hash;

    if (hashHistory[hashHistory.length - 1] !== currentHash) {
        hashHistory.push(currentHash);
    }
    console.log(hashHistory);

    translateNavBar();
}


function chargeHomePage() {
    chargeHome();
    myListTitle.style.display = 'none';
    moreButtons.forEach(button => {
        button.textContent = seeMoreTranslations[language].text;
    });
}

function chargeSearchPage(query) {
    chargeSearch(query);
    myListTitle.style.display = 'none';
}

function chargeMoviesCategories() {
    moviesBody.style.display = 'flex';
    categoriesBody.style.display = 'flex';
    mainPanel.style.display = 'none';
    searchBody.style.display = 'none';
    searchBody2.style.display = 'none';
    backButtonSearch.style.display = 'none';
    getMoviesCategoriesList();
    closePreview();
    searchInput.value = '';
    myListTitle.style.display = 'none';
}

function chargeMoviesByCategory(categoryId, categoryName) {
    mainPanel.style.display = 'none';
    categoriesBody.style.display = 'flex';
    moviesBody.style.display = 'none';
    searchBody.style.display = 'flex';
    searchBody2.style.display = 'none';
    backButtonSearch.style.display = 'flex';
    getMoviesByCategory(categoryId, categoryName);
    closePreview();
    searchInput.value = '';
    myListTitle.style.display = 'none';
}

function chargeSeriesCategories() {
    moviesBody.style.display = 'flex';
    categoriesBody.style.display = 'flex';
    mainPanel.style.display = 'none';
    searchBody.style.display = 'none';
    searchBody2.style.display = 'none';
    backButtonSearch.style.display = 'none';
    getSeriesCategoriesList(true);
    closePreview();
    searchInput.value = '';
    myListTitle.style.display = 'none';
}

function chargeSeriesByCategory(categoryId, categoryName) {
    categoriesBody.style.display = 'flex';
    mainPanel.style.display = 'none';
    moviesBody.style.display = 'none';
    searchBody.style.display = 'flex';
    backButtonSearch.style.display = 'flex';
    searchBody2.style.display = 'none';
    getSeriesCategoriesList(false);
    getSeriesByCategory(categoryId, categoryName);
    closePreview();
    searchInput.value = '';
    myListTitle.style.display = 'none';
}

function chargeTopicsPage (URL, title) {
    mainPanel.style.display = 'none';
    categoriesBody.style.display = 'none';
    moviesBody.style.display = 'none';
    searchBody.style.display = 'flex';
    searchBody2.style.display = 'none';
    backButtonSearch.style.display = 'flex';
    closePreview();
    searchInput.value = '';
    myListTitle.style.display = 'none';

    createMoviesCardsSkeleton('searchCards');
    cleanContainer('searchCards');
    searchTitle.textContent = title;
    chargeTopicsMedia(URL, pageCounter)
}

function infiniteScroll (URL, categoryId) {

    return function () {
        const clientHeight = document.documentElement.clientHeight;
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
    
        const isScrollBottom = (scrollTop + clientHeight + 0.5) >= (scrollHeight);
        const pageIsNotMax = pageCounter < maxPages;
    
        if (isScrollBottom && pageIsNotMax) {
            pageCounter++;
            chargeTopicsMedia(URL, pageCounter, categoryId);
            console.log("page:", pageCounter)
        }
    }
}

function chargeMyListPage () {
    mainPanel.style.display = 'none';
    moviesBody.style.display = 'flex';
    categoriesBody.style.display = 'none';
    searchBody.style.display = 'none';
    searchInput.value = '';
    myListTitle.style.display = 'block';
    closePreview();
    chargeMyLists();
}

function translateNavBar() {
    searchInput.placeholder = navTranslations[language].search;
    homeLink.textContent = navTranslations[language].home;
    seriesLink.textContent = navTranslations[language].series;
    moviesLink.textContent = navTranslations[language].movies;
    myListLink.textContent = navTranslations[language].list;
    developedBy.textContent = footerTranslations[language].message + " @emilymenchu";
}

function getCategoryFromHash(startOfHash, hash) {
    const hashData = hash.replace(startOfHash, '');
    const [id, name] = hashData.split('-');
    const newname = decodeURI(name);
    return { id, name: newname };
}

function getDataFromHashPreview() {
    const hash = window.location.hash;

    // Verifica que el hash comience con '#preview/' antes de continuar
    if (!hash.startsWith('#preview/')) {
        return null;  // o maneja el error de la manera que prefieras
    }
    // Remueve '#preview/' del hash
    const movieInfo = hash.replace('#preview/', '');
    // Separa el primer segmento (previousHash) y el segundo segmento (movieInfo)
    // Si movieInfo no está presente o no tiene el formato correcto, maneja el error
    if (!movieInfo || !movieInfo.includes('=')) {
        return null;  // o maneja el error de la manera que prefieras
    }
    // Separa el tipo de medio (mediaType) y el ID de medio (mediaId)
    const [mediaType, mediaId] = movieInfo.split('=');

    // Retorna los valores extraídos
    return { mediaType, mediaId };
}

function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(smoothscroll);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
}