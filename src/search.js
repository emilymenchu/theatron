function chargeSearch (query) {
  mainPanel.style.display = 'none';
    categoriesBody.style.display = 'none';
    moviesBody.style.display = 'none';
    searchBody.style.display = 'flex';
    searchBody2.style.display = 'flex';
    backButtonSearch.style.display = 'flex';
    getMediaByQuery(query, 'movie');
    getMediaByQuery(query, 'tv');
    closePreview();
}

async function getMediaByQuery(query, mediaType) {
  searchTitle.textContent = "";
  searchTitle2.textContent = "";
  searchTitle.className = 'section-title skeleton skeleton-title';
  searchTitle2.className = 'section-title skeleton skeleton-title';
  createMoviesCardsSkeleton('searchCards');
  createMoviesCardsSkeleton('searchCards2');
  try {
    const { data } = await api(`search/${mediaType}`, {
      params: {
        query,
      }  
    });
    const media = data.results;

    searchTitle.className = 'section-title';
    searchTitle2.className= 'section-title';
    
    if (mediaType === 'movie'){
      searchTitle.textContent = `Movies related to ${query}`
      createMoviesCards(media, 'searchCards');
    } else {
      searchTitle2.textContent = `Series related to ${query}`
      createMoviesCards(media, 'searchCards2');
    }
  } catch (e) {
    console.error(`Error loading results for ${query}: ${e}`);
  }

}