function loadMoviesSkeleton (containerName) {
     createMoviesCardsSkeleton(containerName)
}


function createMoviesCardsSkeleton (containerName) {
    const movieCardsContainer = document.getElementById(containerName);

    movieCardsContainer.innerHTML = '';

     Array(20).fill('a').forEach(movie => {
        const movieCard = create('div');
        movieCard.className = 'movie-card';

        const posterContainer = create('div');
        posterContainer.className = 'poster-container';

        const saveButton = create('button');
        saveButton.className = 'save-button';

        saveButton.appendChild(saveIcon);
        posterContainer.appendChild(saveButton);

        const movieTitleLike = create('div');
        movieTitleLike.className = 'movie-title-like';

        const movieTitle = create('p');
        movieTitle.className = 'movie-title';
        if (movie.title === undefined) {
            movieTitle.textContent = movie.name;
        } else {
            movieTitle.textContent = movie.title;
        }

        const likeButton = create('button');
        likeButton.className = 'like-button';

        const likeIcon = create('img');
        likeIcon.className = 'like-icon';
        likeIcon.alt = 'like';
        likeIcon.src = './public/likeIcon.svg';

        likeButton.appendChild(likeIcon);

        movieTitleLike.appendChild(movieTitle);
        movieTitleLike.appendChild(likeButton);

        movieCard.appendChild(posterContainer);
        movieCard.appendChild(movieTitleLike);
      
        movieCardsContainer.appendChild(movieCard);
    });
}