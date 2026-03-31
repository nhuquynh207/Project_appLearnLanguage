let accounts = JSON.parse(localStorage.getItem("listAccount")) || [];

const saveData = () =>{
    localStorage.setItem("listAccount",JSON.stringify(accounts));
};

let inputEmailLoginElement = document.getElementById("input_emailLogin");
let inputPasswordLoginElement = document.getElementById("input_passwordLogin");
let formLogin = document.getElementById("loginForm");

let errorEmail=document.getElementById("emailError");
let errorPassword=document.getElementById("passwordError");

formLogin.addEventListener("submit",(e)=>{
    e.preventDefault();
    const emailVal = inputEmailLoginElement.value.trim();
    const passVal = inputPasswordLoginElement.value;

    errorEmail.innerText="";
    errorPassword.innerText="";
    const userFound = accounts.find(a => a.email === emailVal);
    if (!userFound) {
        errorEmail.innerText= 'Email không đúng hoặc chưa được đăng ký';
        return;
    }
    if (userFound.password !== passVal) {
        errorPassword.innerText='Mật khẩu không đúng';
        return;
    };
    alert("Đăng nhập thành công !");
    localStorage.setItem("currentUser", JSON.stringify(userFound));
    window.location.href="./index.html"
})
