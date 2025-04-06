let currentQuestion = 1;
const totalQuestions = 100;

function nextQuestion() {
    document.getElementById(`q${currentQuestion}`).classList.remove('active');
    currentQuestion++;
    document.getElementById('current-question').textContent = currentQuestion;
    
    if (currentQuestion <= totalQuestions) {
        document.getElementById(`q${currentQuestion}`).classList.add('active');
    }

    // Показываем кнопку "Завершить" на последнем вопросе
    if (currentQuestion === totalQuestions) {
        document.getElementById('submit-test').style.display = 'block';
    }
}

document.getElementById('final-test').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let score = 0;
    const correctAnswers = {
        q1: 'a',          // Правильный ответ для вопроса 1
        q2: 'color',       // Правильный ответ для вопроса 2
        // ... добавьте остальные ответы
    };

    // Проверяем ответы
    for (let i = 1; i <= totalQuestions; i++) {
        const questionName = `q${i}`;
        const userAnswer = document.querySelector(`input[name="${questionName}"]:checked`)?.value || 
                          document.querySelector(`input[name="${questionName}"]`)?.value.trim().toLowerCase();

        if (userAnswer === correctAnswers[questionName]) {
            score++;
        }
    }

    // Показываем результаты
    document.getElementById('score').textContent = score;
    document.getElementById('percentage').textContent = `${Math.round((score / totalQuestions) * 100)}%`;
    document.getElementById('results').style.display = 'block';
    document.getElementById('final-test').style.display = 'none';
});

function showAnswers() {
    const correctAnswers = {
        q1: '&lt;h1&gt;',
        q2: 'Свойство <strong>color</strong>',
        // ...
    };

    let answersHtml = '<h3>Правильные ответы:</h3><ul>';
    for (let i = 1; i <= totalQuestions; i++) {
        answersHtml += `<li><strong>Вопрос ${i}:</strong> ${correctAnswers[`q${i}`]}</li>`;
    }
    answersHtml += '</ul>';

    document.getElementById('correct-answers').innerHTML = answersHtml;
}