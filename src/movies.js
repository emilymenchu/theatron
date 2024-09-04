const categoriesId = [];

async function getMoviesCategoriesList() {
    const { data } = await api(URL_CATEGORIES('movie'));

    const categories = data.genres;

        categoriesContainer.innerHTML = '';
        
        containers.forEach(container => {
            container.innerHTML = '';
        })

        categories.forEach(category => {
            const categoryButton = create('button');
            categoryButton.id = 'c' + category.id;
            categoryButton.textContent = category.name;
            categoryButton.addEventListener('click', () => location.hash = `#movies-category=${category.id}-${category.name}`);
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
    const { data } = await api('/discover/movie', {
        params: {
            with_genres: categoryId
        }
    });

    const movies = data.results;
    createMoviesCards(movies, containerId);
}

function getRandom5Ids (ids) {
    let selected = [];
    let idsCopy = [...ids]

    for (let index = 0; index < 5; index++) {
        const randomId = Math.floor(Math.random() * idsCopy.length);
        selected.push(idsCopy.splice(randomId, 1)[0]);        
    }
    return selected;
}

function findCategoryById(categories, id) {
    return categories.find(category => category.id === id);
}

async function getMoviesByCategory(categoryId, categoryName) {
    searchTitle.textContent = categoryName;

    const { data } = await api('/discover/movie', {
        params: {
            with_genres: categoryId
        }
    });

    const movies = data.results;
    createMoviesCards(movies, 'searchCards');
}

