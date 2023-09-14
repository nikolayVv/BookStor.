window.addEventListener("load", function () {
    //PRIJAVA
    let loginForm = document.getElementById("loginForm");
    let passwordInput = document.getElementById("password");
    let usernameInput = document.getElementById("username");
    //TODO kaj je boljse za email? input and change ???
    usernameInput.addEventListener("input", function () {
        let username = document.getElementById("username").value;
        let sporocilo = document.getElementById("sporociloUsername");
        if (!username) {
            document.getElementById("username").className =
                "form-control is-invalid";
            sporocilo.innerHTML = "Invalid username!";
        } else {
            document.getElementById("username").className =
                "form-control is-valid";
            sporocilo.innerHTML = "";
        }
    });

    passwordInput.addEventListener("input", function () {
        let password = document.getElementById("password").value;
        let sporocilo = document.getElementById("sporociloPassword");
        if (!password) {
            document.getElementById("password").className =
                "form-control is-invalid";
            sporocilo.innerHTML = "Invalid password!";
        } else {
            document.getElementById("password").className =
                "form-control is-valid";
            sporocilo.innerHTML = "";
        }
    });
});
