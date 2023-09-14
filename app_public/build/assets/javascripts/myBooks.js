const searchInput = document.querySelector("#search");
const lastPage = document.querySelector("#allPages");
const currentPage = document.querySelector("#currentPage");
const books = document.querySelectorAll(".book");
const table = document.querySelector("#bookList");

var filteredBooks = [];
var visibleBooks = [];
var prevPageNumber = 1;
var currentPageNumber = 1;
var booksPerPage = 6;
var allPages = 0;

const changePage = (pageNumber) => {
    let buttonNext = document.getElementById("next");
    let buttonPrev = document.getElementById("prev");

    allPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (allPages === 0) allPages = 1;
    lastPage.innerText = allPages;

    if (pageNumber < 1) {
        pageNumber = 1;
    }
    if (pageNumber > allPages) pageNumber = allPages;

    for (let i = 0; i < 6; i++) {
        if (i >= visibleBooks.length) break;
        table.removeChild(visibleBooks[i]);
    }
    visibleBooks = [];

    for (
        let i = (pageNumber - 1) * booksPerPage;
        i < pageNumber * booksPerPage;
        i++
    ) {
        if (i >= filteredBooks.length) break;
        table.appendChild(filteredBooks[i]);
        visibleBooks.push(filteredBooks[i]);
    }

    prevPageNumber = pageNumber;
    currentPageNumber = pageNumber;
    currentPage.innerText = pageNumber;

    if (pageNumber == 1) {
        buttonPrev.classList.add("disabled");
    } else {
        buttonPrev.classList.remove("disabled");
    }

    if (pageNumber == allPages) {
        buttonNext.classList.add("disabled");
    } else {
        buttonNext.classList.remove("disabled");
    }
};

const prevPage = function () {
    if (currentPageNumber > 1) {
        currentPageNumber--;
        changePage(currentPageNumber);
    }
};

const nextPage = function () {
    if (currentPageNumber < allPages) {
        currentPageNumber++;
        changePage(currentPageNumber);
    }
};

const applyFilters = () => {
    let inputValue = searchInput.value.toUpperCase();
    let title = "";

    filteredBooks = [];
    books.forEach((book) => {
        title = book.querySelector("h6").innerText;
        if (title.toUpperCase().indexOf(inputValue) > -1) {
            filteredBooks.push(book);
        }
    });
    changePage(1);
};

searchInput.addEventListener("input", applyFilters);
applyFilters();
