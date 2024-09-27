function loadMoviesSkeleton (containerName) {
     createMoviesCardsSkeleton(containerName)
}


function createMoviesCardsSkeleton (containerName) {
    const movieCardsContainer = document.getElementById(containerName);

    movieCardsContainer.innerHTML = '';

     Array(20).fill('a').forEach(a => {
        const movieCard = create('div');
        movieCard.className = 'skeleton-movie-card';

        const posterContainer = create('div');
        posterContainer.className = 'skeleton-poster-container';

        const saveButton = create('button');
        saveButton.className = 'save-button';

        posterContainer.appendChild(saveButton);

        const movieTitleLike = create('div');
        movieTitleLike.className = 'movie-title-like';

        const movieTitle = create('p');
        movieTitle.className = 'movie-title';

        const likeButton = create('button');
        likeButton.className = 'like-button';

        movieTitleLike.appendChild(movieTitle);
        movieTitleLike.appendChild(likeButton);

        movieCard.appendChild(posterContainer);
        movieCard.appendChild(movieTitleLike);
      
        movieCardsContainer.appendChild(movieCard);
    });
}