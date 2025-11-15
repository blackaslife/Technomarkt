class RangeSlider {
    constructor(container) {
        // Перевірка чи існує контейнер
        if (!container) {
            console.error('RangeSlider: контейнер не знайдено');
            return;
        }

        this.container = container;
        this.range = container.querySelector('.range');
        this.scale = container.querySelector('.scale');
        this.minToggle = container.querySelector('.min-toggle');
        this.maxToggle = container.querySelector('.max-toggle');
        
        // Шукаємо інпути в батьківській формі або документі
        const form = container.closest('form') || document;
        this.minInput = form.querySelector('.priceMinValue');
        this.maxInput = form.querySelector('.priceMaxValue');
        
        // Перевірка всіх необхідних елементів
        if (!this.range || !this.scale || !this.minToggle || !this.maxToggle || 
            !this.minInput || !this.maxInput) {
            console.error('RangeSlider: не всі необхідні елементи знайдено');
            console.log({
                range: !!this.range,
                scale: !!this.scale,
                minToggle: !!this.minToggle,
                maxToggle: !!this.maxToggle,
                minInput: !!this.minInput,
                maxInput: !!this.maxInput
            });
            return;
        }
        
        this.min = 0;
        this.max = 30000;
        this.minValue = 0;
        this.maxValue = 30000;
        this.rangeWidth = 0;
        
        this.init();
    }

    init() {
        this.calculateDimensions();
        this.setInitialPositions();
        this.attachEventListeners();
        
        // Пересчитати при зміні розміру вікна
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.calculateDimensions();
                this.updateTogglePositions();
            }, 150);
        });
    }

    calculateDimensions() {
        // Реальна ширина шкали (без padding)
        this.rangeWidth = this.range.offsetWidth;
        // Розмір повзунка
        this.toggleSize = this.minToggle.offsetWidth;
        // Обчислюємо мінімальну і максимальну позицію в відсотках
        this.minPercent = (this.toggleSize / 2 / this.rangeWidth) * 100;
        this.maxPercent = 100 - this.minPercent;
    }

    setInitialPositions() {
        // Встановлюємо початкові позиції з врахуванням розміру повзунка
        this.minToggle.style.left = this.minPercent + '%';
        this.maxToggle.style.left = this.maxPercent + '%';
        this.updateScale();
        this.updateValues();
    }

    updateScale() {
        const minPercent = parseFloat(this.minToggle.style.left);
        const maxPercent = parseFloat(this.maxToggle.style.left);
        
        this.scale.style.left = minPercent + '%';
        this.scale.style.width = (maxPercent - minPercent) + '%';
    }

    updateValues() {
        // Конвертуємо позицію повзунка в значення з врахуванням offset
        const minLeft = parseFloat(this.minToggle.style.left);
        const maxLeft = parseFloat(this.maxToggle.style.left);
        
        // Нормалізуємо до діапазону 0-100%
        const minNormalized = (minLeft - this.minPercent) / (this.maxPercent - this.minPercent);
        const maxNormalized = (maxLeft - this.minPercent) / (this.maxPercent - this.minPercent);
        
        this.minValue = Math.round(Math.max(0, Math.min(1, minNormalized)) * this.max);
        this.maxValue = Math.round(Math.max(0, Math.min(1, maxNormalized)) * this.max);
        
        this.minInput.value = this.minValue;
        this.maxInput.value = this.maxValue;
        
        // Оновити aria-valuenow якщо атрибути існують
        if (this.minToggle.hasAttribute('aria-valuenow')) {
            this.minToggle.setAttribute('aria-valuenow', this.minValue);
        }
        if (this.maxToggle.hasAttribute('aria-valuenow')) {
            this.maxToggle.setAttribute('aria-valuenow', this.maxValue);
        }
    }

    updateTogglePositions() {
        // Конвертуємо значення в позицію з врахуванням меж
        const minNormalized = this.minValue / this.max;
        const maxNormalized = this.maxValue / this.max;
        
        const minPercent = this.minPercent + minNormalized * (this.maxPercent - this.minPercent);
        const maxPercent = this.minPercent + maxNormalized * (this.maxPercent - this.minPercent);
        
        this.minToggle.style.left = minPercent + '%';
        this.maxToggle.style.left = maxPercent + '%';
        this.updateScale();
    }

    startDrag(toggle, clientX) {
        const startX = clientX;
        const isMin = toggle === this.minToggle;

        const onMove = (e) => {
            const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const rangeRect = this.range.getBoundingClientRect();
            const toggleX = currentX - rangeRect.left;
            let newPercent = (toggleX / this.rangeWidth) * 100;

            // Обмеження меж з врахуванням розміру повзунка
            if (isMin) {
                const maxLeft = parseFloat(this.maxToggle.style.left);
                newPercent = Math.max(this.minPercent, Math.min(newPercent, maxLeft - 1));
            } else {
                const minLeft = parseFloat(this.minToggle.style.left);
                newPercent = Math.min(this.maxPercent, Math.max(newPercent, minLeft + 1));
            }

            toggle.style.left = newPercent + '%';
            this.updateScale();
            this.updateValues();
        };

        const onEnd = () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchmove', onMove);
        document.addEventListener('touchend', onEnd);
    }

    attachEventListeners() {
        // Mouse events
        this.minToggle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.startDrag(this.minToggle, e.clientX);
        });

        this.maxToggle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.startDrag(this.maxToggle, e.clientX);
        });

        // Touch events
        this.minToggle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrag(this.minToggle, e.touches[0].clientX);
        });

        this.maxToggle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrag(this.maxToggle, e.touches[0].clientX);
        });

        // Keyboard navigation
        this.minToggle.addEventListener('keydown', (e) => this.handleKeydown(e, true));
        this.maxToggle.addEventListener('keydown', (e) => this.handleKeydown(e, false));

        // Input synchronization with debounce
        let inputTimeout;
        this.minInput.addEventListener('input', (e) => {
            clearTimeout(inputTimeout);
            inputTimeout = setTimeout(() => {
                let value = parseInt(e.target.value) || 0;
                value = Math.max(this.min, Math.min(value, this.maxValue));
                this.minValue = value;
                this.minInput.value = value;
                this.updateTogglePositions();
            }, 300);
        });

        this.maxInput.addEventListener('input', (e) => {
            clearTimeout(inputTimeout);
            inputTimeout = setTimeout(() => {
                let value = parseInt(e.target.value) || this.max;
                value = Math.min(this.max, Math.max(value, this.minValue));
                this.maxValue = value;
                this.maxInput.value = value;
                this.updateTogglePositions();
            }, 300);
        });
    }

    handleKeydown(e, isMin) {
        const step = e.shiftKey ? 1000 : 100;
        let changed = false;

        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowDown':
                e.preventDefault();
                if (isMin) {
                    this.minValue = Math.max(this.min, this.minValue - step);
                } else {
                    this.maxValue = Math.max(this.minValue, this.maxValue - step);
                }
                changed = true;
                break;
            case 'ArrowRight':
            case 'ArrowUp':
                e.preventDefault();
                if (isMin) {
                    this.minValue = Math.min(this.maxValue, this.minValue + step);
                } else {
                    this.maxValue = Math.min(this.max, this.maxValue + step);
                }
                changed = true;
                break;
            case 'Home':
                e.preventDefault();
                if (isMin) {
                    this.minValue = this.min;
                } else {
                    this.maxValue = this.minValue;
                }
                changed = true;
                break;
            case 'End':
                e.preventDefault();
                if (isMin) {
                    this.minValue = this.maxValue;
                } else {
                    this.maxValue = this.max;
                }
                changed = true;
                break;
        }

        if (changed) {
            this.updateTogglePositions();
        }
    }
}

// Ініціалізація слайдера
const rangeContainer = document.querySelector('.range-controls');
if (rangeContainer) {
    const slider = new RangeSlider(rangeContainer);
} else {
    console.error('Елемент .range-controls не знайдено на сторінці');
}