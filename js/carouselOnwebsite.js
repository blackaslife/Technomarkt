const sliderOnwebsite = document.querySelector('.news-list-onwebsite');
const trackOnwebsite = sliderOnwebsite.querySelector('.carousel-track');
const btnPrev = sliderOnwebsite.querySelector('.slider-button-left');
const btnNext = sliderOnwebsite.querySelector('.slider-button-right');
const slides = sliderOnwebsite.querySelectorAll('.carousel-track article');

let index = 0;
const visibleSlides = 2;
const totalSlides = slides.length;

function updateCarousele() {
    const move = index * 470; // ширина одного слайда з урахуванням відступів
    trackOnwebsite.style.transform = `translateX(-${move}px)`;
}

btnNext.addEventListener('click', () => {
    if (index < totalSlides - visibleSlides) {
        index++;
    } else {
        index = 0;
    } 
    updateCarousele();
});

btnPrev.addEventListener('click', () => {
    if (index > 0) {
        index--;
    } else {
        index = totalSlides - visibleSlides;
    }
    updateCarousele();
});