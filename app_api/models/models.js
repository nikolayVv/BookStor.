const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    bookReleaseYear: { type: Number, required: true },
    description: { type: String },
    genres: { type: [String], required: true},
    condition: { type: String },
    buy: { type: Boolean, default: true },
    rent: { type: Boolean, default: false },
    buyPrice: { type: Number, default: 0.0 },
    rentPrice: { type: Number, default: 0.0 },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    pictures: { type: [String], default: "/assets/images/book.png"},
    timesRented: { type: Number, default: 0 },
    sellerId: { type: String, required: true },
    sellerName: { type: String, required: true },
    created: { type: Date, default: Date.now },
    ethereumAddress: {type: String, default: ""}
});

/**
 * @swagger
 * components:
 *  schemas:
 *   BooksReadAll:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: unique id
 *      example: 5ded18eb51386c3799833191
 *     title:
 *      type: string
 *      example: Harry Potter
 *     author:
 *      type: string
 *      example: Book Author
 *     bookReleaseYear:
 *      type: integer
 *      example: 1999
 *     description:
 *      type: string
 *      example: useful book
 *     genres:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - Comic Books
 *     condition:
 *      type: string
 *      example: Used
 *     buy:
 *      type: boolean
 *      example: true
 *      description: is book available for buying
 *     rent:
 *      type: boolean
 *      example: true
 *      description: is book available for renting
 *     buyPrice:
 *      type: number
 *      example: 3
 *     rentPrice:
 *      type: number
 *      example: 3
 *     location:
 *      type: string
 *      description: Sellers address
 *      example: Ljubljana, ulica 3
 *     phone:
 *      type: string
 *      description: Phone number
 *      example: (123) 123-1234
 *     pictures:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - encoded string too long too show
 *     timesRented:
 *      type: number
 *      example: 3
 *     sellerId:
 *      type: string
 *      example: 61cde3f73a224927f262b90c
 *     sellerName:
 *      type: string
 *      example: Johnny    
 *     created:
 *      type: string
 *      format: date-time
 *      example: 2021-12-30T16:54:18.265Z 
 *     ethereumAddress:
 *      type: string
 *      example: 0xb794f5ea0ba39494ce839613fffba74279579268     
 *    required:
 *     - _id
 *     - author
 *     - title
 *     - bookReleaseYear
 *     - description
 *     - genres
 *     - condition
 *     - buy
 *     - rent
 *     - buyPrice
 *     - rentPrice
 *     - location
 *     - phone
 *     - pictures
 *     - timesRented
 *     - sellerId
 *     - sellerName
 *     - created
 *     - ethereumAddress
 *   BooksReadDetails:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: unique id
 *      example: 5ded18eb51386c3799833191
 *     title:
 *      type: string
 *      example: Harry Potter
 *     author:
 *      type: string
 *      example: Book Author
 *     bookReleaseYear:
 *      type: integer
 *      example: 1999
 *     description:
 *      type: string
 *      example: useful book
 *     genres:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - Comic Books
 *     condition:
 *      type: string
 *      example: Used
 *     buy:
 *      type: boolean
 *      example: true
 *      description: is book available for buying
 *     rent:
 *      type: boolean
 *      example: true
 *      description: is book available for renting
 *     buyPrice:
 *      type: number
 *      example: 3
 *     rentPrice:
 *      type: number
 *      example: 3
 *     location:
 *      type: string
 *      description: Sellers address
 *      example: Ljubljana, ulica 3
 *     phone:
 *      type: string
 *      description: Phone number
 *      example: (123) 123-1234
 *     pictures:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - encoded string too long too show
 *     timesRented:
 *      type: number
 *      example: 3
 *     sellerId:
 *      type: string
 *      example: 61cde3f73a224927f262b90c
 *     sellerName:
 *      type: string
 *      example: Johnny    
 *     created:
 *      type: string
 *      format: date-time
 *      example: 2021-12-30T16:54:18.265Z  
 *     ethereumAddress:
 *      type: string
 *      example: 0xb794f5ea0ba39494ce839613fffba74279579268  
 *    required:
 *     - _id
 *     - author
 *     - title
 *     - bookReleaseYear
 *     - description
 *     - genres
 *     - condition
 *     - buy
 *     - rent
 *     - buyPrice
 *     - rentPrice
 *     - location
 *     - phone
 *     - pictures
 *     - timesRented
 *     - sellerId
 *     - sellerName
 *     - created
 *     - ethereumAddress
 *   BooksReadUsers:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: unique id
 *      example: 5ded18eb51386c3799833191
 *     title:
 *      type: string
 *      example: Harry Potter
 *     author:
 *      type: string
 *      example: Book Author
 *     bookReleaseYear:
 *      type: integer
 *      example: 1999
 *     description:
 *      type: string
 *      example: useful book
 *     genres:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - Comic Books
 *     condition:
 *      type: string
 *      example: Used
 *     buy:
 *      type: boolean
 *      example: true
 *      description: is book available for buying
 *     rent:
 *      type: boolean
 *      example: true
 *      description: is book available for renting
 *     buyPrice:
 *      type: number
 *      example: 3
 *     rentPrice:
 *      type: number
 *      example: 3
 *     location:
 *      type: string
 *      description: Sellers address
 *      example: Ljubljana, ulica 3
 *     phone:
 *      type: string
 *      description: Phone number
 *      example: (123) 123-1234
 *     pictures:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - encoded string too long too show
 *     timesRented:
 *      type: number
 *      example: 3
 *     sellerId:
 *      type: string
 *      example: 61cde3f73a224927f262b90c
 *     sellerName:
 *      type: string
 *      example: Johnny    
 *     created:
 *      type: string
 *      format: date-time
 *      example: 2021-12-30T16:54:18.265Z  
 *     ethereumAddress:
 *      type: string
 *      example: 0xb794f5ea0ba39494ce839613fffba74279579268  
 *    required:
 *     - _id
 *     - author
 *     - title
 *     - bookReleaseYear
 *     - description
 *     - genres
 *     - condition
 *     - buy
 *     - rent
 *     - buyPrice
 *     - rentPrice
 *     - location
 *     - phone
 *     - pictures
 *     - timesRented
 *     - sellerId
 *     - sellerName
 *     - created
 *     - ethereumAddress
 *   BookUpdateRequest:
 *    type: object
 *    properties:
 *     title:
 *      type: string
 *      example: Harry Potter
 *     author:
 *      type: string
 *      example: Book Author
 *     bookReleaseYear:
 *      type: integer
 *      example: 1999
 *     description:
 *      type: string
 *      example: useful book
 *     genres:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - Comic Books
 *     condition:
 *      type: string
 *      example: Used
 *     buy:
 *      type: boolean
 *      example: true
 *      description: is book available for buying
 *     rent:
 *      type: boolean
 *      example: true
 *      description: is book available for renting
 *     buyPrice:
 *      type: number
 *      example: 3
 *     rentPrice:
 *      type: number
 *      example: 3
 *     location:
 *      type: string
 *      description: Sellers address
 *      example: Ljubljana, ulica 3
 *     phone:
 *      type: string
 *      description: Phone number
 *      example: (123) 123-1234
 *     pictures:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - encoded string too long too show
 *     timesRented:
 *      type: number
 *      example: 3
 *     sellerId:
 *      type: string
 *      example: 61cde3f73a224927f262b90c
 *     sellerName:
 *      type: string
 *      example: Johnny
 *     ethereumAddress:
 *      type: string
 *      example: 0xb794f5ea0ba39494ce839613fffba74279579268    
 *    required:
 *     - title
 *     - author
 *     - bookReleaseYear
 *     - genres
 *     - sellerId
 *     - sellerName
 *   BookUpdateResponse:
 *    type: object
 *    properties:
 *      addedBook:
 *       type: object
 *       $ref: "#/components/schemas/BooksReadDetails"
 *   BooksFilterRequest:
 *    type: object
 *    properties:
 *     activeGenreFilters: 
 *      type: array
 *      items:
 *       type: string
 *      example: 
 *       - Classics
 *       - Action
 *     activeTypeFilters: 
 *      type: array
 *      items:
 *       type: string
 *      example: 
 *       - Books for rental
 *     activeOrderBy:
 *      type: string
 *      example: newest
 *   BookUpdateResponsePut:
 *    type: object
 *    properties:
 *      editedBook:
 *       type: object
 *       $ref: "#/components/schemas/BooksReadDetails"
*/

const commentSchema = new mongoose.Schema({
    profilePicture: {type: String, default: "/assets/images/avatar.png"},
    name: { type: String, required: true },
    email: { type: String, required: true },
    text: { type: String, required: true },
    created: { type: Date, default: Date.now },
});

const rankingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    rank: { type: Number, default: 0.0, min: 0.0, max: 5.0 }
});

/**
 * @swagger
 * components:
 *  schemas:
 *   CommentUpdateRequest:
 *    description: Comment data when updating
 *    type: object
 *    properties:
 *     text:
 *      type: string
 *      description: Comment text
 *      example: nice user
 *     email:
 *      type: string
 *      description: Commentators email
 *      example: example@email.com
 *     name:
 *      type: string
 *      description: Comementators name
 *      example: Johhny Andreas
 *     profilePicture:
 *      type: string
 *      description: Encoded profile picture
 *      example: string too long to show
 *    required:
 *     - text
 *     - email
 *     - name
 *   CommentsRead:
 *    description: Comment data when updating
 *    type: object
 *    properties:
 *     text:
 *      type: string
 *      description: Comment text
 *      example: helpful guy
 *     email:
 *      type: string
 *      description: Commentators email
 *      example: student@gmail.com
 *     name:
 *      type: string
 *      description: Comementators name
 *      example: Jane Doe
 *     profilePicture:
 *      type: string
 *      description: Encoded profile picture or path to default image
 *      example: /assets/images/avatar.png
 *     created:
 *      type: string
 *      format: date-time
 *      example: 2021-12-30T16:54:18.265Z
 *     _id:
 *      type: string
 *      format: uuid
 *      example: 61cde3f73a224927f262b90c
 *    required:
 *     - text
 *     - email
 *     - name
 *     - profilePicture
 *     - created
 *     - _id
 *   CommentReadAll:
 *    description: return all comments of a user
 *    type: object
 *    properties:
 *     comments:
 *      type: object
 *      $ref: "#/components/schemas/CommentsRead"
 *    required:
 *     - comments
 *   CommentDeleteResponse:
 *    description: return all remaining comments of a user
 *    type: object
 *    properties:
 *     user:
 *      type: object
 *      properties: 
 *       _id:
 *        type: string
 *        format: uuid
 *        example: 61cde3f73a224927f262b90c
 *       comments:
 *        type: object
 *        $ref: "#/components/schemas/CommentsRead"
 *      required:
 *       - _id
 *       - comments
 *    required:
 *     - user
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   RatingUpdateRequest:
 *    description: Rating data when updating
 *    type: object
 *    properties:
 *     userId:
 *      type: string
 *      example: 61cde3f73a224927f262b90c
 *      description: Raters id
 *     rank:
 *      type: number
 *      description: Rating of user
 *      example: 3
 *    required:
 *     - userId
 *     - rank
 *   RatingUpdateResponse:
 *    description: Average rating of a user
 *    type: object
 *    properties:
 *     rating:
 *      type: object
 *      $ref: "#/components/schemas/AlreadyRanked"
 *     userRanking:
 *      type: number
 *      description: average rating of rated user
 *      example: 3.7
 *    required:
 *     - user
 *     - rating
 * 
 *   AlreadyRanked:
 *    description: Data of recived ranks
 *    type: object
 *    properties:
 *     userid:
 *      type: string
 *      format: uuid
 *      example: 61cde3f73a224927f262b90c
 *     rank:
 *      type: number
 *      example: 4
 *     _id:
 *      type: string
 *      format: uuid
 *      example: 61cde3f73a224927f262b30c
 *    required:
 *     - user
 *     - rank
 *     - _id
 */
 

/**
 * @swagger
 * components:
 *  schemas:
 *   UsersReadDetails:
 *    type: object
 *    description: User details
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      example: 61cde3f73a224927f262b90c
 *     successfulSales:
 *      type: number
 *      example: 3
 *     activeSales:
 *      type: number
 *      example: 1
 *     role:
 *      type: string
 *      example: admin
 *     ranking:
 *      type: number
 *      example: 4
 *     joined:
 *      type: string
 *      format: date-time
 *      example: 2021-12-30T16:54:18.265Z
 *     alreadyRanked:
 *      type: array
 *      items:
 *       type: AlreadyRanked
 *      example:
 *       - userId: 61cde3f73a224927f262b90c
 *         rank: 4
 *         _id: 61cede1e1f7a32d2189ae268
 *     comments:
 *      type: array
 *      items:
 *       type: CommentsRead
 *      example: 
 *       - profilePicture: /assets/images/avatar.png
 *         name: Johnny Andrews
 *         email: johnny_a@gmail.com
 *         text: Comment
 *         cyreated: 2021-12-30T16:54:18.265Z
 *         _id: 61cde43a3a224927f262b92a
 *     name:
 *      type: string
 *      description: first name
 *      example: Jane
 *     surname:
 *      type: string
 *      description: last name
 *      example: Doe
 *     username:
 *      type: string
 *      example: Jo
 *     email:
 *      type: string
 *      example: jane.doe@gmail.com
 *     country:
 *      type: string
 *      description: Country of residence
 *      example: Slovenia
 *     city:
 *      type: string
 *      description: City of residence
 *      example: Ljubljana
 *     address:
 *      type: string
 *      description: Home address
 *      example: Ljubljana, ulica 3
 *     phoneNumber:
 *      type: string
 *      description: Phone number
 *      example: (123) 456-7890
 *    required:
 *     - _id
 *     - successfulSales
 *     - activeSales
 *     - profilePicture
 *     - role
 *     - ranking
 *     - joined
 *     - alreadyRanked
 *     - comments
 *     - name
 *     - surname
 *     - email
 *     - country
 *     - city
 *     - address
 *     - phoneNumber
 *   UsersReadSimple:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      example: 61cde3f73a224927f262b90c
 *     name:
 *      type: string
 *      description: first name
 *      example: Jane
 *     surname:
 *      type: string
 *      description: last name
 *      example: Doe
 *     username:
 *      type: string
 *      example: Jo
 *     email:
 *      type: string
 *      example: jane.doe@gmail.com
 *    required:
 *     - _id
 *     - name
 *     - surname
 *     - username
 *     - email
 *   UserCheck:
 *    type: object
 *    properties:
 *     username:
 *      type: string
 *      example: JohnnyAndr
 *     email:
 *      type: string
 *      example: vesten@student.com
 *    required: 
 *     - username
 *     - email 
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   UserLogin:
 *    type: object
 *    description: User data for login
 *    properties:
 *     username:
 *      type: string
 *      example: johnny1
 *     password:
 *      type: string
 *      format: password
 *      example: Password1
 *    required:
 *     - username
 *     - password
 *   UserRegister:
 *    type: object
 *    description: User data for register
 *    properties:
 *     name:
 *      type: string
 *      description: first name
 *      example: Jane
 *     surname:
 *      type: string
 *      description: last name
 *      example: Doe
 *     username:
 *      type: string
 *      example: Jo
 *     email:
 *      type: string
 *      example: jane.doe@gmail.com
 *     password:
 *      type: string
 *      format: password
 *      example: Password1
 *     country:
 *      type: string
 *      description: Country of residence
 *      example: Slovenia
 *     city:
 *      type: string
 *      description: City of residence
 *      example: Ljubljana
 *     address:
 *      type: string
 *      description: Home address
 *      example: Ljubljana, ulica 3
 *     phoneNumber:
 *      type: string
 *      description: Phone number
 *      example: (123) 456-7890
 *    required:
 *     - username
 *     - password
 *     - email
 *     - name
 *     - surname
 *   AuthenticationResponse:
 *    type: object
 *    description: Result of successful authentication
 *    properties:
 *     token:
 *      type: string
 *      description: JWT token
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZhMjBlZDlhZGM0MzIyNmY0NjhkZjMiLCJlbGVrdHJvbnNraU5hc2xvdiI6ImRlamFuQGxhdmJpYy5uZXQiLCJpbWUiOiJEZWphbiBMYXZiacSNIiwiZGF0dW1Qb3Rla2EiOjE1Nzc5NTU2NjMsImlhdCI6MTU3NzM1MDg2M30.PgSpqjK8qD2dHUsXKwmqzhcBOJXUUwtIOHP3Xt6tbBA
 *    required:
 *     - token
 *   Error:
 *    type: object
 *    description: Error description
 *    required:
 *     - message
 *    properties:
 *     message:
 *      type: string
 *    example:
 *     message: Couldn't find a user with the given ID!
 */

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    hashValue: { type: String, required: true },
    randomValue: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String },
    city: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    successfulSales: { type: Number, default: 0 },
    activeSales: { type: Number, default: 0 },
    joined: { type: Date, default: Date.now },
    profilePicture: {type: String, default: "/assets/images/avatar.png"},
    role: {type: String, default: "user"},
    ranking: { type: Number, default: 0 },
    alreadyRanked: [rankingSchema],
    comments: [commentSchema],
    myBooks: [bookSchema],
});

userSchema.methods.convertPassword = function (pass) {
    this.randomValue = crypto.randomBytes(16).toString("hex");
    this.hashValue = crypto
        .pbkdf2Sync(pass, this.randomValue, 1000, 64, "sha512")
        .toString("hex");
};

userSchema.methods.verifyPassword = function (pass) {
    let hashValue = crypto
        .pbkdf2Sync(pass, this.randomValue, 1000, 64, "sha512")
        .toString("hex");
    return this.hashValue == hashValue;
};

userSchema.methods.generateJWT = function () {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    return jwt.sign(
        {
            _id: this._id,
            exp: parseInt(expirationDate / 1000)
            // email: this.email,
            // name: this.name + this.surname,
            // img: this.profilePicture,
            // role: this.role
        },
        process.env.JWT_PASSWORD
    );
};

/**
 * @swagger
 *  components:
 *   examples:
 *    cantFindBook:
 *     summary: can't find book
 *     value:
 *      message: Couldn't find a book with the given ID!.
 *    cantFindUser:
 *     summary: can't find user
 *     value:
 *      message: Couldn't find a user with the given ID!.
 *    filterError:
 *     summary: pageNumber and inputValue are required parameters
 *     value:
 *      message: pageNumber and inputValue are required parameters
 *    NoToken:
 *     summary: JWT token missing
 *     value:
 *      message: "UnauthorizedError: No authorization token was found."
 */

mongoose.model('User', userSchema, 'Users');
mongoose.model('Book', bookSchema, 'Books');
mongoose.model('Comment', commentSchema, 'Comments');
mongoose.model('Rating', rankingSchema, 'Ratings');
