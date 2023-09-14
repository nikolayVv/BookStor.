import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showPrice'
})
export class ShowPricePipe implements PipeTransform {

  transform(book: any): string {
    let price = "";
    let type = [];
    let cost = [];
    if (book.buy) {
      price += "B $" + parseFloat(book.buyPrice).toFixed(2);
      type.push("buy");
      cost.push(parseFloat(book.buyPrice).toFixed(2));
    } else {
      cost.push(0.00);
    }
    if (book.rent) {
      if (price === "") {
        price += "R $" + parseFloat(book.rentPrice).toFixed(2);
      } else {
        price += " | R $" + parseFloat(book.rentPrice).toFixed(2);
      }
      type.push("rent");
      cost.push(parseFloat(book.rentPrice).toFixed(2));
    } else {
      cost.push(0.00);
    }

    return  `${price}<br />
            <h5 class="visually-hidden">${type}</h5>
            <h3 class="visually-hidden">${cost}</h3>`
  }
}
