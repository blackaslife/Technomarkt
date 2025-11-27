 class ProductsCarousel {
            constructor() {
                this.list = document.getElementById('productsList');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.dotsContainer = document.getElementById('carouselDots');
                this.currentSlide = 0;
                this.itemsPerSlide = 2;
                this.totalItems = this.list.children.length;
                this.totalSlides = Math.ceil(this.totalItems / this.itemsPerSlide);
                
                this.init();
            }

            init() {
                if (window.innerWidth <= 768) {
                    this.createDots();
                    this.updateCarousel();
                    this.attachEvents();
                }

                window.addEventListener('resize', () => {
                    if (window.innerWidth <= 768) {
                        this.createDots();
                        this.updateCarousel();
                    } else {
                        this.list.style.transform = 'translateX(0)';
                    }
                });
            }

            createDots() {
                this.dotsContainer.innerHTML = '';
                for (let i = 0; i < this.totalSlides; i++) {
                    const dot = document.createElement('button');
                    dot.classList.add('carousel-dot');
                    if (i === 0) dot.classList.add('active');
                    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                    dot.addEventListener('click', () => this.goToSlide(i));
                    this.dotsContainer.appendChild(dot);
                }
            }

            attachEvents() {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                this.nextBtn.addEventListener('click', () => this.nextSlide());

                let touchStartX = 0;
                let touchEndX = 0;

                this.list.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                });

                this.list.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    this.handleSwipe(touchStartX, touchEndX);
                });
            }

            handleSwipe(startX, endX) {
                const swipeThreshold = 50;
                const diff = startX - endX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            }

            updateCarousel() {
                if (window.innerWidth <= 768) {
                    const translateValue = -this.currentSlide * 100;
                    this.list.style.transform = `translateX(${translateValue}%)`;
                    
                    this.prevBtn.disabled = this.currentSlide === 0;
                    this.nextBtn.disabled = this.currentSlide >= this.totalSlides - 1;

                    const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === this.currentSlide);
                    });
                }
            }

            prevSlide() {
                if (this.currentSlide > 0) {
                    this.currentSlide--;
                    this.updateCarousel();
                }
            }

            nextSlide() {
                if (this.currentSlide < this.totalSlides - 1) {
                    this.currentSlide++;
                    this.updateCarousel();
                }
            }

            goToSlide(index) {
                this.currentSlide = index;
                this.updateCarousel();
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            new ProductsCarousel();
        });