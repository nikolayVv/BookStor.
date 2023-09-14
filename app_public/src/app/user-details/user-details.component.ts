import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { User } from '../classes/user';
import {LayoutComponent} from "../layout/layout.component";
import {BookstorDataService} from "../bookstor-data.service";
import {Router} from "@angular/router";
import {PovezavaService} from "../povezava.service";
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnChanges {
  @Input() user: User = new User();
  logged: User = new User();

  constructor(private bookstorDataService: BookstorDataService, private layout: LayoutComponent, private router: Router, private povezavaStoritev: PovezavaService) {}

  public deleteUser(userId: string) {
    this.bookstorDataService
      .deleteUser(userId)
      .subscribe((data) => {
        this.router.navigateByUrl("books");
      })
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  ngOnChanges(): void {
    this.logged = this.layout.getCurrentUser();
    if (this.logged._id === this.user._id) {
      this.router.navigateByUrl("/myProfile");
    }
  }

}
