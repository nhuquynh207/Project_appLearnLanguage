let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];

let btnLogout = document.getElementById("btn_logout");
let btnRegister = document.getElementById("btn_createAccount");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));


btnLogout.addEventListener("click", () => {
        
        if (confirm(`Bạn có chắc muốn đăng xuất không ?`)) {
            localStorage.removeItem("currentUser");
            alert("Đăng xuất thành công!");

            window.location.href = "./login.html"; 
        }
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