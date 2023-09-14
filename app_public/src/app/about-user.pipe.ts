import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aboutUser'
})
export class AboutUserPipe implements PipeTransform {

  transform(member: Object): string {
    return "";
  }

}
