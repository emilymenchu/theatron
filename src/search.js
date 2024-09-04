async function getMediaByQuery(query, mediaType) {
    const { data } = await api(`search/${mediaType}`, {
      params: {
        query,
      }  
    });

    const media = data.results;

    if (mediaType === 'movie'){
        searchTitle.textContent = `Movies related to ${query}`
        createMoviesCards(media, 'searchCards');
    } else {
        searchTitle2.textContent = `Series related to ${query}`
        createMoviesCards(media, 'searchCards2');
    }

}