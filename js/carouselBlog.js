const sliderBlog = document.querySelector('.news-list-blog');
const trackBlog = sliderBlog.querySelector('.carousel-track');
const btnPrevBlog = sliderBlog.querySelector('.slider-button-left');
const btnNextBlog = sliderBlog.querySelector('.slider-button-right');
const slidesBlog = sliderBlog.querySelectorAll('.carousel-track article');

let indexBlog = 0;
const visibleSlidesBlog = 2;
const totalSlidesBlog = slidesBlog.length;

function updateCarouseleBlog() {
    const move = indexBlog * 470; // ширина одного слайда з урахуванням відступів
    trackBlog.style.transform = `translateX(-${move}px)`;
}

btnNextBlog.addEventListener('click', () => {
    if (indexBlog < totalSlidesBlog - visibleSlidesBlog) {
        indexBlog++;
    } else {
        indexBlog = 0;
    }
    updateCarouseleBlog();
});

btnPrevBlog.addEventListener('click', () => {
    if (indexBlog > 0) {
        indexBlog--;
    } else {
        indexBlog = totalSlidesBlog - visibleSlidesBlog;
    }
    updateCarouseleBlog();
});