import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixLength'
})
export class FixLengthPipe implements PipeTransform {

  transform(text: string, maxChars: number): string {
    if (text.length > maxChars+1) {
      let replaceChars = text.length - maxChars;
      text = text.slice(0,-replaceChars);
      text = text + "...";
    }
    return text;
  }
}
