let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];

const saveData = () =>{
    localStorage.setItem("listAccount",JSON.stringify(accounts));
};



// đăng ký tài khoản mới
let buttonRegisterElement= document.getElementById("Register_btn");
let inputFirstNameRegister=document.getElementById("input_firstNameRegister");
let inputLastNameRegister = document.getElementById("input_lastNameRegister");
let inputEmailRegister = document.getElementById("input_emailRegister");
let inputPasswordRegister = document.getElementById("input_passwordRegister");
let inputRePasswordRegister =document.getElementById("input_rePasswordRegister");
let registerForm=document.getElementById("registerForm");

let errorEmail=document.getElementById("emailError");
let errorPassword=document.getElementById("passwordError");
let errorRePassword=document.getElementById("rePasswordError");

registerForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    errorEmail.innerText="";
    errorPassword.innerText="";
    errorRePassword.innerText="";
    
    //kiểm tra định dạng email
    const emailVal = inputEmailRegister.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
        errorEmail.innerText = "Định dạng email không hợp lệ.";
        return;
    }else if (accounts.some(a=>a.email === inputEmailRegister.value.trim())) {
        errorEmail.innerText = "Email đã được sử dụng trước đó.";
        return;
    };
    
    //Kiểm tra mật khẩu
    let password = inputPasswordRegister.value;

    if (password.length < 8) {
        errorPassword.innerText='Mật khẩu phải có ít nhất 8 ký tự.';
        return;
    }
    
    let hasLower = false;
    let hasUpper = false;
    let hasNumber = false;
    
    for (let char of password) {
        if (char >= 'a' && char <= 'z') {
            hasLower = true;
        } else if (char >= 'A' && char <= 'Z') {
            hasUpper = true;
        } else if (char >= '0' && char <= '9') {
            hasNumber = true;
        }
    }

    if (!hasLower || !hasUpper || !hasNumber) {
        errorPassword.innerText= 'Mật khẩu phải chứa in hoa, in thường, kí tự số';
        return;
    }
    // let passwordValidate=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    //  if (!passwordValidate.test(inputPasswordRegister.value)) {
    //     errorPassword.innerText= 'Mật khẩu phải chứa in hoa, in thường, kí tự số';
    //     return;
    // };
    
    //kiểm tra nhập mật khẩu
    if (inputPasswordRegister.value !== inputRePasswordRegister.value) {
        errorRePassword.innerText= 'Mật khẩu không trùng khớp với mật khẩu đã nhập';
        return;
    }
    
    
    
    let newAccount = {
        id: Date.now().toString(),
        firstName: inputFirstNameRegister.value.trim(),
        lastName: inputLastNameRegister.value.trim(),
        email: inputEmailRegister.value.trim(),
        password: inputPasswordRegister.value,
    };
    
    accounts.push(newAccount);
    saveData();
    alert("Đăng ký tài khoản thành công");
    window.location.href="./login.html"
    
})

