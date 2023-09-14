import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyPicture'
})
export class EmptyPicturePipe implements PipeTransform {

  transform(picture: any): any {
    console.log(picture);
    if(picture == ''){
      return false;
    }else {
      return true;
    }
    
  }

}
