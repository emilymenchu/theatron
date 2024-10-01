function handleIntersect (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.setAttribute('src', entry.target.dataset.img);
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
            console.log('intersected');
        }
    })
}
let observer = new IntersectionObserver(handleIntersect);

