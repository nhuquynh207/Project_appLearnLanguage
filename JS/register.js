let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];

const saveData = () => {
    localStorage.setItem("listAccount", JSON.stringify(accounts));
};

let inputFirstNameRegister = document.getElementById("input_firstNameRegister");
let inputLastNameRegister = document.getElementById("input_lastNameRegister");
let inputEmailRegister = document.getElementById("input_emailRegister");
let inputPasswordRegister = document.getElementById("input_passwordRegister");
let inputRePasswordRegister = document.getElementById("input_rePasswordRegister");
let registerForm = document.getElementById("registerForm");

let errorEmail = document.getElementById("emailError");
let errorPassword = document.getElementById("passwordError");
let errorRePassword = document.getElementById("rePasswordError");
let errorFirstName = document.getElementById("firstNameError");
let errorLastName = document.getElementById("lastNameError");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    errorEmail.innerText = "";
    errorPassword.innerText = "";
    errorRePassword.innerText = "";
    errorFirstName.innerText = "";
    errorLastName.innerText = "";

    let check = true;

    if (!inputFirstNameRegister.value.trim()) {
        errorFirstName.innerText = "Không được để trống";
        check = false;
    }

    if (!inputLastNameRegister.value.trim()) {
        errorLastName.innerText = "Không được để trống";
        check = false;
    }

    if (!inputEmailRegister.value.trim()) {
        errorEmail.innerText = "Email không được để trống";
        check = false;
    }

    if (!inputPasswordRegister.value) {
        errorPassword.innerText = "Mật khẩu không được để trống";
        check = false;
    }

    if (!inputRePasswordRegister.value) {
        errorRePassword.innerText = "Bạn phải nhập lại mật khẩu";
        check = false;
    }

    if (!check) return;

    let email = inputEmailRegister.value.trim();
    const parts = email.split("@");

    if (
        parts.length !== 2 ||
        parts[0].length === 0 ||
        parts[1].length === 0 ||
        !parts[1].includes(".") ||
        parts[1].startsWith(".") ||
        parts[1].endsWith(".")
    ) {
        errorEmail.innerText = "Email không hợp lệ";
        return;
    }

    if (accounts.some(a => a.email === email)) {
        errorEmail.innerText = "Email đã được sử dụng trước đó.";
        return;
    }

    let password = inputPasswordRegister.value;

    let hasLower = false;
    let hasUpper = false;
    let hasNumber = false;

    for (let char of password) {
        if (char >= 'a' && char <= 'z') hasLower = true;
        else if (char >= 'A' && char <= 'Z') hasUpper = true;
        else if (char >= '0' && char <= '9') hasNumber = true;
    }

    if (!hasLower || !hasUpper || !hasNumber) {
        errorPassword.innerText = 'Mật khẩu phải chứa in hoa, in thường, kí tự số';
        return;
    }

    if (password.length < 8) {
        errorPassword.innerText = 'Mật khẩu phải có ít nhất 8 ký tự.';
        return;
    }

    if (password !== inputRePasswordRegister.value) {
        errorRePassword.innerText = 'Mật khẩu không trùng khớp';
        return;
    }

    let newAccount = {
        id: Date.now().toString(),
        firstName: inputFirstNameRegister.value.trim(),
        lastName: inputLastNameRegister.value.trim(),
        email: email,
        password: password,
    };

    accounts.push(newAccount);
    saveData();

    alert("Đăng ký tài khoản thành công");
    window.location.href = "./login.html";
});