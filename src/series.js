async function getSeriesCategoriesList() {
    const { data } = await api(URL_CATEGORIES('tv'));
    
    const categories = data.genres;
    console.log(categories);

        categoriesContainer.innerHTML = '';

        categories.forEach(category => {
            const categoryButton = create('button');
            categoryButton.id = 'c' + category.id;
            categoryButton.textContent = category.name;
            // categoryButton.addEventListener('click', () => displayMoviesFromCategory(category.id, category.name));
            categoriesId.push(category.id);
            
            categoriesContainer.appendChild(categoryButton);
        });
       
}