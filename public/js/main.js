// Тема
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
});

// Проверка авторизации
if (document.cookie.includes('jwt')) {
  fetch('/api/user/me')
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('userAvatar').textContent = 
          data.user.firstName.charAt(0) + data.user.lastName.charAt(0);
      }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    console.log('Приложение загружено');
});