const listsName = ['movie_watch_list', 'series_watch_list', 'favorite_movies', 'favorite_series'];

const buttonTypes = {save: 'save', like: 'like'};

function chargeMyLists() {
    const title = document.querySelectorAll('.section-title');
    let translations = myListTranslations('✨');
    let titles = Object.values(translations[language]);
    myListTitle.textContent = titles[0];
    for (let index = 0; index < 4; index++) {
        title[index].textContent = titles[index + 1];
        title[index].className = 'section-title';
    }

    createListCards();
}

function createListCards () {
    listsName.forEach((listName, index) => {
        const list =  JSON.parse(localStorage.getItem(listName));
        let mediaList = Object.values(list);

        createMoviesCardsSkeleton(`movie-cards${index + 1}`);
        cleanContainer(`movie-cards${index + 1}`);
        
        if (mediaList.length >= 1){
            createMoviesCards(mediaList, `movie-cards${index + 1}`);
        } else {
            const noMediaText = create('h3');
            noMediaText.style.fontFamily = 'var(--body-text)';
            noMediaText.style.fontWeight = 100;

            noMediaText.textContent = 'You have not added media to this list yet';
            const container = document.getElementById(`movie-cards${index + 1}`);
            container.appendChild(noMediaText);
        }
    })
}

function setLists () {
    listsName.forEach(listName => {
        const list = JSON.parse(localStorage.getItem(listName));
        if (!list) {
            localStorage.setItem(listName, '{}');
        }
    })
}

setLists();

function addOrRemoveMedia (media, listName, icon, buttonType) {
    const list = JSON.parse(localStorage.getItem(listName));

    if (list[media.id]) {
        list[media.id] = undefined;

        if (buttonType === 'save'){
            icon.src = './public/saveIcon.svg';
        } else {
            icon.src = './public/likeIcon.svg';
        }
        console.log('media removed');
    } else {
        list[media.id] = media;
        if (buttonType === 'save'){
            icon.src = './public/savedIcon.svg';
        } else {
            icon.src = './public/likedIcon.svg';
        }
        console.log('media added');
    }

    localStorage.setItem(listName, JSON.stringify(list));

    if (location.hash.startsWith('#my-list')) {
        createListCards();
        console.log('refreshed')
    }

}

function setButtonSrc (id, list, icon, buttonType) {
    if (!list[id]) {
        if (buttonType === 'save'){
            icon.src = './public/saveIcon.svg';
        } else {
            icon.src = './public/likeIcon.svg';
        }
    } else {
        if (buttonType === 'save'){
            icon.src = './public/savedIcon.svg';
        } else {
            icon.src = './public/likedIcon.svg';
        }
    }
}