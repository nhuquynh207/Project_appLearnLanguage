const startBtn = document.getElementById('start-btn');
const quizContent = document.getElementById('quiz-content');

startBtn.addEventListener('click', () => {
    if (quizContent.classList.contains('hidden')) {
        quizContent.classList.remove('hidden');
        startBtn.textContent = 'Stop Quiz';
        startBtn.style.backgroundColor = '#d4554b'; // Màu đỏ logout khi muốn dừng
    } else {
        quizContent.classList.add('hidden');
        startBtn.textContent = 'Start Quiz';
        startBtn.style.backgroundColor = 'rgba(34, 197, 94, 1)';
    }
});

// Hiệu ứng chọn đáp án
document.querySelectorAll('.option').forEach(opt => {
    opt.addEventListener('click', function() {
        this.parentElement.querySelectorAll('.option').forEach(o => {
            o.style.borderColor = '#edf2f7';
            o.style.backgroundColor = 'white';
        });
        this.style.borderColor = '#3b82f6';
        this.style.backgroundColor = '#eff6ff';
    });
});