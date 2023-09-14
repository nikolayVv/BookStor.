import {Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {BookstorDataService} from '../bookstor-data.service';
import {Book} from '../classes/book';
import {User} from '../classes/user';
import {LayoutComponent} from "../layout/layout.component";
import {AuthenticationService} from "../authentication.service";
import {PovezavaService} from "../povezava.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  constructor(private bookstorDataService: BookstorDataService, private layout: LayoutComponent, private authentication: AuthenticationService, private povezavaStoritev: PovezavaService) {
  }

  @Input() page: string = '';
  @Input() books: Book[] = [];
  @Input() allBooks: number = 0;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  @Output() deleteBookEvent: EventEmitter<Book> = new EventEmitter();

  activePage: number = 0;
  loggedAdmin: boolean = false;
  logged: User = new User();

  ngOnInit(): void {
    if (this.authentication.isLoggedIn()) {
      this.logged = this.layout.getCurrentUser();
      if (this.logged.role === "admin") {
        this.loggedAdmin = true;
      }
    }
    this.onPageChange.emit(1);
    this.activePage = 1;
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.onPageChange.emit(activePageNumber);
  }

  public deleteBook(book: Book) {
    this.deleteBookEvent.next(book);
  }
}
