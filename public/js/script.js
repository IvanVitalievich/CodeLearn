// Анимация карточек курсов
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.course-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.2}s`;
    });
});

