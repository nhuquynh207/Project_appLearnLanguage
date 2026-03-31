let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];
let btnLogout = document.getElementById("btn_logout");
let btnLogin = document.getElementById("btn_getStarted");
let btnRegister = document.getElementById("btn_createAccount");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

btnLogout.addEventListener("click", () => {
    if (!currentUser) {
        alert("Bạn chưa đăng nhập ! ");
    } else {        
        if (confirm(`Bạn có chắc muốn đăng xuất không ?`)) {
            localStorage.removeItem("currentUser");
            alert("Đăng xuất thành công!");

            window.location.href = "./login.html"; 
        }
    }
});

btnLogin.addEventListener("click", () =>{
    if (currentUser) {
        alert("Bạn đã đăng nhập ! ");
    }else{
        window.location.href = "./login.html"; 
    }
});

btnRegister.addEventListener("click",()=>{
    if (confirm("Bạn đang đăng nhập . Bạn có muốn đăng xuất để tạo tài khoản mới không?")) {
        localStorage.removeItem("currentUser");
        alert("Bạn đã đăng xuất tài khoản cũ.Mời bạn nhập thông tin đăng ký mới.")
        window.location.href = "./register.html"; 
    }
})
