import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countBooks'
})
export class CountBooksPipe implements PipeTransform {

  transform(value: string, action: string, books: any): number {
    let counter = 0;
    if (action === "genre") {
      if (books) {
        for (let i = 0; i < books.length; i++) {
          for (let j = 0; j < books[i].genres.length; j++) {
            if (value === books[i].genres[j]) counter++;
          }
        }
      }
    } else if (action === "type") {
      if (books) {
        for (let i = 0; i < books.length; i++) {
          if (
            (value === "Books for sale" && books[i].buy) ||
            (value === "Books for rental" && books[i].rent)
          )
            counter++;
        }
      }
    }

    return counter;
  }

}
