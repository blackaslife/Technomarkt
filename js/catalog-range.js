// const range = document.querySelector('.range');
// const scale = document.querySelector('.scale');
// const minToggle = document.querySelector('.min-toggle');
// const maxToggle = document.querySelector('.max-toggle');
// const inputs = document.querySelectorAll('.range-value');

// let rangeWidth = 180; // ширина шкали, як у твоєму inline-style
// let min = 0;
// let max = 30000;
// let minValue = 0;
// let maxValue = 30000;

// // Початкові позиції бігунків
// minToggle.style.left = '0px';
// maxToggle.style.left = rangeWidth + 'px';

// function updateScale() {
//   const minLeft = parseInt(minToggle.style.left);
//   const maxLeft = parseInt(maxToggle.style.left);
//   const scaleWidth = maxLeft - minLeft;
//   scale.style.left = minLeft + 'px';
//   scale.style.width = scaleWidth + 'px';
// }

// // Функція оновлення значень при русі
// function updateValues() {
//   const minLeft = parseInt(minToggle.style.left);
//   const maxLeft = parseInt(maxToggle.style.left);
//   minValue = Math.round((minLeft / rangeWidth) * max);
//   maxValue = Math.round((maxLeft / rangeWidth) * max);
//   inputs[0].value = minValue;
//   inputs[1].value = maxValue;
// }

// function startDrag(toggle, event) {
//   event.preventDefault();
//   const startX = event.clientX;
//   const startLeft = parseInt(toggle.style.left);

//   function onMouseMove(e) {
//     const delta = e.clientX - startX;
//     let newLeft = startLeft + delta;

//     // Обмеження межами
//     if (toggle === minToggle) {
//       newLeft = Math.max(0, Math.min(newLeft, parseInt(maxToggle.style.left) - 10));
//     } else {
//       newLeft = Math.min(rangeWidth, Math.max(newLeft, parseInt(minToggle.style.left) + 10));
//     }

//     toggle.style.left = newLeft + 'px';
//     updateScale();
//     updateValues();
//   }

//   function onMouseUp() {
//     document.removeEventListener('mousemove', onMouseMove);
//     document.removeEventListener('mouseup', onMouseUp);
//   }

//   document.addEventListener('mousemove', onMouseMove);
//   document.addEventListener('mouseup', onMouseUp);
// }

// minToggle.addEventListener('mousedown', e => startDrag(minToggle, e));
// maxToggle.addEventListener('mousedown', e => startDrag(maxToggle, e));

// // Синхронізація при введенні вручну
// inputs[0].addEventListener('input', e => {
//   minValue = parseInt(e.target.value) || 0;
//   if (minValue < 0) minValue = 0;
//   if (minValue > maxValue) minValue = maxValue;
//   const pos = (minValue / max) * rangeWidth;
//   minToggle.style.left = pos + 'px';
//   updateScale();
// });

// inputs[1].addEventListener('input', e => {
//   maxValue = parseInt(e.target.value) || max;
//   if (maxValue > max) maxValue = max;
//   if (maxValue < minValue) maxValue = minValue;
//   const pos = (maxValue / max) * rangeWidth;
//   maxToggle.style.left = pos + 'px';
//   updateScale();
// });

// updateScale();
// updateValues();


// Реалізація повнофункціонального слайдера діапазону


// class RangeSlider {
//     constructor(container) {
//         // Перевірка чи існує контейнер
//         if (!container) {
//             console.error('RangeSlider: контейнер не знайдено');
//             return;
//         }

//         this.container = container;
//         this.range = container.querySelector('.range');
//         this.scale = container.querySelector('.scale');
//         this.minToggle = container.querySelector('.min-toggle');
//         this.maxToggle = container.querySelector('.max-toggle');
        
//         // Шукаємо інпути в батьківській формі або документі
//         const form = container.closest('form') || document;
//         this.minInput = form.querySelector('.priceMinValue');
//         this.maxInput = form.querySelector('.priceMaxValue');
        
//         // Перевірка всіх необхідних елементів
//         if (!this.range || !this.scale || !this.minToggle || !this.maxToggle || 
//             !this.minInput || !this.maxInput) {
//             console.error('RangeSlider: не всі необхідні елементи знайдено');
//             console.log({
//                 range: !!this.range,
//                 scale: !!this.scale,
//                 minToggle: !!this.minToggle,
//                 maxToggle: !!this.maxToggle,
//                 minInput: !!this.minInput,
//                 maxInput: !!this.maxInput
//             });
//             return;
//         }
        
//         this.min = 0;
//         this.max = 30000;
//         this.minValue = 0;
//         this.maxValue = 30000;
//         this.rangeWidth = 0;
        
//         this.init();
//     }

//     init() {
//         this.calculateDimensions();
//         this.setInitialPositions();
//         this.attachEventListeners();
        
//         // Пересчитати при зміні розміру вікна
//         let resizeTimeout;
//         window.addEventListener('resize', () => {
//             clearTimeout(resizeTimeout);
//             resizeTimeout = setTimeout(() => {
//                 this.calculateDimensions();
//                 this.updateTogglePositions();
//             }, 150);
//         });
//     }

//     calculateDimensions() {
//         this.rangeWidth = this.range.offsetWidth;
//     }

//     setInitialPositions() {
//         this.minToggle.style.left = '0%';
//         this.maxToggle.style.left = '100%';
//         this.updateScale();
//         this.updateValues();
//     }

//     updateScale() {
//         const minPercent = parseFloat(this.minToggle.style.left);
//         const maxPercent = parseFloat(this.maxToggle.style.left);
        
//         this.scale.style.left = minPercent + '%';
//         this.scale.style.width = (maxPercent - minPercent) + '%';
//     }

//     updateValues() {
//         const minPercent = parseFloat(this.minToggle.style.left) / 100;
//         const maxPercent = parseFloat(this.maxToggle.style.left) / 100;
        
//         this.minValue = Math.round(minPercent * this.max);
//         this.maxValue = Math.round(maxPercent * this.max);
        
//         this.minInput.value = this.minValue;
//         this.maxInput.value = this.maxValue;
        
//         // Оновити aria-valuenow якщо атрибути існують
//         if (this.minToggle.hasAttribute('aria-valuenow')) {
//             this.minToggle.setAttribute('aria-valuenow', this.minValue);
//         }
//         if (this.maxToggle.hasAttribute('aria-valuenow')) {
//             this.maxToggle.setAttribute('aria-valuenow', this.maxValue);
//         }
//     }

//     updateTogglePositions() {
//         const minPercent = (this.minValue / this.max) * 100;
//         const maxPercent = (this.maxValue / this.max) * 100;
        
//         this.minToggle.style.left = minPercent + '%';
//         this.maxToggle.style.left = maxPercent + '%';
//         this.updateScale();
//     }

//     startDrag(toggle, clientX) {
//         const startX = clientX;
//         const startPercent = parseFloat(toggle.style.left);
//         const isMin = toggle === this.minToggle;

//         const onMove = (e) => {
//             const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
//             const deltaX = currentX - startX;
//             const deltaPercent = (deltaX / this.rangeWidth) * 100;
//             let newPercent = startPercent + deltaPercent;

//             // Обмеження меж
//             if (isMin) {
//                 const maxPercent = parseFloat(this.maxToggle.style.left);
//                 newPercent = Math.max(0, Math.min(newPercent, maxPercent - 1));
//             } else {
//                 const minPercent = parseFloat(this.minToggle.style.left);
//                 newPercent = Math.min(100, Math.max(newPercent, minPercent + 1));
//             }

//             toggle.style.left = newPercent + '%';
//             this.updateScale();
//             this.updateValues();
//         };

//         const onEnd = () => {
//             document.removeEventListener('mousemove', onMove);
//             document.removeEventListener('mouseup', onEnd);
//             document.removeEventListener('touchmove', onMove);
//             document.removeEventListener('touchend', onEnd);
//         };

//         document.addEventListener('mousemove', onMove);
//         document.addEventListener('mouseup', onEnd);
//         document.addEventListener('touchmove', onMove);
//         document.addEventListener('touchend', onEnd);
//     }

//     attachEventListeners() {
//         // Mouse events
//         this.minToggle.addEventListener('mousedown', (e) => {
//             e.preventDefault();
//             this.startDrag(this.minToggle, e.clientX);
//         });

//         this.maxToggle.addEventListener('mousedown', (e) => {
//             e.preventDefault();
//             this.startDrag(this.maxToggle, e.clientX);
//         });

//         // Touch events
//         this.minToggle.addEventListener('touchstart', (e) => {
//             e.preventDefault();
//             this.startDrag(this.minToggle, e.touches[0].clientX);
//         });

//         this.maxToggle.addEventListener('touchstart', (e) => {
//             e.preventDefault();
//             this.startDrag(this.maxToggle, e.touches[0].clientX);
//         });

//         // Keyboard navigation
//         this.minToggle.addEventListener('keydown', (e) => this.handleKeydown(e, true));
//         this.maxToggle.addEventListener('keydown', (e) => this.handleKeydown(e, false));

//         // Input synchronization with debounce
//         let inputTimeout;
//         this.minInput.addEventListener('input', (e) => {
//             clearTimeout(inputTimeout);
//             inputTimeout = setTimeout(() => {
//                 let value = parseInt(e.target.value) || 0;
//                 value = Math.max(this.min, Math.min(value, this.maxValue));
//                 this.minValue = value;
//                 this.minInput.value = value;
//                 this.updateTogglePositions();
//             }, 300);
//         });

//         this.maxInput.addEventListener('input', (e) => {
//             clearTimeout(inputTimeout);
//             inputTimeout = setTimeout(() => {
//                 let value = parseInt(e.target.value) || this.max;
//                 value = Math.min(this.max, Math.max(value, this.minValue));
//                 this.maxValue = value;
//                 this.maxInput.value = value;
//                 this.updateTogglePositions();
//             }, 300);
//         });
//     }

//     handleKeydown(e, isMin) {
//         const step = e.shiftKey ? 1000 : 100;
//         let changed = false;

//         switch(e.key) {
//             case 'ArrowLeft':
//             case 'ArrowDown':
//                 e.preventDefault();
//                 if (isMin) {
//                     this.minValue = Math.max(this.min, this.minValue - step);
//                 } else {
//                     this.maxValue = Math.max(this.minValue, this.maxValue - step);
//                 }
//                 changed = true;
//                 break;
//             case 'ArrowRight':
//             case 'ArrowUp':
//                 e.preventDefault();
//                 if (isMin) {
//                     this.minValue = Math.min(this.maxValue, this.minValue + step);
//                 } else {
//                     this.maxValue = Math.min(this.max, this.maxValue + step);
//                 }
//                 changed = true;
//                 break;
//             case 'Home':
//                 e.preventDefault();
//                 if (isMin) {
//                     this.minValue = this.min;
//                 } else {
//                     this.maxValue = this.minValue;
//                 }
//                 changed = true;
//                 break;
//             case 'End':
//                 e.preventDefault();
//                 if (isMin) {
//                     this.minValue = this.maxValue;
//                 } else {
//                     this.maxValue = this.max;
//                 }
//                 changed = true;
//                 break;
//         }

//         if (changed) {
//             this.updateTogglePositions();
//         }
//     }
// }

// // Ініціалізація слайдера
// const rangeContainer = document.querySelector('.range-controls');
// if (rangeContainer) {
//     const slider = new RangeSlider(rangeContainer);
// } else {
//     console.error('Елемент .range-controls не знайдено на сторінці');
// }

// Реалізація простого слайдера діапазону

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