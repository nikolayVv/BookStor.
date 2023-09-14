import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlBreakLines'
})
export class HtmlBreakLinesPipe implements PipeTransform {

  transform(value: string): string {
    return  value.replace(/\n/g, '<br>');
  }

}
