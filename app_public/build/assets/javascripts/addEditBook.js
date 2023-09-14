window.addEventListener("load", function () {
    //console.log(document.getElementById("file").files[0]);
    var titleIn = document.getElementById("title");
    var authorIn = document.getElementById("author");
    var yearIn = document.getElementById("year");
    var descriptionIn = document.getElementById("description");
    var genreIn = document.getElementById("genre");
    var conditionIn = document.getElementById("condition");
    var price1In = document.getElementById("price1");
    var price2In = document.getElementById("price2");
    var buy = document.getElementById("buyable");
    var rent = document.getElementById("rentable");
    var locationIn = document.getElementById("location");
    var phoneIn = document.getElementById("phone");
    //var pictureIn = document.getElementById("file");
    buy.addEventListener("change", (e) => {
        if (buy.checked) {
            price1In.disabled = false;
            submitControl();
            document.getElementById("sporociloBuyRent").innerHTML = "";
        } else {
            price1In.value = "";
            price1In.disabled = true;
            submitControl();
            if (!document.getElementById("rentable").checked) {
                document.getElementById("sporociloBuyRent").innerHTML =
                    "At least one must be checked";
            }
        }
    });
    rent.addEventListener("change", (e) => {
        if (rent.checked) {
            price2In.disabled = false;
            submitControl();
            document.getElementById("sporociloBuyRent").innerHTML = "";
        } else {
            price2In.value = "";
            price2In.disabled = true;
            submitControl();
            if (!document.getElementById("buyable").checked) {
                document.getElementById("sporociloBuyRent").innerHTML =
                    "At least one must be checked";
            }
        }
    });
    //preverjanje vnesenih podatkov
    authorIn.addEventListener("input", function () {
        let naslov = document.getElementById("author").value;
        let sporocilo = document.getElementById("sporociloAuthor");

        if (!naslov || !validateAddress(naslov)) {
            document.getElementById("submit").disabled = true;
            document.getElementById("author").className =
                "form-control is-invalid";
            sporocilo.innerHTML = "Invalid title!";
        } else {
            document.getElementById("author").className =
                "form-control is-valid";
            sporocilo.innerHTML = "";
            submitControl();
        }
    });
    descriptionIn.addEventListener("input", function () {
        let naslov = document.getElementById("description").value;
        let sporocilo = document.getElementById("sporociloDescription");

        if (!naslov || !validateAddress(naslov)) {
            document.getElementById("submit").disabled = true;
            document.getElementById("description").className =
                "form-control is-invalid";
            sporocilo.innerHTML = "Invalid description!";
        } else {
            document.getElementById("description").className =
                "form-control is-valid";
            sporocilo.innerHTML = "";
            submitControl();
        }
    });
    locationIn.addEventListener("input", function () {
        let naslov = document.getElementById("location").value;
        let sporocilo = document.getElementById("sporociloLocation");

        if (!naslov || !validateAddress(naslov)) {
            document.getElementById("submit").disabled = true;
            document.getElementById("location").className =
                "form-control is-invalid";
            sporocilo.innerHTML = "Invalid location!";
        } else {
            document.getElementById("location").className =
                "form-control is-valid";
            sporocilo.innerHTML = "";
            submitControl();
        }
    });
    phoneIn.addEventListener("input", function () {
        let naslov = document.getElementById("phone").value;
        let sporocilo = document.getElementById("sporociloPhone");

        if (!naslov || !validateNumber(naslov)) {
            document.getElementById("submit").disabled = true;
            document.getElementById("phone").className =
                "form-control is-invalid";
            sporocilo.innerHTML =
                "Phone number must be of form: (###) ###-####";
        } else {
            document.getElementById("phone").className =
                "form-control is-valid";
            sporocilo.innerHTML = "";
            submitControl();
        }
    });
});
/*
function encodeImageAsURL(file) {
    console.log(file);
    var slika = file.files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        //console.log(reader.result);
    };
    console.log(reader.readAsDataURL(slika));

}

 */
function encodeImageAsURL(file) {
    var slika = file.files[0];
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = slika.name;
    img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    var slika = file.files[0];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    // Set width and height
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    console.log(canvas.toDataURL(slika.type));
}

function validateWords(input) {
    const words = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    return words.test(input);
}

function validateNumber(input) {
    const number = /^\(?\d{3}\) \d{3}-\d{4}$/;
    return number.test(input);
}

function validateAddress(input) {
    const address = /^[A-Za-z0-9'\.\-\s\,]*$/;
    return address.test(input);
}

function submitControl() {
    if (
        document.getElementsByClassName("is-invalid").length == 0 &&
        (document.getElementById("rentable").checked ||
            document.getElementById("buyable").checked)
    ) {
        document.getElementById("submit").disabled = false;
    } else {
        document.getElementById("submit").disabled = true;
    }
}

const file0 = document.querySelector("#file0");
file0.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        //console.log(reader.result);
        document
            .querySelector("#slikaURL0")
            .setAttribute("value", reader.result);
        document.querySelector("#slika0").setAttribute("src", reader.result);
        document.querySelector("#slika0").removeAttribute("hidden");
        document.querySelector("#remove0").removeAttribute("hidden");
    });
    reader.readAsDataURL(this.files[0]);
});

const file1 = document.querySelector("#file1");
file1.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        document
            .querySelector("#slikaURL1")
            .setAttribute("value", reader.result);
        document.querySelector("#slika1").setAttribute("src", reader.result);
        document.querySelector("#slika1").removeAttribute("hidden");
        document.querySelector("#remove1").removeAttribute("hidden");
    });
    reader.readAsDataURL(this.files[0]);
});

const file2 = document.querySelector("#file2");
file2.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        document
            .querySelector("#slikaURL2")
            .setAttribute("value", reader.result);
        document.querySelector("#slika2").setAttribute("src", reader.result);
        document.querySelector("#slika2").removeAttribute("hidden");
        document.querySelector("#remove2").removeAttribute("hidden");
    });
    reader.readAsDataURL(this.files[0]);
});

const file3 = document.querySelector("#file3");
file3.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        document
            .querySelector("#slikaURL3")
            .setAttribute("value", reader.result);
        document.querySelector("#slika3").setAttribute("src", reader.result);
        document.querySelector("#slika3").removeAttribute("hidden");
        document.querySelector("#remove3").removeAttribute("hidden");
    });
    reader.readAsDataURL(this.files[0]);
});

const file4 = document.querySelector("#file4");
file4.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        document
            .querySelector("#slikaURL4")
            .setAttribute("value", reader.result);
        document.querySelector("#slika4").setAttribute("src", reader.result);
        document.querySelector("#slika4").removeAttribute("hidden");
        document.querySelector("#remove4").removeAttribute("hidden");
    });
    reader.readAsDataURL(this.files[0]);
});

const remove0 = document.getElementById("remove0");
remove0.addEventListener("click", function () {
    document.querySelector("#slikaURL0").setAttribute("value", "");
    document.querySelector("#slika0").setAttribute("src", "");
    document.querySelector("#slika0").setAttribute("hidden", "");
    document.querySelector("#remove0").setAttribute("hidden", "");
    file0.value = "";
});

const remove1 = document.getElementById("remove1");
remove1.addEventListener("click", function () {
    document.querySelector("#slikaURL1").setAttribute("value", "");
    document.querySelector("#slika1").setAttribute("src", "");
    document.querySelector("#slika1").setAttribute("hidden", "");
    document.querySelector("#remove1").setAttribute("hidden", "");
    file1.value = "";
});

const remove2 = document.getElementById("remove2");
remove2.addEventListener("click", function () {
    document.querySelector("#slikaURL2").setAttribute("value", "");
    document.querySelector("#slika2").setAttribute("src", "");
    document.querySelector("#slika2").setAttribute("hidden", "");
    document.querySelector("#remove2").setAttribute("hidden", "");
    file2.value = "";
});

const remove3 = document.getElementById("remove3");
remove3.addEventListener("click", function () {
    document.querySelector("#slikaURL3").setAttribute("value", "");
    document.querySelector("#slika3").setAttribute("src", "");
    document.querySelector("#slika3").setAttribute("hidden", "");
    document.querySelector("#remove3").setAttribute("hidden", "");
    file3.value = "";
});

const remove4 = document.getElementById("remove4");
remove4.addEventListener("click", function () {
    document.querySelector("#slikaURL4").setAttribute("value", "");
    document.querySelector("#slika4").setAttribute("src", "");
    document.querySelector("#slika4").setAttribute("hidden", "");
    document.querySelector("#remove4").setAttribute("hidden", "");
    file4.value = "";
});
