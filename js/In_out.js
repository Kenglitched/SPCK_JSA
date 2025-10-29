const signinBtn = document.getElementById("signin-btn");
const signupBtn = document.getElementById("signup-btn");
const signinForm = document.getElementById("signin-form");
const signupForm = document.getElementById("signup-form");
const formTitle = document.getElementById("form-title");

// Switch forms
signinBtn.onclick = () => {
    signinForm.style.display = "block";
    signupForm.style.display = "none";
    formTitle.innerText = "Sign In";
    signinBtn.classList.add("active");
    signupBtn.classList.remove("active");
};

signupBtn.onclick = () => {
    signinForm.style.display = "none";
    signupForm.style.display = "block";
    formTitle.innerText = "Sign Up";
    signupBtn.classList.add("active");
    signinBtn.classList.remove("active");
};

// Email check
function isEmailValid(email) {
    return email.includes("@") && email.includes(".");
}

// Sign In validation
signinForm.onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;

    if (!isEmailValid(email)) return alert("Invalid email!");
    if (password.length < 6) return alert("Password must be 6+ characters!");
    alert("Signed in successfully!");
    signinForm.reset();
};

// Sign Up validation
signupForm.onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (username.length < 3) return alert("Username too short!");
    if (!isEmailValid(email)) return alert("Invalid email!");
    if (password.length < 6) return alert("Password must be 6+ characters!");
    if (password !== confirm) return alert("Passwords do not match!");
    alert("Account created successfully!");
    signupForm.reset();
    signinBtn.click(); // Switch back to sign in
};
