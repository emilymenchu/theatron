window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

searchButton.addEventListener('click', () => {
    location.hash = '#search=' + searchInput.value;
});

backButtonSearch.addEventListener('click', () => {
    if( document.referrer.startsWith(window.location.origin)){
        window.history.back();
    } else {
        location.hash = '#home';
    }
});
backButton.addEventListener('click', () => {
    if( document.referrer.startsWith(window.location.origin)){
        window.history.back();
    } else {
        location.hash = '#home';
    }
})

function navigator(){    

    if (location.hash.startsWith('#search=')){
        const [notImportant, query] = location.hash.split('=');
        const newQuery = decodeURI(query);
        chargeSearch(newQuery);
    } else if (location.hash.startsWith('#movies-all')){
        chargeMoviesCategories();
    } else if (location.hash.startsWith('#movies-category=')) {
        const { id, name } = getCategoryFromHash('#movies-category=', location.hash);
        chargeMoviesByCategory(id, name);
    } else if (location.hash.startsWith('#series-all')){
        chargeSeriesCategories();
    } else if (location.hash.startsWith('#series-category=')) {
        const { id, name } = getCategoryFromHash('#series-category=');
        chargeSeriesByCategory(id, name);
    } else if (location.hash.startsWith('#preview/')) {
        const { mediaType, mediaId } = getDataFromHashPreview();

    //     if (previousHash === undefined || mediaType === undefined || mediaId === undefined) {
    //         console.log('Error while charging preview, it has to do with get Data form hash preview');
    //     } else {

    //         switch (true) {
    //             case previousHash.startsWith('#movies-all'):
    //                 chargeMoviesCategories(); 
    //                 break;
    //             case previousHash.startsWith('#movies-category='):
    //                 const { id, name } = getCategoryFromHash('#movies-category=', previousHash);
    //                 chargeMoviesByCategory(id, name);
    //                 break;
    //             case previousHash.startsWith('#series-all'):
    //                 chargeSeriesCategories();
    //                 break;
    //             case previousHash.startsWith('#series-category='):
    //                 const { id: id1, name: name1 } = getCategoryFromHash('#series-category=', previousHash);
    //                 chargeSeriesByCategory(id1, name1);
    //                 break;
    //             case previousHash.startsWith('#search='):
    //                 const [notImportant, query] = previousHash.split('=');
    //                 const newQuery = decodeURI(query);
    //                 chargeSearch(newQuery);
    //                 break;
    //             default:
    //                 chargeHome();
    //                 break;
    //         }

    //     popupMoviePreview(mediaId, mediaType);
    // }
    popupMoviePreview(mediaId, mediaType);


    } else {
        chargeHome();
    }

    smoothscroll();
}


function chargeHome() {
    homeBody.style.display = 'flex';
    mainPanel.style.display = 'flex';
    moviesBody.style.display = 'flex';
    categoriesBody.style.display = 'none';
    searchBody.style.display = 'none';
    
    const mediaRandomNumber = Math.floor(Math.random() * 20);
    const sectionRandomNumber = Math.floor(Math.random() * 5);

        for (let index = 0; index < containers.length; index++) {
            const sectionTitle = document.getElementById(`title${index+1}`);
            sectionTitle.textContent = homeTitles[index];      
        }

        URL_COMPLEMENTS.forEach((url, index) => {
            getMoviesPreview(url, `movie-cards${index+1}`, mediaRandomNumber, sectionRandomNumber);
        });
}

function chargeSearch(query) {
    mainPanel.style.display = 'none';
    categoriesBody.style.display = 'none';
    moviesBody.style.display = 'none';
    searchBody.style.display = 'flex';
    searchBody2.style.display = 'flex';
    backButtonSearch.style.display = 'flex';
    getMediaByQuery(query, 'movie');
    getMediaByQuery(query, 'tv');
}

function chargeMoviesCategories() {
    moviesBody.style.display = 'flex';
    categoriesBody.style.display = 'flex';
    mainPanel.style.display = 'none';
    searchBody.style.display = 'none';
    searchBody2.style.display = 'none';
    backButtonSearch.style.display = 'none';
    getMoviesCategoriesList();
}

function chargeMoviesByCategory(categoryId, categoryName) {
    mainPanel.style.display = 'none';
    categoriesBody.style.display = 'flex';
    moviesBody.style.display = 'none';
    searchBody.style.display = 'flex';
    searchBody2.style.display = 'none';
    backButtonSearch.style.display = 'flex';
    getMoviesByCategory(categoryId, categoryName);
}

function chargeSeriesCategories() {
    moviesBody.style.display = 'flex';
    categoriesBody.style.display = 'flex';
    mainPanel.style.display = 'none';
    searchBody.style.display = 'none';
    searchBody2.style.display = 'none';
    backButtonSearch.style.display = 'none';
    getSeriesCategoriesList();
}

function chargeSeriesByCategory(categoryId, categoryName) {
    categoriesBody.style.display = 'flex';
    mainPanel.style.display = 'none';
    moviesBody.style.display = 'none';
    searchBody.style.display = 'flex';
    backButtonSearch.style.display = 'flex';
    searchBody2.style.display = 'none';
    getSeriesByCategory(categoryId, categoryName);
}

function chargeMyList () {

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