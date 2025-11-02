// const sliderOnwebsite = document.querySelector('.news-list-onwebsite');
// const trackOnwebsite = sliderOnwebsite.querySelector('.carousel-track');
// const btnPrev = sliderOnwebsite.querySelector('.slider-button-left');
// const btnNext = sliderOnwebsite.querySelector('.slider-button-right');
// const slides = sliderOnwebsite.querySelectorAll('.carousel-track article');

// let index = 0;
// const visibleSlides = 2;
// const totalSlides = slides.length;

// function updateCarousele() {
//     const move = index * 470; // ширина одного слайда з урахуванням відступів
//     trackOnwebsite.style.transform = `translateX(-${move}px)`;
// }

// btnNext.addEventListener('click', () => {
//     if (index < totalSlides - visibleSlides) {
//         index++;
//     } else {
//         index = 0;
//     } 
//     updateCarousele();
// });

// btnPrev.addEventListener('click', () => {
//     if (index > 0) {
//         index--;
//     } else {
//         index = totalSlides - visibleSlides;
//     }
//     updateCarousele();
// });

// updateCarousele();

const sliderOnwebsite = document.querySelector('.news-list-onwebsite');
const trackOnwebsite = sliderOnwebsite.querySelector('.carousel-track');
const btnPrev = sliderOnwebsite.querySelector('.slider-button-left');
const btnNext = sliderOnwebsite.querySelector('.slider-button-right');
const slides = sliderOnwebsite.querySelectorAll('.carousel-track article');

let index = 0;
let visibleSlides = 2;
const totalSlides = slides.length;

// Функція для визначення кількості видимих слайдів
function getVisibleSlides() {
    return window.innerWidth <= 768 ? 1 : 2;
}

// Функція для отримання ширини слайда
function getSlideWidth() {
    return slides[0].offsetWidth;
}

function updateCarousel() {
    visibleSlides = getVisibleSlides();
    const slideWidth = getSlideWidth();
    const move = index * slideWidth;
    trackOnwebsite.style.transform = `translateX(-${move}px)`;
}

btnNext.addEventListener('click', () => {
    visibleSlides = getVisibleSlides();
    if (index < totalSlides - visibleSlides) {
        index++;
    } else {
        index = 0;
    } 
    updateCarousel();
});

btnPrev.addEventListener('click', () => {
    visibleSlides = getVisibleSlides();
    if (index > 0) {
        index--;
    } else {
        index = totalSlides - visibleSlides;
    }
    updateCarousel();
});

// Оновлення при зміні розміру вікна
window.addEventListener('resize', () => {
    index = 0; // Скидаємо позицію при зміні розміру
    updateCarousel();
});

// Ініціалізація
updateCarousel();