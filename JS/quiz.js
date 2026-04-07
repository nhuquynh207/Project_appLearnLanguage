let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

let btnLogout = document.getElementById("btn_logout");
btnLogout.addEventListener("click", () => {
    if (!currentUser) {
        Swal.fire({
            icon: "warning",
            title: "Bạn cần đăng nhập!",
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "./login.html";
        });
        return;
    }

    Swal.fire({
        title: "Bạn có chắc muốn đăng xuất?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Đăng xuất",
        cancelButtonText: "Hủy"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("currentUser");

            Swal.fire({
                icon: "success",
                title: "Đăng xuất thành công!",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "./login.html";
            });
        }
    });
});

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
