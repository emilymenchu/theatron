const seriesCategoriesId = [];

async function getSeriesCategoriesList() {
    const { data } = await api(URL_CATEGORIES('tv'));
    
    const categories = data.genres;
        categoriesContainer.innerHTML = '';

        categories.forEach(category => {
            const categoryButton = create('button');
            categoryButton.id = 'c' + category.id;
            categoryButton.textContent = category.name;
            categoryButton.addEventListener('click', () => {
                location.hash = `#series-category=${category.id}-${category.name}`;
            });
            seriesCategoriesId.push(category.id);
            
            categoriesContainer.appendChild(categoryButton);
        });

        const ids = getRandom5Ids(seriesCategoriesId);

        ids.forEach((id, index) => {
            const sectionTitle = document.getElementById(`title${index+1}`);
            sectionTitle.textContent = findCategoryById(categories, id).name;
            getSeriesCategoriesPreview(id, `movie-cards${index+1}`);
        });       
        
}
async function getSeriesCategoriesPreview(categoryId, containerId){
    const { data } = await api('/discover/tv', {
        params: {
            with_genres: categoryId
        }
    });

    const series = data.results;
    createMoviesCards(series, containerId);
}

async function getSeriesByCategory(categoryId, categoryName){

    if (categoryName === 'Sci'){
        searchTitle.textContent = 'Sci-Fi & Fantasy';
    } else {
        searchTitle.textContent = categoryName;
    }

    const { data } = await api('/discover/tv', {
        params: {
            with_genres: categoryId
        }
    });

    const series = data.results;

    createMoviesCards(series, 'searchCards');
}