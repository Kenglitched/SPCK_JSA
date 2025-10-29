const signin_link = document.getElementById("signin_link");
const signout_link = document.getElementById("signout_link");

if (localStorage.getItem("currentUser")) {
    signin_link.style.display = "none";
    signout_link.style.display = "block";
} else {
    signin_link.style.display = "block";
    signout_link.style.display = "none";
}

signout_link.addEventListener("click", function() {
    localStorage.removeItem("currentUser");
    location.reload();
});