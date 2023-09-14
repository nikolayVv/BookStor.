import { Component, OnInit } from '@angular/core';
import { BookstorDataService } from '../bookstor-data.service';
import { Book } from '../classes/book';
import { User } from '../classes/user';
import { AuthenticationService } from '../authentication.service';
import { LayoutComponent } from '../layout/layout.component';
import { Router } from '@angular/router';
import {PovezavaService} from "../povezava.service";


@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css'],
})
export class MyBooksComponent implements OnInit {
  constructor(
    private bookstorDataService: BookstorDataService,
    private layout: LayoutComponent,
    private router: Router,
    private authenticationService: AuthenticationService,
    private povezavaStoritev: PovezavaService
  ) {}

  public books: Book[] = [];
  public booksPerPage: Book[] = [];
  public inputValue: string = '';
  logged: User = new User();
  public booksLength = 0;
  currentPage: number = 1;

  public placeholder: string = "Search by title";

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  changePage(currPage: number) {
    this.currentPage = currPage;
    this.displayBooks();
  }

  displayBooks(): void {
    if (!this.jePovezava()) {
      this.placeholder = "Ni povezave"
    }
    else {
      if (this.authenticationService.isLoggedIn()) {
        this.logged = this.authenticationService.returnCurrentUser() as User;
        this.bookstorDataService
          .getUsersBooks(this.logged._id, this.inputValue, this.currentPage)
          .subscribe((data) => {
            this.booksPerPage = data.books,
              this.booksLength = data.length
          });
      } else {
        this.router.navigate([""]);
      }
    }
  }


  public deleteBook(book: Book) {
    this.logged = this.layout.getCurrentUser();
    this.bookstorDataService
      .deleteUsersBook(this.logged._id, book._id)
      .subscribe(() => this.displayBooks());
  }

  headPage = {
    title: 'Bookstor.',
    // logged: {
    //   name: req.cookies.name,
    //   img: "../" + req.cookies.img,
    //   id: req.cookies.id,
    //   role: req.cookies.role,
    // },
  };

  ngOnInit(): void {
    this.displayBooks();
  }
}
