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
        posterContainer.className = 'skeleton-poster-container skeleton';

        const saveButton = create('button');
        saveButton.className = 'save-button skeleton';

        posterContainer.appendChild(saveButton);

        const movieTitleLike = create('div');
        movieTitleLike.className = 'movie-title-like';


        const movieTitle = create('p');
        movieTitle.className = 'skeleton skeleton-text';

        const likeButton = create('button');
        likeButton.className = 'like-button skeleton';

        movieTitleLike.appendChild(movieTitle);
        movieTitleLike.appendChild(likeButton);

        movieCard.appendChild(posterContainer);
        movieCard.appendChild(movieTitleLike);
      
        movieCardsContainer.appendChild(movieCard);
    });
}