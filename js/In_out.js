const switch_signin_btn = document.getElementById("signin-btn");
const switch_signup_btn = document.getElementById("signup-btn");
const signin_form = document.getElementById("signin-form");
const signup_form = document.getElementById("signup-form");

function signin() {
    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;

    const userData = localStorage.getItem(email);
    if (userData) {
        const userObj = JSON.parse(userData);
        if (userObj.password === password) {
            alert("Đăng nhập thành công 🌿");
            localStorage.setItem("currentUser", email);
            location.href = "index.html"; // hoặc đổi sang trang chính
        } else {
            alert("Sai mật khẩu 🍂");
            return;
        }
    } else {
        alert("Email không tồn tại trong hệ thống 🌱");
        return;
    }
}

signin_form.addEventListener("submit", function (event) {
    event.preventDefault();
    signin();
});

function validateSignUpData(username, email, password, confirmPassword) {
    if (username.includes(" ")) {
        alert("Tên người dùng không được chứa khoảng trắng 🍃");
        return false;
    }
    if (confirmPassword !== password) {
        alert("Mật khẩu và xác nhận không trùng khớp 🌾");
        return false;
    }
    if (localStorage.getItem(email)) {
        alert("Email đã được sử dụng 🌿");
        return false;
    }
    return true;
}

function signup() {
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const isValid = validateSignUpData(username, email, password, confirmPassword);
    if (isValid) {
        const newUser = { username, email, password };
        localStorage.setItem(email, JSON.stringify(newUser));
        alert("Đăng ký thành công 🌱");
        switch_signin_btn.click();
    }
}

signup_form.addEventListener("submit", function (event) {
    event.preventDefault();
    signup();
});

switch_signin_btn.addEventListener("click", function () {
    signin_form.style.display = "block";
    signup_form.style.display = "none";
    this.classList.add("active");
    switch_signup_btn.classList.remove("active");
});

switch_signup_btn.addEventListener("click", function () {
    signin_form.style.display = "none";
    signup_form.style.display = "block";
    this.classList.add("active");
    switch_signin_btn.classList.remove("active");
});
