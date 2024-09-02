const URL_MOVIES_CATEGORY = (categoryId) => 
`/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${categoryId}`;
const categoriesId = [];

async function getMoviesCategoriesList() {
    const { data } = await api(URL_CATEGORIES('movie'));

    const categories = data.genres;
    console.log(categories);

        categoriesContainer.innerHTML = '';
        
        containers.forEach(container => {
            container.innerHTML = '';
        })

        categories.forEach(category => {
            const categoryButton = create('button');
            categoryButton.id = 'c' + category.id;
            categoryButton.textContent = category.name;
            categoryButton.addEventListener('click', () => displayMoviesFromCategory(category.id, category.name));
            categoriesId.push(category.id);
            
            categoriesContainer.appendChild(categoryButton);
        })


        const ids = getRandom5Ids(categoriesId);

        ids.forEach((id, index) => {
            const sectionTitle = document.getElementById(`title${index+1}`);
            sectionTitle.textContent = findCategoryById(categories, id).name;
            getCategoryPreview(id, `movie-cards${index+1}`);
        });

}

async function getCategoryPreview(categoryId, containerId){
    const { data } = await api(URL_MOVIES_CATEGORY(categoryId));

    const movies = data.results;
    console.log(movies)
    createMoviesCards(movies, containerId)
}

function getRandom5Ids (ids) {
    let selected = [];
    let idsCopy = [...ids]

    for (let index = 0; index < 5; index++) {
        const randomId = Math.floor(Math.random() * idsCopy.length);
        selected.push(idsCopy.splice(randomId, 1)[0]);        
    }
    console.log(selected);
    return selected;
}

function findCategoryById(categories, id) {
    return categories.find(category => category.id === id);
}

async function getMoviesFromCategory(categoryId, categoryName) {
    const { data } = await api(URL_MOVIES_CATEGORY(categoryId));

    const movies = data.results;
    console.log(movies);

    searchTitle.textContent = categoryName;
    createMoviesCards(movies, 'searchCards');
}

function displayMoviesFromCategory(categoryId, categoryName) {
    searchCards.innerHTML = '';
    moviesBody.style.display = 'none';
    searchBody.style.display = 'flex';
    getMoviesFromCategory(categoryId, categoryName);
}

