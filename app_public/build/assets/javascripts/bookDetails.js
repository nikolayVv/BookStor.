window.addEventListener("load", function () {
    var buttonBuy = document.getElementById("buyBtn");
    var buttonRent = document.getElementById("rentBtn");
    var sellerEmail = document.getElementById("sellerEmail").value;
    var sellerName = document.getElementById("sellerName").value;
    var buyerName = document.getElementById("buyerName").value;
    var bookTitle = document.getElementById("bookTitle").value;

    //console.log("bookDetail.js");

    if (buttonBuy) {
        buttonBuy.addEventListener('click', function () {
            //send email to seller: item bought
            var tempParams = {
                to_mail: sellerEmail,
                from_name: buyerName,
                to_name: sellerName,
                message: "You book " + bookTitle + " has just been bought",
            };
            emailjs.send('gmail', 'template', tempParams)
                .then(function (res) {
                    console.log("success", res.status);
                    alert("Email sent to seller!");
                });
        });
    }

    if (buttonRent) {
        buttonRent.addEventListener('click', function () {
            //send email to seller: item rented
            var tempParams = {
                to_mail: sellerEmail,
                from_name: buyerName,
                to_name: sellerName,
                message: "You book " + bookTitle + " has just been rented",
            };
            emailjs.send('gmail', 'template', tempParams)
                .then(function (res) {
                    console.log("success", res.status);
                    alert("Email sent to seller!");
                });
        });
    }

    function sendEmailBuy(email, bookTitle) {
        console.log("sending mail");
        var tempParams = {
            to_mail: email,
            from_name: "Jure Kos",
            to_name: "Jure Kos",
            message: "You book " + "Book" + " has just been bought",
        };
        emailjs.send('gmail', 'template', tempParams)
            .then(function (res) {
                console.log("success", res.status);
            });
        console.log("finished sending");
    }

    function sendEmailRent(email, bookTitle) {
        Email.send({
            Host: "smtp.gmail.com",
            Username: "",
            Password: "",
            To: "",
            From: "",
            Subject: "Bookstor. - your book was rented!",
            Body: "You book " + "Book" + " has just been rented.",
        }).then(
            message => alert("Mail sent successfully!")
        );
    }
});