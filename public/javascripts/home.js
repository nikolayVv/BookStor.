let emails = [];
const submitButton = document.getElementById("searchButton");
const subscribeBtn = document.getElementById("subscribeBtn");

subscribeBtn.addEventListener("click", function () {
    let inputEmail = document.getElementById("inputEmail");
    let mail = inputEmail.value;
    // console.log("email: " + mail);
    let params = {
        to_email: mail
    }
    // if input field matches email regex, send email you are now subscriber, otherwise, popup error
    emailjs.send('service_49l8pvl', 'template_zh46fvo', params)
        .then(function (res) {
            addMail(mail);
            console.log("success", res.status);
            alert("Subscription successful!");
        });
});

function addMail(x) {
    emails.push(x);
    updateEmailsDB();
}

function updateEmailsDB() {
    // TODO update newsletter list in db for future reference (once we have content for newsletter)
}

const searchBoxIndex = document.querySelector("#searchBoxIndex") ? document.querySelector("#searchBoxIndex") : undefined;

searchBoxIndex.addEventListener("input", (e) => {
    let inputValue = searchBoxIndex.value === '' ? "noFilter" : searchBoxIndex.value;
    let href = submitButton.href.split('/');
    submitButton.href = href[0] + "//" + href[2] + "/" + href[3] + "/" + href[4] + "/" + inputValue;
});