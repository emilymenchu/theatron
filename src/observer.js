let observer = new IntersectionObserver(handleIntersect);
function handleIntersect (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.setAttribute('src', entry.target.dataset.img);
        }
    })
}