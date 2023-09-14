const fs = require("fs");

var apiParams = {
    server: "http://localhost:" + (process.env.PORT || 3000),
};
if (process.env.NODE_ENV === "production") {
    apiParams.server = "https://bookstor-fri.herokuapp.com/";
}

const axios = require("axios").create({
    baseURL: apiParams.server,
    timeout: 5000,
});

const db = (req, res) => {
    res.render("db", {
        title: "Load/Delete Data",
    });
};

const dbDelete = async (req, res) => {
    await callApiDelete(req, res);
    res.redirect("/db");
};

const callApiDelete = async (req, res) => {
    await axios
        .get("/api/users")
        .then(async (answer) => {
            let users = answer.data;
            for (let i = 0; i < users.length; i++) {
                await axios({
                    method: "delete",
                    url: "/api/db/delete/" + users[i]._id,
                })
                    .then((answer) => {})
                    .catch((error) => {
                        showError(req, res, error);
                    });
            }
        })
        .catch((error) => {
            showError(req, res, error);
        });
}

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

const dbAdd = async (req, res) => {
    await callApiDelete(req, res);
    let users = [];
    const jsonUsers = await fs.promises.readFile(
        "app_api/models/dbUsers.json",
        "utf8"
    );
    const jsonData = await fs.promises.readFile(
        "app_api/models/dbBooksCommentsRatings.json",
        "utf8"
    );
    const usersData = JSON.parse(jsonUsers);
    const data = JSON.parse(jsonData);

    for (let i = 0; i < usersData.length; i++) {
        await axios({
            method: "post",
            url: "/api/db/add",
            data: {
                name: usersData[i].name,
                surname: usersData[i].surname,
                username: usersData[i].username,
                password: usersData[i].password,
                email: usersData[i].email,
                country: usersData[i].country,
                city: usersData[i].city,
                address: usersData[i].address,
                phoneNumber: usersData[i].phoneNumber,
                role: usersData[i].role,
            },
        })
            .then((answer) => {
                users.push(answer.data);
            })
            .catch((error) => {
                showError(req, res, error);
            });
    }

    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < data[i].books.length; j++) {
            await axios({
                method: "post",
                url: "/api/db/users/" + users[i]._id + "/books",
                data: {
                    title: data[i].books[j].title,
                    author: data[i].books[j].author,
                    bookReleaseYear: data[i].books[j].bookReleaseYear,
                    description: data[i].books[j].description,
                    genres: data[i].books[j].genres,
                    condition: data[i].books[j].condition,
                    buy: data[i].books[j].buy,
                    rent: data[i].books[j].rent,
                    buyPrice: data[i].books[j].buyPrice,
                    rentPrice: data[i].books[j].rentPrice,
                    location: users[i].country + ", " + users[i].city,
                    phone: users[i].phoneNumber,
                    pictures: data[i].books[j].pictures,
                    sellerId: users[i]._id,
                    sellerName: users[i].name + " " + users[i].surname,
                },
            })
                .then((answer) => {})
                .catch((error) => {
                    showError(req, res, error);
                });
        }
        for (let j = 0; j < data[i].comments.length; j++) {
            await axios({
                method: "post",
                url: "/api/db/users/" + users[i]._id + "/comments",
                data: {
                    profilePicture: data[i].comments[j].profilePicture,
                    name: data[i].comments[j].name,
                    email: data[i].comments[j].email,
                    text: data[i].comments[j].text,
                },
            })
                .then((answer) => {})
                .catch((error) => {
                    showError(req, res, error);
                });
        }
        if (i < users.length - 1) {
            for (let j = 0; j < data[i].ratings.length; j++) {
                await axios({
                    method: "post",
                    url: "/api/db/users/" + users[i]._id + "/ratings",
                    data: {
                        idLogged: users[i + 1]._id,
                        rank: data[i].ratings[j].rank,
                    },
                })
                    .then((answer) => {})
                    .catch((error) => {
                        showError(req, res, error);
                    });
            }
        }
    }
    res.redirect("/db");
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

module.exports = {
    db,
    dbDelete,
    dbAdd,
};
