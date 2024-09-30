const categoriesId = [];

async function getMoviesCategoriesList() {
    categoriesContainer.innerHTML = ''
    Array(20).fill(0).forEach(o => {
        const categoryButtonSkeleton = create('div');
        categoryButtonSkeleton.classList.add('skeleton')
        categoriesContainer.appendChild(categoryButtonSkeleton);
    })

    containers.forEach((container, index) =>  {
        const sectionTitle = document.getElementById(`title${index+1}`);
        sectionTitle.className = 'skeleton skeleton-title';
        createMoviesCardsSkeleton(`movie-cards${index+1}`);        
    });

    try {
        const { data } = await api(URL_CATEGORIES('movie'));
        
        const categories = data.genres;
        categoriesContainer.innerHTML = '';
        
        
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
            sectionTitle.className = 'section-title';
            sectionTitle.textContent = findCategoryById(categories, id).name;
            getCategoryPreview(id, `movie-cards${index+1}`);
        });
    } catch (e) {
        console.error('Error getting movie: ' + e);
    }

}

async function getCategoryPreview(categoryId, containerId){
    try{
        const { data } = await api('/discover/movie', {
            params: {
                with_genres: categoryId
            }
        });
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        const movies = data.results;
        createMoviesCards(movies, containerId);
    } catch (e) {
        console.error("Error loading movies: " + e);
    }
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

