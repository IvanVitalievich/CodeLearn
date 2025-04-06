const modal = document.getElementById('chat-modal');
const btn = document.getElementById('chat-button');
const closeBtn = document.querySelector('.close');

btn.onclick = () => modal.style.display = 'block';
closeBtn.onclick = () => modal.style.display = 'none';

// Закрытие при клике вне окна
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};