import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './classes/book';

@Pipe({
  name: 'bookListButtons',
})
export class BookListButtonsPipe implements PipeTransform {
  transform(page: string, book: Book): string {
    let html: string = '';
    if(page == "contents"){
      html = '<div class="text-center col"><a class="btn btn-light btn-outline-dark mt-auto" href="/books/bookDetails/{{book._id}}">Show more...</a></div>'
    }
    else{
      html = `
      <div class="text-center col"><a class="btn btn-light btn-outline-dark mt-auto" href="/books/editBooks/{{book._id}}'">Edit</a></div>   
      <div class="text-center col"><a class="btn btn-danger btn-outline-dark mt-auto" (click)="deleteBook(book)">Delete</a></div>   

    `
    }
    return html;
  }
}
