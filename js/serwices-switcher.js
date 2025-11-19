// Отримуємо всі кнопки та елементи списку
const buttons = document.querySelectorAll('.services-btn');
const listItems = document.querySelectorAll('.services-list-item');

// Функція для показу відповідного контенту
function showContent(index) {
    // Ховаємо всі елементи списку
    listItems.forEach(item => {
        item.classList.add('visually-hidden');
    });
    
    // Показуємо вибраний елемент
    listItems[index].classList.remove('visually-hidden');
    
    // Знімаємо фокус з усіх кнопок
    buttons.forEach(btn => {
        btn.blur();
    });
    
    // Додаємо фокус до активної кнопки (це активує стиль :focus)
    buttons[index].focus();
}

// Додаємо обробники подій для кожної кнопки
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        showContent(index);
    });
});

// Показуємо перший елемент при завантаженні сторінки
showContent(0);