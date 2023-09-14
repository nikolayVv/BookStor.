import {Component, Injectable, OnInit} from '@angular/core';
import {BookstorDataService} from "../bookstor-data.service";
import {SearchInputService} from "../search-input.service";
import {Book} from '../classes/book';
import {PovezavaService} from "../povezava.service";

@Component({
  selector: 'app-search-contents',
  templateUrl: './search-contents.component.html',
  styleUrls: ['./search-contents.component.css']
})
@Injectable()
export class SearchContentsComponent implements OnInit {

  constructor(private bookstorDataService: BookstorDataService, private searchInput: SearchInputService, private povezavaStoritev: PovezavaService) {
  }

  public books: Book[] = [];
  public booksPerPage: Book[] = [];
  public inputValue: string = "";
  public booksLength = 0;
  activeGenreFilters: string[] = [];
  activeTypeFilters: string[] = [];
  activeOrderBy: string = "";
  currentPage: number = 1;
  public placeholder: string = "Search by title";

  changePage(currPage: number) {
    this.currentPage = currPage;
    this.displayBooks();
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  displayBooks(): void {
    if (!this.jePovezava()) {
      this.placeholder = "Ni povezave"
    } else {
      this.bookstorDataService
        .getBooksPerPage(this.inputValue, this.currentPage,
          {
            activeGenreFilters: this.activeGenreFilters,
            activeTypeFilters: this.activeTypeFilters,
            activeOrderBy: this.activeOrderBy
          })
        .subscribe((answer) => {
          this.booksPerPage = answer.booksPerPage;
          this.books = answer.books
          this.booksLength = answer.booksLength;
        });
    }
  }

  changeGenreFilters(event: any): void {
    let genre = event.srcElement;
    if (genre.checked) {
      this.activeGenreFilters.push(genre.value);
    } else {
      let index = this.activeGenreFilters.indexOf(genre.value);
      if (index > -1) this.activeGenreFilters.splice(index, 1);
    }
    this.displayBooks();
  }

  changeTypeFilters(event: any): void {
    let type = event.srcElement;
    if (type.checked) {
      this.activeTypeFilters.push(type.value);
    } else {
      let index = this.activeTypeFilters.indexOf(type.value);
      if (index > -1) this.activeTypeFilters.splice(index, 1);
    }
    this.displayBooks();
  }

  changeActiveOrder(event: any): void {
    let order = event.srcElement;

    if (order.value !== this.activeOrderBy) {
      this.activeOrderBy = order.value;
      this.displayBooks();
    }
  }


  headPage = {
    title: "Bookstor.",
  }

  filters = {
    genres: [
      "Action & Adventure",
      "Classics",
      "Comic Books",
      "Mystery",
      "Fantasy",
      "Horror",
      "Romance",
      "Thriller",
      "Science Fiction",
      "History",
      "Poetry",
      "Biographies",
      "Children's",
      "Humor",
      "Art & Photography",
      "Travel",
      "Guide / How-to",
      "Cookbooks",
      "Self-Help",
      "Parenting & Families",
    ],
    types: ["Books for sale", "Books for rental"],
    orders: [
      {
        first: "Cheapest (for sale)",
        second: "Newest",
      },
      {
        first: "Most rented",
        second: "Alphabet",
      },
    ],
  }

  public deleteBook(book: Book) {
    this.bookstorDataService
      .deleteUsersBook(book.sellerId, book._id)
      .subscribe(() => this.displayBooks());
  }

  ngOnInit(): void {
    this.inputValue = this.searchInput.getSearchInput();
    this.displayBooks();
  }

}
