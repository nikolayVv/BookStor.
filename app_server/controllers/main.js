var apiParams = {
    server: "http://localhost:" + (process.env.PORT || 3000),
};
if (process.env.NODE_ENV === "production") {
    apiParams.server = "https://bookstor-6e9e66d864cd.herokuapp.com/";
}
const axios = require("axios").create({
    baseURL: apiParams.server,
    timeout: 5000,
});

const showError = (req, res, e) => {
    let title = "Something went wrong!";
    let message = e.isAxiosError
        ? "Error when trying to access the database thru API!"
        : undefined;
    message =
        message != undefined && e.response && e.response.data["message"]
            ? e.response.data["message"]
            : message;
    message = message == undefined ? "Something went wrong." : message;
    res.render("error", {
        title: title,
        message: message,
        error: e,
        status: e.response ? e.response.status : "",
    });
};

const contents = (req, res) => {
    axios
        .get("/api/books")
        .then((answer) => {
            // sort json of books by timesRented attribute
            if (answer.data.books) {
                answer.data.books.sort(function (a, b) {
                    return b.timesRented - a.timesRented;
                });
                // sort by date
                answer.data.books.sort(function (a, b) {
                    return a.created - b.created;
                });
            }
            quotes(req, res, answer.data.books);
        })
        .catch((error) => {
            showError(req, res, error);
        });
};

const api = "http://api.quotable.io";

const axios_out = require("axios").create({
    baseURL: api,
    timeout: 5000,
});

const quotes = (req, res, books) => {
    axios_out
        .get("/random")
        .then((data) => {
            index(req, res, books, data.data);
        })
        .catch((error) => {
            showError(req, res, error);
        });
};

const index = (req, res, books, data) => {
    // quotes(req, res);
    res.render("index", {
        title: "Bookstor.",
        logged: {
            name: req.cookies.name,
            img: req.cookies.img,
            id: req.cookies.id,
        },
        bonusScripts: '<script src="../javascripts/home.js"></script>\
                        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>\
                        <script type="text/javascript">\
                            (function() {\
                                emailjs.init("user_nCtMjVbNCf8BN7U2jV7V9");\
                            })();\
                        </script>',
        aboutUs:
            '<div class="row">\n' +
            '            <div class="col">\n' +
            '                <div class="row">\n' +
            '                    <div class="col ml-auto">\n' +
            '                        <h2 class="footer-heading mb-4">About Us</h2>\n' +
            "                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem eveniet, odio aspernatur aperiam quis nostrum consequuntur vitae omnis unde? Vero porro adipisci, natus ex mollitia quia. Fugiat non facilis suscipit.</p>\n" +
            "                    </div>\n" +
            '                    <div class="col ml-auto">\n' +
            '                        <h2 class="footer-heading mb-4">Quick Links</h2>\n' +
            '                        <ul class="list-unstyled">\n' +
            '                            <li><a href="#ourTeam" class="smoothscroll">Our Team</a></li>\n' +
            '                            <li><a href="#theIdea" class="smoothscroll">Our Vision</a></li>\n' +
            '                            <li><a href="searchContentsView.html" class="smoothscroll">Search content</a></li>\n' +
            '                            <li><a href="#popularBooks" class="smoothscroll">Popular books</a></li>\n' +
            "                        </ul>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            '            <div class="col">\n' +
            '                <h2 class="footer-heading mb-4">Subscribe Newsletter</h2>\n' +
            '                <form action="#" method="post" class="footer-subscribe">\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <input id="inputEmail" type="text" class="form-control border-secondary text-white bg-transparent" placeholder="Enter Email" aria-label="Enter Email" aria-describedby="button-addon2">\n' +
            '                        <div class="input-group-append">\n' +
            '                            <button id="subscribeBtn" class="btn btn-primary text-black" type="button" id="button-addon2">Send</button>\n' +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </form>\n" +
            "            </div>\n" +
            "        </div>",
        members: [
            {
                name: "Jure Čufer",
                img: "../../images/about_team_content/Avatar_Jure_Čufer.png",
                info: "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.",
            },
            {
                name: "Nikolay Vasilev",
                img: "../../images/about_team_content/harambo.jpg",
                info: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
            },
            {
                name: "Uroš Pavlin",
                img: "../../images/about_team_content/monkeUiUi.jpg",
                info: "Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sitamet risus.",
            },
            {
                name: "Jure Kos",
                img: "../../images/about_team_content/uuuuh.jpg",
                info: "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.",
            },
        ],
        books: books,
        quoteContent: data.content,
        quoteAuthor: data.author,
    });
};

module.exports = {
    contents,
};
