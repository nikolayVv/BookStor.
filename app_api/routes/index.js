const express = require("express");
const router = express.Router();
const ctrlBooks = require("../controllers/books");
const ctrlUsers = require("../controllers/users");
const ctrlRatings = require("../controllers/ratings");
const ctrlComments = require("../controllers/comments");

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Books
 *    description: Control of listed books
 *  - name: Users
 *    description: Control of users
 *  - name: Comments
 *    description: Control of comments
 *  - name: Ratings
 *    description: Control of ratings
 *  - name: Authentication
 *    description: Control of authentication
 */

/**
 * Security access scheme
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

const jwt = require("express-jwt");
const authentication = jwt({
  secret: process.env.JWT_PASSWORD,
  userProperty: "payload",
  algorithms: ["HS256"],
});

/* Books */
router
  .route("/books")
  /**
   * @swagger
   *  /books:
   *   get:
   *    summary: List of all books
   *    description: Get all books that are listed for sale or rent
   *    tags: [Books]
   *    responses:
   *     "200":
   *      description: Successful request with list of books.
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *          $ref: "#/components/schemas/BooksReadAll"
   *     "500":
   *      description: Server error when reqesting from database.
   */
  .get(ctrlBooks.allBooks)
  //.delete(authentication, ctrlBooks.deleteAllBooks);

/**
 * @swagger
 *  /books/{idBook}:
 *   get:
 *    summary: Details of selcted book
 *    description: Get **details of selected book** with all of its data
 *    tags: [Books]
 *    parameters:
 *     - in: path
 *       name: idBook
 *       description: unique id of a book
 *       schema:
 *        type: string
 *       required: true
 *       example: 61cde4243a224927f262b919
 *    responses:
 *     "200":
 *      description: Succesful request with details of selected book in response.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/BooksReadDetails"
 *     "404":
 *      description: Couldn't find a book with the given ID!
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         cant find book:
 *          $ref: "#/components/examples/cantFindBook"
 *     "500":
 *      description: Server error when reqesting from database.
 */
router.get("/books/:idBook", ctrlBooks.bookDetails);
/**
   * @swagger
   *  /books/{idUser}/{inputValue}/{pageNumber}:
   *   get:
   *    summary: List of all books posted by a user
   *    description: Get all books that are listed for sale or rent by the user
   *    tags: [Books]
   *    parameters:
   *     - in: path
   *       name: idUser
   *       description: unique id of a user
   *       schema:
   *        type: string
   *       required: true
   *       example: 61cde4243a224927f262b919
   *     - in: path
   *       name: inputValue
   *       description: search filter
   *       schema:
   *        type: string
   *       required: true
   *       example: noFilter
   *     - in: path
   *       name: pageNumber
   *       description: Page number
   *       schema:
   *        type: number
   *       required: true
   *       example: 1
   *    responses:
   *     "200":
   *      description: Successful request with list of books.
   *      content:
   *       application/json:
   *        schema:
   *         type: object
   *         properties:
   *          books:
   *           type: array
   *           items:
   *            $ref: "#/components/schemas/BooksReadUsers"
   *          length:
   *           type: number
   *           example: 5
   *     "404":
   *      description: Couldn't find a user with the given ID!
   *      content:
   *       application/json:
   *        schema:
   *         $ref: "#/components/schemas/Error"
   *        examples:
   *         can't find user:
   *          $ref: "#/components/examples/cantFindUser"
   *     "500":
   *      description: Server error when reqesting from database.
   */
  
router.get("/books/:idUser/:inputValue/:pageNumber", ctrlBooks.myBooks);
router
  .route("/users/:idUser/books")
/**
 * @swagger
 *  /users/{idUser}/books:
 *   post:
 *    summary: Add new book
 *    description: Add **new book** with all of its data.
 *    tags: [Books]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: unique id of a user
 *       schema:
 *        type: string
 *       required: true
 *       example: 61cde3f73a224927f262b90c
 *    requestBody:
 *     description: Book data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/BookUpdateRequest"
 *    responses:
 *     "201":
 *      description: Successfully added book to a user
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/BookUpdateResponse"
 *     "400":
 *      description: Error while saving book
 *     "401":
 *      description: Authentication error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *      description: Couldn't find a user with the given ID!
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         can't find user:
 *          $ref: "#/components/examples/cantFindUser"
 *     "500":
 *      description: Server error when reqesting from database.
 */
  .post(authentication, ctrlBooks.addBook);
router
  .route("/users/:idUser/books/:idBook")
  /**
 * @swagger
 *  /users/{idUser}/books/{idBook}:
 *   put:
 *    summary: Update chosen book
 *    description: Update **details of choosen book** with data about book and sale.
 *    tags: [Books]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Book data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/BookUpdateRequest"
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: unique id of a user
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: idBook
 *       description: unique id of a book
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Succesfully edited book
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/BookUpdateResponsePut"
 *     "401":
 *      description: Authentication error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *      description: user/book with userId/bookId couldn't be found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
*         examples:
*          bookId:
*           value:
*            message: Couldn't find a book with the given ID!
*           summary: Couldn't find a book with the given ID
*          userId:
*           value:
*            mesage: Couldn't find a user with the given ID!
*           summary: Couldn't find a user with the given ID
 *     "500":
 *      description: Server error when reqesting from database.
 */
  .put(authentication, ctrlBooks.editBook)
  /**
 * @swagger
 *  /users/{idUser}/books/{idBook}:
 *   delete:
 *    summary: Delete chosen book
 *    description: Delete chosen **book** from a user
 *    tags: [Books]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: unique id of user
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: idBook
 *       description: unique id of book
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Book successfully deleted
 *     "404":
 *      description: user/book with userId/bookId couldn't be found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         bookId:
 *          value:
 *           message: Couldn't find a book with the given ID!
 *          summary: Couldn't find a book with the given ID
 *         userId:
 *          value:
 *           mesage: Couldn't find a user with the given ID!
 *          summary: Couldn't find a user with the given ID
 * 
 *     "401":
 *      description: Authentication error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "500":
 *      description: Error while deleting book
 */
  .delete(authentication, ctrlBooks.deleteBook);

/* Users */
router
  .route("/users")
  /**
   * @swagger
   *  /users:
   *   get:
   *    summary: List of all Users
   *    description: Get basic data of all users
   *    tags: [Users]
   *    responses:
   *     "200":
   *      description: Successful request with list of all users.
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *          $ref: "#/components/schemas/UsersReadDetails"
   *     "404":
   *      description: Couldn't find a user with the given ID!
   *      content:
   *       application/json:
   *        schema:
   *         $ref: "#/components/schemas/Error"
   *        examples:
   *         can't find user:
   *          $ref: "#/components/examples/cantFindUser"
   *     "500":
   *      description: Server error when reqesting from database.
   */

  .get(ctrlUsers.allUsers)
  /**
   * @swagger
   *  /users:
   *   get:
   *    summary: List of all Users
   *    description: Get basic data of all users
   *    tags: [Users]
   *    requestBody:
   *     description: Register data
   *     required: true
   *     content:
   *      application/x-www-form-urlencoded:
   *       schema:
   *        $ref: "#/components/schemas/UserCheck"
   *    responses:
   *     "200":
   *      description: Successful request details of a user
   *      content:
   *       application/json:
   *        schema:
   *         _id:
   *          type: string
   *          example: 61cde4243a224927f262b919
   *     "400":
   *      description: Username and email are required.
   *      content:
   *       application/json:
   *        schema:
   *         $ref: "#/components/schemas/Error"
   *        examples:
   *         message: Username and email are required.
   *     "500":
   *      description: Server error when reqesting from database.
   */
  .post(ctrlUsers.checkUser);
  /**
 * @swagger
 *   /users/login:
 *     post:
 *       summary: Existing user login
 *       description: Login of **existing user** with username and password.
 *       tags: [Authentication]
 *       requestBody:
 *         description: Login data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UserLogin"
 *       responses:
 *         "200":
 *          description: Successful login with JWT token in response.
 *          content:
 *           application/json:
 *            schema:
 *             $ref: "#/components/schemas/AuthenticationResponse"
 *         "400":
 *           description: Request error, username and password are required
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Error"
 *               example:
 *                 message: Username and password are required
 *         "401":
 *           description: Error when loging in.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Error"
 *               examples:
 *                username:
 *                 value:
 *                  message: wrong username.
 *                 summary: wrong username
 *                geslo:
 *                 value:
 *                  mesage: wrong password.
 *                 summary: wrong password
 *         "500":
 *           description: Server error when checking user.
 */
router.post("/users/login", ctrlUsers.userLog);
/**
 * @swagger
 *   /user/register:
 *     post:
 *       summary: New user register
 *       description: Register **new user** with all personal data.
 *       tags: [Authentication]
 *       requestBody:
 *         description: Register data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UserRegister"
 *       responses:
 *         "200":
 *           description: Successful login with JWT token in response.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AuthenticationResponse"
 *         "400":
 *           description: Request errur username, password and email are required.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Error"
 *               example:
 *                message: Username, password and email are required.
 *         "500":
 *           description: Server error while registering user.
 */
router.post("/users/register", ctrlUsers.userRegister);
router
  .route("/users/:idUser")
   /**
   * @swagger
   *  /users/{idUser}:
   *   get:
   *    summary: List of user details
   *    description: Get all info of a user with unique id
   *    tags: [Users]
   *    parameters:
   *     - in: path
   *       name: idUser
   *       description: unique id of a user
   *       schema:
   *        type: string
   *       required: true
   *       example: 61cde4243a224927f262b919
   *    responses:
   *     "200":
   *      description: Successful request with user details.
   *      content:
   *       application/json:
   *        schema:
   *         $ref: "#/components/schemas/UsersReadDetails"
   *     "404":
   *      description: Couldn't find a user with the given ID!
   *      content:
   *       application/json:
   *        schema:
   *         $ref: "#/components/schemas/Error"
   *        examples:
   *         can't find user:
   *          $ref: "#/components/examples/cantFindUser"
   *     "500":
   *      description: Server error when reqesting from database.
   */
  .get(ctrlUsers.userDetails)
    /**
 * @swagger
 *  /users/{idUser}:
 *   put:
 *    summary: Update chosen user
 *    description: Update **details of a user** with data
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: User data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/UserRegister"
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: unique id of a user
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Succesfully edited user
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/UsersReadDetails"
 *     "401":
 *      description: Authentication error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *      description: Couldn't find a user with the given ID!
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         can't find user:
 *          $ref: "#/components/examples/cantFindUser"
 *     "500":
 *      description: Server error when reqesting from database.
 */
  .put(authentication, ctrlUsers.editUser)
  /**
 * @swagger
 *  /users/{idUser}:
 *   delete:
 *    summary: Delete choosen user
 *    description: Delete chosen **user**
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: unique id of a user
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: User successfully deleted
 *     "404":
 *      description: Couldn't find a user with the given ID!
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         can't find user:
 *          $ref: "#/components/examples/cantFindUser"
 *     "401":
 *      description: Authentication error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "500":
 *      description: Error while deleting user
 */
  .delete(authentication, ctrlUsers.deleteUser);

/* Comments */
router
  .route("/users/:idUser/comments")
   /**
   * @swagger
   *  /users/{idUser}/comments:
   *   get:
   *    summary: List of all comments given to user
   *    description: Get all comments that have been posted on users profile
   *    tags: [Comments]
   *    parameters:
   *     - in: path
   *       name: idUser
   *       description: unique id of a user
   *       schema:
   *        type: string
   *       required: true
   *       example: 61cde4243a224927f262b919
   *    responses:
   *     "200":
   *      description: Successful request with list of comments.
   *      content:
   *       application/json:
   *        schema:
   *         type: array
   *         items:
   *          $ref: "#/components/schemas/CommentReadAll"
   *     "404":
   *      description: Couldn't find a user with the given ID!
   *      content:
   *       application/json:
   *        schema:
   *         $ref: "#/components/schemas/Error"
   *        examples:
   *         can't find user:
   *          $ref: "#/components/examples/cantFindUser"
   *     "500":
   *      description: Server error when reqesting from database.
   */
  .get(ctrlComments.allComments)
/**
 * @swagger
 *  /users/{idUser}/comments:
 *   post:
 *    summary: Add new comment
 *    description: Add **new comment** to another users profile.
 *    tags: [Comments]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: unique id of comment reciver 
 *       schema:
 *        type: string
 *       required: true
 *       example: 61cde3f73a224927f262b90c
 *    requestBody:
 *     description: Comment data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/CommentUpdateRequest"
 *    responses:
 *     "201":
 *      description: Successfully added comment 
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/CommentsRead"
 *     "400":
 *      description: Error while adding comment.
 *     "401":
 *      description: Access error
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         No token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *      description: Couldn't find a user with the given ID!
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         can't find user:
 *          $ref: "#/components/examples/cantFindUser"
 *     "500":
 *      description: Server error when reqesting from database.
 */
  .post(authentication, ctrlComments.addComment);
router
  .route("/users/:idUser/comments/:idComment")
    /**
 * @swagger
 *  /users/{idUser}/books/{idComment}:
 *   put:
 *    summary: Update chosen comment
 *    description: Update **comment** with text and user data.
 *    tags: [Comments]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Book data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/CommentUpdateRequest"
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: unique id of a user
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: idComment
 *       description: unique id of a comment
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Succesfully edited comment
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/CommentsRead"
 *     "401":
 *      description: Authentication error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *      description: user/comment with userId/CommentId couldn't be found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         commentId:
 *          value:
 *           message: Couldn't find a comment with the given ID!
 *          summary: Couldn't find a comment with the given ID
 *         userId:
 *          value:
 *           mesage: Couldn't find a user with the given ID!
 *          summary: Couldn't find a user with the given ID
 *     "500":
 *      description: Server error when reqesting from database.
 */
  .put(authentication, ctrlComments.editComment)
  /**
 * @swagger
 *  /users/{idUser}/comments/{idComment}:
 *   delete:
 *    summary: Delete chosen comment
 *    description: Delete chosen **comment** from a user
 *    tags: [Comments]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: unique id of a user
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: idComment
 *       description: unique id of a comment
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Successful request with list of comments without deleted comment.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/CommentDeleteResponse"
 *     "404":
 *      description: userId or commentId couldn't be found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         commentId:
 *          value:
 *           message: Couldn't find a comment with the given ID!
 *          summary: Couldn't find a comment with the given ID
 *         userId:
 *          value:
 *           mesage: Couldn't find a user with the given ID!
 *          summary: Couldn't find a user with the given ID
 * 
 *     "401":
 *      description: Authentication error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "500":
 *      description: Error while deleting comment
 */
  .delete(authentication, ctrlComments.deleteComment);

/* Rating */
router
  .route("/users/:idUser/ratings")
 // .get(ctrlRatings.allRatings)
/**
 * @swagger
 *  /users/{idUser}/ratings:
 *   post:
 *    summary: Add new rating
 *    description: Add **new rating** to another users profile.
 *    tags: [Ratings]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: unique id of rating reciver 
 *       schema:
 *        type: string
 *       required: true
 *       example: 61cde3f73a224927f262b90c
 *    requestBody:
 *     description: Comment data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/RatingUpdateRequest"
 *    responses:
 *     "201":
 *      description: Successfully added rating 
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/RatingUpdateResponse"
 *     "400":
 *      description: Error while adding rating.
 *     "401":
 *      description: Access error
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         No token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *      description: Couldn't find a user with the given ID!
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         can't find user:
 *          $ref: "#/components/examples/cantFindUser"
 *     "500":
 *      description: Server error when reqesting from database.
 */
  .post(authentication, ctrlRatings.addRating)
    /**
 * @swagger
 *  /users/{idUser}/ratings:
 *   put:
 *    summary: Update rating
 *    description: Update **rating** of another user.
 *    tags: [Ratings]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: rating data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/RatingUpdateRequest"
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: unique id of a user
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Succesfully edited rating
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: "#/components/schemas/RatingUpdateResponse"
 *     "401":
 *      description: Authentication error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *      description: user with userId couldn't be found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         userId:
 *          value:
 *           mesage: Couldn't find a user with the given ID!
 *          summary: Couldn't find a user with the given ID
 *     "500":
 *      description: Server error when reqesting from database.
 */
  .put(authentication, ctrlRatings.editRating);

/* DB */
router.post("/db/add", ctrlUsers.addUser);
router.post("/db/:idUser/addBook", ctrlBooks.addBook);
router.post("/db/:idUser/addComment", ctrlComments.addComment);
router.post("/db/:idUser/addRanking", ctrlRatings.addRating);
router.delete("/db/delete/:idUser", ctrlUsers.deleteUser);

/* Pagination */
/**
 * @swagger
 *  /pagination/{inputValue}/{pageNumber}:
 *   post:
 *    summary: get books with applyed filters
 *    description: Get 6 books with filters applied
 *    tags: [Books]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: inputValue
 *       description: search filter
 *       schema:
 *        type: string
 *       required: true
 *       example: noFilter
 *     - in: path
 *       name: pageNumber
 *       description: Page number
 *       schema:
 *        type: string
 *       required: true
 *       example: 1
 *    requestBody:
 *     description: Filter data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/BooksFilterRequest"
 *    responses:
 *     "200":
 *      description: Successfully added rating 
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          books:
 *           type: array
 *           items:
 *            $ref: "#/components/schemas/BooksReadAll"
 *          booksPerPage:
 *           type: array
 *           items:
 *            $ref: "#/components/schemas/BooksReadAll"
 *          booksLength:
 *           type: number
 *           example: 3
 *     "400":
 *      description: Error while adding rating.
 *     "401":
 *      description: Access error
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         No token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *      description: PageNumber and inputValue are required parameters
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         pageNumber and inputValue are required parameters:
 *          $ref: "#/components/examples/filterError"
 *     "500":
 *      description: Server error when reqesting from database.
 */
router.post("/pagination/:inputValue/:pageNumber", ctrlBooks.booksPerPage);

module.exports = router;
