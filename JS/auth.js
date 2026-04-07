let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];

let btnRegister = document.getElementById("btn_createAccount");
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
btnRegister.addEventListener("click", () => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        if (confirm("Bạn đang đăng nhập. Bạn có muốn đăng xuất để tạo tài khoản mới không?")) {
            localStorage.removeItem("currentUser");
            alert("Bạn đã đăng xuất tài khoản cũ. Mời bạn đăng ký tài khoản mới.");
            window.location.href = "./register.html"; 
        }
    } else {
        window.location.href = "./register.html";
    }
});