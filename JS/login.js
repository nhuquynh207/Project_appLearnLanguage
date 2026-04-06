let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];

const saveData = () =>{
    localStorage.setItem("listAccount", JSON.stringify(accounts));
};

let inputEmailLoginElement = document.getElementById("input_emailLogin");
let inputPasswordLoginElement = document.getElementById("input_passwordLogin");
let formLogin = document.getElementById("loginForm");

let errorEmail = document.getElementById("emailError");
let errorPassword = document.getElementById("passwordError");

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailVal = inputEmailLoginElement.value.trim();
    const passVal = inputPasswordLoginElement.value;

    let check = true;

    errorEmail.innerText = "";
    errorPassword.innerText = "";

    // check rỗng
    if (!emailVal) {
        errorEmail.innerText = "Email không được để trống";
        check = false;
    }

    if (!passVal) {
        errorPassword.innerText = "Mật khẩu không được để trống";
        check = false;
    }

    // tìm user
    const userFound = accounts.find(a => a.email === emailVal);

    if (!userFound) {
        errorEmail.innerText = "Email không đúng hoặc chưa được đăng ký";
        check = false;
    } else {
        // chỉ check password khi có user
        if (userFound.password !== passVal) {
            errorPassword.innerText = "Mật khẩu không đúng";
            check = false;
        }
    }

    if (!check) {
        return;
    }

    Swal.fire({
    title: "Good job!",
    text: "Đăng nhập thành công!",
    icon: "success"
    }).then(() => {
        localStorage.setItem("currentUser", JSON.stringify(userFound));
        window.location.href = "./index.html";
    });

});