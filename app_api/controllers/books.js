const mongoose = require("mongoose");
const Book = mongoose.model("Book");
const User = mongoose.model("User");

const allBooks = (req, res) => {
  Book.find().exec((error, books) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(books);
    }
  });
};

const deleteAllBooks = (req, res) => {
  Book.remove({}, (error) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(204).json(null);
    }
  });
};

const bookDetails = (req, res) => {
  let idBook = req.params.idBook;
  if (!idBook) {
    res.status(404).json({
      message: "Couldn't find a book with the given ID!",
    });
  } else {
    Book.findById(idBook).exec((error, book) => {
      if (!book) {
        res.status(404).json({
          message: "Couldn't find a book with the given ID!",
        });
      } else if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(book);
      }
    });
  }
};

const myBooks = (req, res) => {
  let idUser = req.params.idUser;
  let pageNumber = req.params.pageNumber;
  let inputValue = req.params.inputValue;
  if (!pageNumber | !inputValue) {
    return res.status(404).json({
      message: "pageNumber and inputValue are required parameters",
    });
  }
  if (!idUser) {
    return res.status(404).json({
      message: "Couldn't find a user with the given ID!",
    });
  } else {
    User.findById(idUser)
      .select("myBooks")
      .exec((error, user) => {
        if (!user) {
          res.status(404).json({
            message: "Couldn't find a user with the given ID!",
          });
        } else if (error) {
          res.status(500).json(error);
        } else {

          let filteredBooks = [];
          inputValue = inputValue.toUpperCase();
          let title = "";
          user.myBooks.forEach((book) => {
            title = book.title;
            if (title.toUpperCase().indexOf(inputValue) > -1 ||
            inputValue === "NOFILTER") {
              filteredBooks.push(book);
            }
          });
          let length = filteredBooks.length
          let booksPerPage = [];
          let i = 0;
          let checker = 1;
          while (checker < pageNumber) {
            i += 6;
            checker++;
          }
          for (let j = i; j < i + 6; j++) {
            if (j >= filteredBooks.length) break;
            booksPerPage.push(filteredBooks[j]);
          }
          res.status(200).json({books: booksPerPage, length: length});
        }
      });
  }
};

const addBook = (req, res) => {
  let idUser = req.params.idUser;
  if (!idUser) {
    res.status(404).json({
      message: "Couldn't find a user with the given ID!",
    });
  } else {
    Book.create(
      {
        title: req.body.title,
        author: req.body.author,
        bookReleaseYear: req.body.bookReleaseYear,
        description: req.body.description,
        genres: req.body.genres,
        condition: req.body.condition,
        buy: req.body.buy,
        rent: req.body.rent,
        buyPrice: req.body.buyPrice,
        rentPrice: req.body.rentPrice,
        location: req.body.location,
        phone: req.body.phone,
        pictures: req.body.pictures,
        sellerId: req.body.sellerId,
        sellerName: req.body.sellerName,
        ethereumAddress: req.body.ethereumAddress,
      },
      (error, book) => {
        if (error) {
          res.status(400).json(error);
        } else {
          addBookToTheUsersMyList(req, res, idUser, book);
        }
      }
    );
  }
};

const addBookToTheUsersMyList = (req, res, idUser, book) => {
  User.findById(idUser)
    .select("activeSales myBooks")
    .exec((error, user) => {
      if (!user) {
        res.status(404).json({
          message: "Couldn't find a user with the given ID!",
        });
      } else if (error) {
        res.status(500).json(error);
      } else if (!user.myBooks) {
        res.status(404).json({
          message: "Couldn't find any books for that user!",
        });
      } else {
        user.myBooks.push(book);
        user.activeSales = parseInt(user.activeSales) + 1;
        user.save((error, user) => {
          if (error) {
            res.status(400).json(error);
          } else {
            let addedBook = user.myBooks.slice(-1).pop();
            res.status(201).json({
              addedBook: addedBook,
            });
          }
        });
      }
    });
};

const editBook = (req, res) => {
  let { idBook, idUser } = req.params;
  if (!idBook || !idUser) {
    res.status(404).json({
      message:
        "Couldn't find the book/user. idBook/idUser is a required parameter",
    });
  } else {
    Book.findById(idBook).exec((error, book) => {
      if (!book) {
        res.status(404).json({
          message: "Couldn't find a book with the given ID!",
        });
      } else if (error) {
        res.status(500).json(error);
      } else {
        book.title = req.body.title;
        book.author = req.body.author;
        book.bookReleaseYear = req.body.bookReleaseYear;
        book.description = req.body.description;
        book.genres = req.body.genres;
        book.condition = req.body.condition;
        book.buy = req.body.buy;
        book.rent = req.body.rent;
        book.buyPrice = req.body.buyPrice;
        book.rentPrice = req.body.rentPrice;
        book.location = req.body.location;
        book.phone = req.body.phone;
        book.pictures = req.body.pictures;
        book.timesRented = req.body.timesRented;
        book.ethereumAddress = req.body.ethereumAddress;
        book.save((error, book) => {
          if (error) {
            res.status(404).json(error);
          } else {
            editBookInTheUsersMyList(req, res, idUser, book);
          }
        });
      }
    });
  }
};

const editBookInTheUsersMyList = (req, res, idUser, book) => {
  User.findById(idUser)
    .select("myBooks")
    .exec((error, user) => {
      if (!user) {
        res.status(404).json({
          message: "Couldn't find a user with the given ID!",
        });
      } else if (error) {
        res.status(500).json(error);
      } else if (!user.myBooks) {
        res.status(404).json({
          message: "Couldn't find any books for that user!",
        });
      } else {
        user.myBooks.forEach((bookUser) => {
          if (bookUser._id.equals(book._id)) {
            bookUser.title = book.title;
            bookUser.author = book.author;
            bookUser.bookReleaseYear = book.bookReleaseYear;
            bookUser.description = book.description;
            bookUser.genres = book.genres;
            bookUser.condition = book.condition;
            bookUser.buy = book.buy;
            bookUser.rent = book.rent;
            bookUser.buyPrice = book.buyPrice;
            bookUser.rentPrice = book.rentPrice;
            bookUser.location = book.location;
            bookUser.phone = book.phone;
            bookUser.pictures = book.pictures;
            bookUser.timesRented = book.timesRented;
          }
        });
        user.save((error, user) => {
          if (error) {
            res.status(400).json(error);
          } else {
            res.status(200).json({ editedBook: book });
          }
        });
      }
    });
};

const deleteBook = (req, res) => {
  let { idUser, idBook } = req.params;
  if (!idBook || !idUser) {
    res.status(404).json({
      message:
        "Couldn't find the book/user. idBook/idUser is a required parameter",
    });
  } else {
    Book.findByIdAndRemove(idBook).exec((error) => {
      if (error) {
        res.status(500).json(error);
      } else {
        deleteBookFromTheUsersMyList(req, res, idUser, idBook);
      }
    });
  }
};

const deleteBookFromTheUsersMyList = (req, res, idUser, idBook) => {
  User.findById(idUser)
    .select("activeSales myBooks")
    .exec((error, user) => {
      if (!user) {
        res.status(404).json({
          message: "Couldn't find a user with the given ID!",
        });
      } else if (error) {
        res.status(500).json(error);
      } else if (!user.myBooks) {
        res.status(404).json({
          message: "Couldn't find any books for that user!",
        });
      } else {
        user.myBooks.forEach((book) => {
          if (book._id.equals(idBook)) {
            let index = user.myBooks.indexOf(book);
            if (index > -1) user.myBooks.splice(index, 1);
          }
        });
        user.activeSales -= 1;
        user.save((error, user) => {
          if (error) {
            res.status(400).json(error);
          } else {
            res.status(204).json(null);
          }
        });
      }
    });
};

const booksPerPage = (req, res) => {
  let pageNumber = req.params.pageNumber;
  let inputValue = req.params.inputValue;
  let data = req.body;
  console.log(data);
  if (!pageNumber || !inputValue) {
    res.status(404).json({
      message: "pageNumber and inputValue are required parameters",
    });
  } else {
    Book.find().exec((error, books) => {
      if (error) {
        res.status(500).json(error);
      } else {
        let filteredBooks = filterBooks(
          req,
          res,
          data.activeOrderBy,
          data.activeGenreFilters,
          data.activeTypeFilters,
          inputValue.toUpperCase(),
          books
        );
        let booksPerPage = [];
        let i = 0;
        let checker = 1;
        while (checker < pageNumber) {
          i += 6;
          checker++;
        }
        for (let j = i; j < i + 6; j++) {
          if (j >= filteredBooks.length) break;
          booksPerPage.push(filteredBooks[j]);
        }
        res
          .status(200)
          .json({
            booksPerPage: booksPerPage,
            books: books,
            booksLength: filteredBooks.length,
          });
      }
    });
  }
};

const filterBooks = (
  req,
  res,
  activeOrderBy,
  activeGenreFilters,
  activeTypeFilters,
  inputValue,
  books
) => {
  let filteredBooks = [];

  let title = "";
  let right = false;
  let genre = [];
  books.forEach((book) => {
    title = book.title;
    if (
      title.toUpperCase().indexOf(inputValue) > -1 ||
      inputValue === "NOFILTER"
    ) {
      if (activeGenreFilters.length !== 0) {
        right = false;
        genre = book.genres;
        for (let i = 0; i < activeGenreFilters.length; i++) {
          for (let j = 0; j < genre.length; j++) {
            if (activeGenreFilters[i] === genre[j]) {
              right = true;
              break;
            }
          }
          if (right) break;
        }
        if (right) {
          if (activeTypeFilters.length !== 0) {
            right = false;
            for (let i = 0; i < activeTypeFilters.length; i++) {
              if (
                (activeTypeFilters[i] === "Books for sale" && book.buy) ||
                (activeTypeFilters[i] === "Books for rental" && book.rent)
              ) {
                right = true;
                break;
              }
              if (right) break;
            }
            if (right) {
              filteredBooks.push(book);
            }
          } else {
            filteredBooks.push(book);
          }
        }
      } else {
        if (activeTypeFilters.length !== 0) {
          right = false;
          for (let i = 0; i < activeTypeFilters.length; i++) {
            if (
              (activeTypeFilters[i] === "Books for sale" && book.buy) ||
              (activeTypeFilters[i] === "Books for rental" && book.rent)
            ) {
              right = true;
              break;
            }
            if (right) break;
          }
          if (right) {
            filteredBooks.push(book);
          }
        } else {
          filteredBooks.push(book);
        }
      }
    }
  });
  if (activeOrderBy !== "") {
    filteredBooks = filteredBooks.sort((book1, book2) => {
      switch (activeOrderBy) {
        case "Cheapest (for sale)":
          if (book1.buyPrice !== 0.0 && book2.buyPrice === 0.0) return -1;
          if (book1.buyPrice === 0.0 && book2.buyPrice !== 0.0) return 1;
          if (book1.buyPrice < book2.buyPrice) return -1;
          if (book1.buyPrice > book2.buyPrice) return 1;
          if (book1.rentPrice < book2.rentPrice) return -1;
          if (book1.rentPrice > book2.rentPrice) return 1;
          return 0;
        case "Most rented":
          if (book1.timesRented > book2.timesRented) return -1;
          if (book1.timesRented < book2.timesRented) return 1;
          return 0;
        case "Newest":
          if (book1.created > book2.created) return -1;
          if (book1.created < book2.created) return 1;
          return 0;
        default:
          if (book1.title < book2.title) return -1;
          if (book1.title > book2.title) return 1;
          return 0;
      }
    });
  }

  return filteredBooks;
};

module.exports = {
  allBooks,
  bookDetails,
  myBooks,
  addBook,
  editBook,
  deleteBook,
  deleteAllBooks,
  booksPerPage,
};
