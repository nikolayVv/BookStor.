window.addEventListener("load", function () {
    var nameInput = document.getElementById("name");
    var surnameInput = document.getElementById("surname");
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    var emailInput = document.getElementById("email");
    var countryInput = document.getElementById("country");
    var addressInput = document.getElementById("address");
    var cityInput = document.getElementById("city");
    var phoneNumberInput = document.getElementById("phoneNumber");

    //REGISTRACIJA
    let registerForm = document.getElementById("registerForm");
    if (registerForm) {
        nameInput.addEventListener("input", function () {
            let ime = document.getElementById("name").value;
            let sporocilo = document.getElementById("sporociloName");

            if (!ime || !validateWord(ime)) {
                document.getElementById("submit").disabled = true;
                document.getElementById("name").className =
                    "form-control is-invalid";
                sporocilo.innerHTML = "Invalid name!";
            } else {
                document.getElementById("name").className =
                    "form-control is-valid";
                sporocilo.innerHTML = "";
                submitControl();
            }
        });

        surnameInput.addEventListener("input", function () {
            let priimek = document.getElementById("surname").value;
            let sporocilo = document.getElementById("sporociloSurname");

            if (!priimek || !validateWord(priimek)) {
                document.getElementById("submit").disabled = true;
                document.getElementById("surname").className =
                    "form-control is-invalid";
                sporocilo.innerHTML = "Invalid surname!";
            } else {
                document.getElementById("surname").className =
                    "form-control is-valid";
                sporocilo.innerHTML = "";
                submitControl();
            }
        });

        usernameInput.addEventListener("input", function () {
            let uporabniskoIme = document.getElementById("username").value;
            let sporocilo = document.getElementById("sporociloUsername");

            if (!uporabniskoIme || !validateUsername(uporabniskoIme)) {
                document.getElementById("submit").disabled = true;
                document.getElementById("username").className =
                    "form-control is-invalid";
                sporocilo.innerHTML = "Invalid username!";
            } else {
                document.getElementById("username").className =
                    "form-control is-valid";
                sporocilo.innerHTML = "";
                submitControl();
            }
        });

        emailInput.addEventListener("input", function () {
            let email = document.getElementById("email").value;
            let sporocilo = document.getElementById("sporociloEmail");

            if (!email || !validateEmail(email)) {
                document.getElementById("submit").disabled = true;
                document.getElementById("email").className =
                    "form-control is-invalid";
                sporocilo.innerHTML = "Invalid email!";
            } else {
                document.getElementById("email").className =
                    "form-control is-valid";
                sporocilo.innerHTML = "";
                submitControl();
            }
        });

        passwordInput.addEventListener("input", function () {
            let geslo = document.getElementById("password").value;
            let sporocilo = document.getElementById("sporociloPassword");

            if (!geslo || !validatePassword(geslo)) {
                document.getElementById("submit").disabled = true;
                document.getElementById("password").className =
                    "form-control is-invalid";
                sporocilo.innerHTML =
                    "Password must contain at least 8 characters, 1 number, 1 upper and 1 lower case letter!";
            } else {
                document.getElementById("password").className =
                    "form-control is-valid";
                sporocilo.innerHTML = "";
                submitControl();
            }
        });
        countryInput.addEventListener("input", function () {
            let country = document.getElementById("country").value;
            let sporocilo = document.getElementById("sporociloCountry");

            if (country && !validateWords(country)) {
                document.getElementById("submit").disabled = true;
                document.getElementById("country").className =
                    "form-control is-invalid";
                sporocilo.innerHTML = "Invalid country!";
            } else {
                document.getElementById("country").className =
                    "form-control is-valid";
                sporocilo.innerHTML = "";
                submitControl();
            }
        });
        cityInput.addEventListener("input", function () {
            let city = document.getElementById("city").value;
            let sporocilo = document.getElementById("sporociloCity");

            if (city && !validateWords(city)) {
                document.getElementById("submit").disabled = true;
                document.getElementById("city").className =
                    "form-control is-invalid";
                sporocilo.innerHTML = "Invalid city!";
            } else {
                document.getElementById("city").className =
                    "form-control is-valid";
                sporocilo.innerHTML = "";
                submitControl();
            }
        });
        addressInput.addEventListener("input", function () {
            let address = document.getElementById("address").value;
            let sporocilo = document.getElementById("sporociloAddress");

            if (address && !validateAddress(address)) {
                document.getElementById("submit").disabled = true;
                document.getElementById("address").className =
                    "form-control is-invalid";
                sporocilo.innerHTML = "Invalid address!";
            } else {
                document.getElementById("address").className =
                    "form-control is-valid";
                sporocilo.innerHTML = "";
                submitControl();
            }
        });
        phoneNumberInput.addEventListener("input", function () {
            let phoneNumber = document.getElementById("phoneNumber").value;
            let sporocilo = document.getElementById("sporociloNumber");

            if (phoneNumber && !validateNumber(phoneNumber)) {
                document.getElementById("submit").disabled = true;
                document.getElementById("phoneNumber").className =
                    "form-control is-invalid";
                sporocilo.innerHTML =
                    "Phone number must be of form: (###) ###-####";
            } else {
                document.getElementById("phoneNumber").className =
                    "form-control is-valid";
                sporocilo.innerHTML = "";
                submitControl();
            }
        });
    }
});

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateWords(input) {
    const words = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    return words.test(input);
}
function validateWord(input) {
    const word = /^[a-zA-Z]*$/;
    return word.test(input);
}
function validateUsername(input) {
    const username = /^[a-zA-Z0-9_]*$/;
    return username.test(input);
}
function validateAddress(input) {
    const address = /^[A-Za-z0-9'\.\-\s\,]*$/;
    return address.test(input);
}
function validatePassword(input) {
    const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return password.test(input);
}
function validateNumber(input) {
    const number = /^\(?\d{3}\) \d{3}-\d{4}$/;
    return number.test(input);
}
function submitControl() {
    if (document.getElementsByClassName("is-invalid").length == 0) {
        document.getElementById("submit").disabled = false;
    }
}
