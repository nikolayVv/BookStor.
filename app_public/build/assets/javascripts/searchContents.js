const searchInput = document.querySelector("#search");
const genres = document.querySelectorAll('input[name="genres"]');
const types = document.querySelectorAll('input[name="type"]');
const orders = document.querySelectorAll('input[name="orderBy"]');
const books = document.querySelectorAll(".book");
const table = document.querySelector("#bookList");
const lastPage = document.querySelector("#allPages");
const currentPage = document.querySelector("#currentPage");
const activeGenreFilters = [];
const activeTypeFilters = [];

var filteredBooks = [];
var visibleBooks = [];
var activeOrderBy = "";
var currentPageNumber = 1;
var allPages = 0;

const orderBy = (order) => {
    if (order !== "") {
        activeOrderBy = order;
        filteredBooks = [].slice.call(filteredBooks).sort((book1, book2) => {
            switch (activeOrderBy) {
                case "Cheapest (for sale)":
                    book1 = book1.querySelector("h3").innerText.split(",");
                    book2 = book2.querySelector("h3").innerText.split(",");
                    if (
                        parseFloat(book1[0]) !== 0.0 &&
                        parseFloat(book2[0]) === 0.0
                    )
                        return -1;
                    if (
                        parseFloat(book1[0]) === 0.0 &&
                        parseFloat(book2[0]) !== 0.0
                    )
                        return 1;
                    if (parseFloat(book1[0]) < parseFloat(book2[0])) return -1;
                    if (parseFloat(book1[0]) > parseFloat(book2[0])) return 1;
                    if (parseFloat(book1[1]) < parseFloat(book2[1])) return -1;
                    if (parseFloat(book1[1]) > parseFloat(book2[1])) return 1;
                    return 0;
                case "Most rented":
                    book1 = parseInt(book1.querySelector("h2").innerText);
                    book2 = parseInt(book2.querySelector("h2").innerText);
                    if (book1 > book2) return -1;
                    if (book1 < book2) return 1;
                    return 0;
                case "Newest":
                    book1 = book1.querySelector("h1").innerText;
                    book2 = book2.querySelector("h1").innerText;
                    if (book1 > book2) return -1;
                    if (book1 < book2) return 1;
                    return 0;
                case "Alphabet":
                    book1 = book1.querySelector("h6").innerText.toUpperCase();
                    book2 = book2.querySelector("h6").innerText.toUpperCase();
                    if (book1 < book2) return -1;
                    if (book1 > book2) return 1;
                    return 0;
            }
        });
    }
    changePage(1);
};

const applyFilters = () => {
    let inputValue = searchInput.value.toUpperCase();
    let title = "";
    let right = false;
    let genre = [];
    let type = [];

    filteredBooks = [];
    books.forEach((book) => {
        title = book.querySelector("h6").innerText;
        if (title.toUpperCase().indexOf(inputValue) > -1) {
            if (activeGenreFilters.length !== 0) {
                right = false;
                genre = book.querySelector("p").innerText.split(",");
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
                        type = book.querySelector("h5").innerText.split(",");
                        for (let i = 0; i < activeTypeFilters.length; i++) {
                            for (let j = 0; j < type.length; j++) {
                                if (
                                    (activeTypeFilters[i] ===
                                        "Books for sale" &&
                                        type[j] === "buy") ||
                                    (activeTypeFilters[i] ===
                                        "Books for rental" &&
                                        type[j] === "rent")
                                ) {
                                    right = true;
                                    break;
                                }
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
                    type = book.querySelector("h5").innerText.split(",");
                    for (let i = 0; i < activeTypeFilters.length; i++) {
                        for (let j = 0; j < type.length; j++) {
                            if (
                                (activeTypeFilters[i] === "Books for sale" &&
                                    type[j] === "buy") ||
                                (activeTypeFilters[i] === "Books for rental" &&
                                    type[j] === "rent")
                            ) {
                                right = true;
                                break;
                            }
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
    orderBy(activeOrderBy);
};

window.addEventListener("load", (e) => {
    filteredBooks = books;
    books.forEach((book) => {
        book.remove();
    });
    applyFilters();
});

searchInput.addEventListener("input", applyFilters);

genres.forEach((genre) => {
    genre.addEventListener("change", (e) => {
        if (genre.checked) {
            activeGenreFilters.push(genre.value);
        } else {
            let index = activeGenreFilters.indexOf(genre.value);
            if (index > -1) activeGenreFilters.splice(index, 1);
        }
        applyFilters();
    });
});

types.forEach((type) => {
    type.addEventListener("change", (e) => {
        if (type.checked) {
            activeTypeFilters.push(type.value);
        } else {
            let index = activeTypeFilters.indexOf(type.value);
            if (index > -1) activeTypeFilters.splice(index, 1);
        }
        applyFilters();
    });
});

orders.forEach((order) => {
    order.addEventListener("change", (e) => {
        orderBy(order.value);
    });
});
