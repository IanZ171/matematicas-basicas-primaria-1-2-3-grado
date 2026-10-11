let currentLevel = 1;
let questions = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startQuiz(level) {
    currentLevel = level;
    questions = [];
    
    document.getElementById('home-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    
    let title = document.getElementById('quiz-title');
    title.innerText = level === 1 ? "Nivel 1: Sumas y Restas" : "Nivel 2: Operaciones Combinadas";

    // Generar 10 ejercicios distintos
    for (let i = 0; i < 10; i++) {
        let q = generateQuestion(level);
        questions.push(q);
    }

    renderQuestions();
}

function generateQuestion(level) {
    let num1, num2, op, text, answer;

    if (level === 1) {
        // Nivel 1: Solamente Sumas y Restas
        const ops = ['+', '-'];
        op = ops[getRandomInt(0, 1)];

        if (op === '+') {
            num1 = getRandomInt(1, 50);
            num2 = getRandomInt(1, 50);
            answer = num1 + num2;
        } else {
            num1 = getRandomInt(10, 50);
            num2 = getRandomInt(1, num1); // Evitar resultados negativos en primaria
            answer = num1 - num2;
        }
        text = `${num1} ${op} ${num2} = ?`;

    } else {
        // Nivel 2: Suma, Resta, Multiplicación y División simples
        const ops = ['+', '-', '*', '/'];
        op = ops[getRandomInt(0, 3)];

        if (op === '+') {
            num1 = getRandomInt(10, 100);
            num2 = getRandomInt(10, 100);
            answer = num1 + num2;
        } else if (op === '-') {
            num1 = getRandomInt(20, 100);
            num2 = getRandomInt(1, num1);
            answer = num1 - num2;
        } else if (op === '*') {
            num1 = getRandomInt(2, 10);
            num2 = getRandomInt(2, 10);
            answer = num1 * num2;
        } else if (op === '/') {
            // Asegurar división exacta
            num2 = getRandomInt(2, 10);
            let multiplier = getRandomInt(1, 10);
            num1 = num2 * multiplier;
            answer = multiplier;
        }
        text = `${num1} ${op === '*' ? '×' : (op === '/' ? '÷' : op)} ${num2} = ?`;
    }

    return { text, answer };
}

function renderQuestions() {
    let container = document.getElementById('questions-container');
    container.innerHTML = "";

    questions.forEach((q, index) => {
        container.innerHTML += `
            <div class="question-card">
                <span><b>${index + 1}.</b> ${q.text}</span>
                <input type="number" id="q-${index}" placeholder="?">
            </div>
        `;
    });
}

function submitQuiz() {
    let score = 0;

    questions.forEach((q, index) => {
        let userAns = document.getElementById(`q-${index}`).value;
        if (userAns !== "" && parseFloat(userAns) === q.answer) {
            score++;
        }
    });

    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    document.getElementById('score-display').innerText = `${score} / 10`;

    let feedback = document.getElementById('feedback-msg');
    if (score >= 7) {
        feedback.innerHTML = "🎉 <span style='color: green; font-weight: bold;'>¡Aprobado! ¡Muy bien hecho!</span>";
    } else {
        feedback.innerHTML = "❌ <span style='color: red; font-weight: bold;'>Desaprobado. Necesitas al menos 7 aciertos. ¡Empieza de nuevo!</span>";
    }
}

function resetQuiz() {
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('home-screen').classList.add('active');
}