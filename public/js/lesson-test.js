// Открытие модального окна
document.getElementById('start-test').addEventListener('click', () => {
    document.getElementById('test-modal').style.display = 'block';
});

// Закрытие модального окна
document.querySelector('#test-modal .close').addEventListener('click', () => {
    document.getElementById('test-modal').style.display = 'none';
});

// Проверка ответов
document.getElementById('lesson-test').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const correctAnswers = {
        q1: "html",  // Правильный ответ для вопроса 1
        q2: "head",  // Пример для вопроса 2
        // ... добавьте остальные 18 вопросов
    };

    let score = 0;
    for (let i = 1; i <= 20; i++) {
        const userAnswer = document.querySelector(`input[name="q${i}"]`).value.trim().toLowerCase();
        if (userAnswer === correctAnswers[`q${i}`]) {
            score++;
        }
    }

    // Показываем результаты
    document.getElementById('test-score').textContent = score;
    document.getElementById('test-results').style.display = 'block';
    document.getElementById('lesson-test').style.display = 'none';
});

// Показать правильные ответы
document.getElementById('show-answers').addEventListener('click', () => {
    const correctAnswers = {
        q1: "html",
        q2: "head",
        // ...
    };

    let answersHtml = "<h4>Правильные ответы:</h4><ul>";
    for (let i = 1; i <= 20; i++) {
        answersHtml += `<li>Вопрос ${i}: <code>${correctAnswers[`q${i}`]}</code></li>`;
    }
    answersHtml += "</ul>";

    document.getElementById('correct-answers').innerHTML = answersHtml;
});