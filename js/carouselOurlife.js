const sliderOurlife = document.querySelector('.news-list-ourlife');
const trackOurlife = sliderOurlife.querySelector('.carousel-track');
const btnPrevOurlife = sliderOurlife.querySelector('.slider-button-left');
const btnNextOurlife = sliderOurlife.querySelector('.slider-button-right');
const slidesOurlife = sliderOurlife.querySelectorAll('.carousel-track article');

let indexOurlife = 0;
const visibleSlidesOurlife = 2;
const totalSlidesOurlife = slidesOurlife.length;

function updateCarouseleOurlife() {
    const move = indexOurlife * 470; // ширина одного слайда з урахуванням відступів
    trackOurlife.style.transform = `translateX(-${move}px)`;
}

btnNextOurlife.addEventListener('click', () => {
    if (indexOurlife < totalSlidesOurlife - visibleSlidesOurlife) {
        indexOurlife++;
    } else {
        indexOurlife = 0;
    }
    updateCarouseleOurlife();
});

btnPrevOurlife.addEventListener('click', () => {
    if (indexOurlife > 0) {
        indexOurlife--;
    } else {
        indexOurlife = totalSlidesOurlife - visibleSlidesOurlife;
    }
    updateCarouseleOurlife();
});