const onwebsite = document.querySelector('.carousel-track');
const btnPrev = document.querySelector('.slider-button-left');
const btnNext = document.querySelector('.slider-button-right');
const slides = document.querySelectorAll('.carousel-track article');

let index = 0;
const visibleSlides = 2;
const totalSlides = slides.length;

function updateCarousele() {
    const move = index * 451; // ширина одного слайда з урахуванням відступів
    onwebsite.style.transform = `translateX(-${move}px)`;
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