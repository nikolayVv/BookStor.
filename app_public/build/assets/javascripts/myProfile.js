const imageId = document.getElementById("imageId");
const removeEditImage = document.getElementById("removeEditImage");
const editImage = document.getElementById("editImage");
const changePhoto = document.getElementById("changePhoto");
const table = document.querySelector("#commentsList");
const lastField = document.querySelector("#lastField");

var comments = document.querySelectorAll('.comment');
var showMoreButton = comments.length > 3 ? document.querySelector("#showMoreButton") : undefined;
var currentlyShownComments = 0;


const showMore = () => {
    let quit = false;
    if (showMoreButton.innerText === "Show more") {
        for (let i = currentlyShownComments; i < currentlyShownComments + 3; i++) {
            if (i >= comments.length) {
                quit = true;
                showMoreButton.innerText = "Show less";
                break;
            }
            table.appendChild(comments[i]);
        }
        table.appendChild(lastField);
        if (!quit)
            currentlyShownComments += 3;
    } else if (showMoreButton.innerText === "Show less") {
        for (let i = comments.length - 1; i > 2; i--) {
            table.removeChild(comments[i]);
        }
        showMoreButton.innerText = "Show more";
        table.appendChild(lastField);
        currentlyShownComments = 3;
    }
};

if (showMoreButton) {
    showMoreButton.addEventListener("click", showMore);
}

function editOn() {
    document.getElementById("overlay-editprofile").style.display = "block";
    document.getElementById("backgroundEditForm").style.display = "block";
}

function editOff() {
    document.getElementById("overlay-editprofile").style.display = "none";
    document.getElementById("backgroundEditForm").style.display = "none";
}

window.addEventListener("load", function () {
    var passwordInput = document.getElementById("password");
    var countryInput = document.getElementById("country");
    var addressInput = document.getElementById("address");
    var cityInput = document.getElementById("city");
    var phoneNumberInput = document.getElementById("phoneNumber");

    //REGISTRACIJA
    passwordInput.addEventListener("input", function () {
        let geslo = document.getElementById("password").value;
        let sporocilo = document.getElementById("sporociloPassword");

        if (!geslo || !validatePassword(geslo)) {
            document.getElementById("saveProfile").disabled = true;
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
            document.getElementById("saveProfile").disabled = true;
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
            document.getElementById("saveProfile").disabled = true;
            document.getElementById("city").className =
                "form-control is-invalid";
            sporocilo.innerHTML = "Invalid city!";
        } else {
            document.getElementById("city").className = "form-control is-valid";
            sporocilo.innerHTML = "";
            submitControl();
        }
    });
    addressInput.addEventListener("input", function () {
        let address = document.getElementById("address").value;
        let sporocilo = document.getElementById("sporociloAddress");

        if (address && !validateAddress(address)) {
            document.getElementById("saveProfile").disabled = true;
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
            document.getElementById("saveProfile").disabled = true;
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
    comments = [].slice.call(comments).sort((comment1, comment2) => {
        comment1 = comment1.querySelector("h1").innerText;
        comment2 = comment2.querySelector("h1").innerText;
        if (comment1 > comment2)
            return -1;
        if (comment1 < comment2)
            return 1;
        return 0;
    });
    comments.forEach(comment => {
        table.removeChild(comment);
    })
    table.removeChild(lastField);
    if (showMoreButton) {
        showMore();
    } else {
        for (let i = 0; i < 3; i++) {
            if (i >= comments.length) {
                break;
            }
            table.appendChild(comments[i]);
        }
        table.appendChild(lastField);
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
        document.getElementById("saveProfile").disabled = false;
    }
}
removeEditImage.addEventListener("click", function () {
    document.querySelector("#editImageURL").setAttribute("value", "");
    editImage.setAttribute("src", "");
    editImage.setAttribute("hidden", "");
    removeEditImage.setAttribute("hidden", "");
    changePhoto.value = "";
});

changePhoto.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        //console.log(reader.result);
        document
            .querySelector("#editImageURL")
            .setAttribute("value", reader.result);
        editImage.setAttribute("src", reader.result);
        editImage.removeAttribute("hidden");
        removeEditImage.removeAttribute("hidden");
    });
    reader.readAsDataURL(this.files[0]);
});
