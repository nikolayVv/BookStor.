import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookstorDataService} from "../bookstor-data.service";
import {Book} from '../classes/book';
import {LayoutComponent} from "../layout/layout.component";
import {QuotesService} from "../quotes.service";
import {Quote} from "../classes/quote";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SearchInputService} from "../search-input.service";
import {PovezavaService} from '../povezava.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  books!: Observable<Book[]>;
  members: any[];
  quote!: Quote;
  public searchValue: string = "";
  public placeholder: string = "Search by title";

  constructor(
    private bookstorDataService: BookstorDataService,
    private route: ActivatedRoute,
    private layout: LayoutComponent,
    private quoteService: QuotesService,
    private searchInput: SearchInputService,
    private router: Router,
    private povezavaStoritev: PovezavaService
  ) {
    this.members = [
      {
        name: "Jure Čufer",
        img: "/assets/images/about_team_content/Avatar_Jure_Čufer.png",
        info: "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.",
      },
      {
        name: "Nikolay Vasilev",
        img: "/assets/images/about_team_content/harambo.jpg",
        info: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
      },
      {
        name: "Uroš Pavlin",
        img: "/assets/images/about_team_content/monkeUiUi.jpg",
        info: "Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sitamet risus.",
      },
      {
        name: "Jure Kos",
        img: "/assets/images/about_team_content/uuuuh.jpg",
        info: "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.",
      }
    ];
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  ngOnInit(): void {
    this.books = this.getBooks();
    this.quoteService.getQuote().subscribe(quote => {
      this.quote = quote;
    });
  }

  Search() {
    // console.log("searching");
    if (!this.jePovezava()) {
      this.placeholder = "Ni povezave"
    }
    else {
      this.searchInput.setSearchInput(this.searchValue);
      this.router.navigateByUrl("books");
    }
  }

  getBooks(): Observable<Book[]> {
    return this.bookstorDataService
      .getAllBooks()
      .pipe(
        map(books => {
          if (books) {
            books.sort((a, b) => b.timesRented - a.timesRented);
            books.sort((a, b) => b.created - a.created);
          }
          books = books.slice(0, 3);
          return books;
        })
      );
  }
}
