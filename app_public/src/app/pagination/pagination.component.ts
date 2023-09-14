import { Component , Input , OnChanges , Output , EventEmitter} from '@angular/core';
import {Book} from "../classes/book";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() allBooks: number = 0;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  activePage: number = 1;
  booksPerPage = 6;
  allPages = 0;
  disabledPrev = "";
  disabledNext = "";

  ngOnChanges(): any {
    this.allPages = Math.ceil(this.allBooks / this.booksPerPage);
    this.activePage = 1;
    this.onPageChange.emit(1);
    this.disabledPrev = "disabled";
    this.disabledNext = "";
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.allPages) {
      this.activePage = pageNumber;
      this.onPageChange.emit(this.activePage);
    }
    if (this.activePage === this.allPages) {
      this.disabledNext = "disabled";
    } else {
      this.disabledNext = "";
    }
    if (this.activePage === 1) {
      this.disabledPrev = "disabled";
    } else {
      this.disabledPrev = "";
    }
  }

}
