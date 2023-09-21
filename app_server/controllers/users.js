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

const loginShow = (req, res, odgovor = null) => {
    res.render("login", {
        title: "Bookstor.",
        bonusScripts: '<script src="../javascripts/login.js"></script>`',
        loginError: odgovor,
    });
};
const loginFirst = (req, res) => {
    loginShow(req, res);
};

const logOut = (req, res) => {
    res.clearCookie("name");
    res.clearCookie("img");
    res.clearCookie("email");
    res.clearCookie("role");
    res.clearCookie("id");
    res.redirect("/");
};

const login = (req, res) => {
    let password = req.query.password;
    let username = req.query.username;
    axios
        .get("/api/users/login", {
            params: {
                username: username,
                password: password,
            },
        })
        .then((odgovor) => {
            if (odgovor.data.user) {
                res.cookie(
                    "name",
                    `${odgovor.data.user.name} ${odgovor.data.user.surname}`
                );
                res.cookie("img", "../images/avatar.png");
                res.cookie("email", odgovor.data.user.email);
                res.cookie("role", odgovor.data.user.role);
                res.cookie("id", odgovor.data.user._id).redirect("/");
            } else {
                loginShow(req, res, "Username or password is invalid");
            }
        })
        .catch((error) => {
            showError(req, res, error);
        });
};

const registerShow = (req, res, odgovor = null) => {
    res.render("register", {
        title: "Bookstor.",
        bonusScripts: '<script src="../javascripts/register.js"></script>',
        registerError: odgovor,
    });
};
const register = (req, res) => {
    registerShow(req, res);
};

const postRegister = (req, res) => {
    let countryReq = req.body.country;
    let cityReq = req.body.city;
    let addressReq = req.body.address;
    let numberReq = req.body.number;
    let email = req.body.email;
    let username = req.body.username;
    axios
        .get("api/users/register", {
            params: {
                username: username,
                email: email,
            },
        })
        .then((odgovor) => {
            if (!odgovor.data.user) {
                axios;
                axios({
                    method: "post",
                    url: "/api/users",
                    data: {
                        name: req.body.name,
                        surname: req.body.surname,
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        country: countryReq,
                        city: cityReq,
                        address: addressReq,
                        phoneNumber: numberReq,
                        role: "user",
                    },
                })
                    .then(() => {
                        res.redirect("/login");
                    })
                    .catch((error) => {
                        showError(req, res, error);
                    });
            } else {
                registerShow(req, res, "Username or email is already taken");
            }
        })
        .catch((error) => {
            showError(req, res, error);
        });
};

const usersProfileView = (req, res) => {
    if (
        req.cookies.name &&
        req.cookies.id &&
        req.cookies.email &&
        req.cookies.img &&
        req.cookies.role
    ) {
        let idUser = req.params.idUser;
        if (idUser === req.cookies.id) {
            res.redirect("/myProfile/" + idUser);
        } else {
            axios
                .get(`/api/users/${idUser}`)
                .then((answerDetails) => {
                    answerDetails.data.user.ranking = parseFloat(
                        answerDetails.data.user.ranking
                    ).toFixed(2);
                    axios
                        .get(`/api/users/${idUser}/comments`)
                        .then((answerComments) => {
                            axios
                                .get(`/api/users/${idUser}/ratings`)
                                .then((answerRankings) => {
                                    showUsersProfileView(
                                        req,
                                        res,
                                        answerDetails.data.user,
                                        answerComments.data,
                                        answerRankings.data
                                    );
                                });
                        });
                })
                .catch((error) => {
                    showError(req, res, error);
                });
        }
    } else {
        res.redirect("/login");
    }
};

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

const showUsersProfileView = (req, res, user, dataComments, dataRankings) => {
    if (!dataComments.comments) {
        dataComments.comments = [];
    }
    res.render("usersProfileView", {
        title: "Bookstor. - User's Profile",
        bonusLinks: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
                        <link href="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-star-rating@4.1.2/css/star-rating.min.css" media="all" rel="stylesheet" type="text/css" />
                        <link href="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-star-rating@4.1.2/themes/krajee-svg/theme.css" media="all" rel="stylesheet" type="text/css" />`,
        bonusScripts: `<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
                        <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-star-rating@4.1.2/js/star-rating.min.js" type="text/javascript"></script>
                        <script src="../javascripts/usersProfileView.js"></script>`,
        logged: {
            name: req.cookies.name,
            img: req.cookies.img,
            email: req.cookies.email,
            role: req.cookies.role,
            id: req.cookies.id,
        },
        user: user,
        comments: dataComments.comments,
        countOfComments: dataComments.comments.length,
        message: dataComments.message,
        rankings: dataRankings.ratings,
    });
};

const addComment = (req, res) => {
    let idUser = req.params.idUser;
    axios
        .get(`/api/users/${idUser}`)
        .then((answerDetails) => {
            saveComment(req, res, answerDetails.data.user);
        })
        .catch((error) => {
            showError(req, res, error);
        });
};

const saveComment = (req, res, user) => {
    axios({
        method: "post",
        url: "/api/users/" + user._id + "/comments",
        data: {
            profilePicture: req.cookies.img,
            name: req.cookies.name,
            email: req.cookies.email,
            text: req.body.comment,
        },
    })
        .then(() => {
            res.redirect("/usersProfileView/" + user._id);
        })
        .catch((error) => {
            showError(req, res, error);
        });
};

const addRating = (req, res) => {
    let idUser = req.params.idUser;
    axios
        .get(`/api/users/${idUser}`)
        .then((answerDetails) => {
            saveRating(req, res, answerDetails.data.user);
        })
        .catch((error) => {
            showError(req, res, error);
        });
};

const saveRating = (req, res, user) => {
    let inside = false;
    user.alreadyRanked.forEach((ranking) => {
        if (ranking.userId == req.cookies.id) {
            inside = true;
            axios({
                method: "put",
                url: "/api/users/" + user._id + "/ratings",
                data: {
                    rank: req.body.rank,
                    idLogged: req.cookies.id,
                },
            })
                .then(() => {
                    return res.redirect("/usersProfileView/" + user._id);
                })
                .catch((error) => {
                    showError(req, res, error);
                });
        }
    });
    if (!inside) {
        axios({
            method: "post",
            url: "/api/users/" + user._id + "/ratings",
            data: {
                idLogged: req.cookies.id,
                rank: req.body.rank,
            },
        })
            .then(() => {
                res.redirect("/usersProfileView/" + user._id);
            })
            .catch((error) => {
                showError(req, res, error);
            });
    }
};

const deleteComment = (req, res) => {
    let idUser = req.params.idUser;
    let idComment = req.params.idComment;
    axios({
        method: "delete",
        url: "/api/users/" + idUser + "/comments/" + idComment,
    })
        .then(() => {
            res.redirect("/usersProfileView/" + idUser);
        })
        .catch((error) => {
            showError(req, res, error);
        });
};

const myProfile = (req, res) => {
    let idUser = req.params.idUser;
    axios
        .get(`/api/users/${idUser}`)
        .then((answerDetails) => {
            answerDetails.data.user.ranking = parseFloat(
                answerDetails.data.user.ranking
            ).toFixed(2);
            res.render("myProfile", {

                title: "Bookstor. - My Profile",
                user: answerDetails.data.user,
                logged: {
                    name: req.cookies.name,
                    img: req.cookies.img,
                    id: req.cookies.id,
                    role: req.cookies.role,
                },
                bonusLinks: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>`,
                bonusScripts: `<script src="../javascripts/myProfile.js"></script>`,
                message: "There aren't any comments for this user yet!",
                comments: answerDetails.data.user.comments,
                countOfComments: answerDetails.data.user.comments.length
            });
        })
        .catch((error) => {
            showError(req, res, error);
        });
};

const deleteUser = (req, res) => {
    let idUser = req.params.idUser;
    axios({
        method: "delete",
        url: "/api/users/" + idUser,
    })
        .then((answer) => {
            res.redirect("/books");
        })
        .catch((error) => {
            showError(req, res, error);
        });
};

const editUser = (req, res) => {
    let idUser = req.params.idUser;
    axios({
        method: "put",
        url: "/api/users/" + idUser,
        data: {
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            country: req.body.country,
            city: req.body.city,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            profilePicture: req.body.editImageURL,
        },
    })
        .then((answer) => {
            res.redirect("/myProfile/" + idUser);
        })
        .catch((error) => {
            showError(req, res, error);
        });
};

module.exports = {
    login,
    register,
    usersProfileView,
    myProfile,
    addComment,
    addRating,
    postRegister,
    loginFirst,
    logOut,
    deleteComment,
    deleteUser,
    editUser,
};
