var express = require("express");
var router = express.Router();
const ctrlMain = require("../controllers/main");
const ctrlBooks = require("../controllers/books");
const ctrlUsers = require("../controllers/users");
const ctrlDB = require("../controllers/db");

/* GET home page. */
router.get("/", ctrlMain.contents);

/* Books pages */
router.get("/books", ctrlBooks.contents);
router.get("/books/filtered/:search", ctrlBooks.contentsSearch)
router.get("/books/bookDetails/:idBook", ctrlBooks.bookDetails);
router.delete("/books/myBooks/:bookId", ctrlBooks.deleteMyBook);
router.post("/users/:idUser/books/:bookId", ctrlBooks.deleteBookAdmin);
router
    .route("/books/addEditBook")
    .get(ctrlBooks.addEditBook)
    .post(ctrlBooks.postBook);
router
    .route("/books/myBooks/:idUser")
    .get(ctrlBooks.myBooks)
    .post(ctrlBooks.deleteMyBook);
router
    .route("/books/editBook/:idBook")
    .get(ctrlBooks.editBook)
    .post(ctrlBooks.postEditBook);

/* Users pages */
router.get("/login", ctrlUsers.loginFirst);
router.get("/login/log", ctrlUsers.login);
router.post("/usersProfileView/:idUser/deleteComment/:idComment", ctrlUsers.deleteComment);
router.post("/usersProfileView/:idUser/addRating", ctrlUsers.addRating);
router.get("/logout", ctrlUsers.logOut);
router.post("/users/:idUser", ctrlUsers.deleteUser);
router
    .route("/usersProfileView/:idUser")
    .get(ctrlUsers.usersProfileView)
    .post(ctrlUsers.addComment);
router
    .route("/myProfile/:idUser")
    .get(ctrlUsers.myProfile)
    .post(ctrlUsers.editUser);
router
    .route("/register")
    .get(ctrlUsers.register)
    .post(ctrlUsers.postRegister);

/* Load db page */
router.get("/db", ctrlDB.db);
router.post("/db/delete", ctrlDB.dbDelete);
router.post("/db/add", ctrlDB.dbAdd);

module.exports = router;
