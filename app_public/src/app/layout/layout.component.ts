import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {User} from '../classes/user';
import {BookstorDataService} from "../bookstor-data.service";
import {HistoryService} from '../history.service';
import {PovezavaService} from '../povezava.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public buttonLogged = false;

  constructor(private authenticationService: AuthenticationService, private bookstordataservice: BookstorDataService, private historyService: HistoryService, private povezavaStoritev: PovezavaService) {
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public logged: User = new User();
  // head = {
  //   title: 'BookStor.',
  //   bonusLinks: ''
  // }
  //
  // navigation = {
  //   button: ''
  // }
  //
  // footer = {
  //   aboutUs: '',
  //   bonusScripts: ''
  // }

  currentRoute: string = "";

  loadUser(): void {
    this.buttonLogged = true;
    const token: string | null = this.authenticationService.getToken();
    if (token) {
      const {_id} = JSON.parse(
        this.authenticationService.b64Utf8(token.split('.')[1])
      );
      this.bookstordataservice.getUsersProfile(_id).subscribe((user) => (this.logged = user));
    }
  }

  getCurrentUser(): User {
    return this.logged;
  }

  changeButtonLogged(): void {
    if (this.buttonLogged) {
      this.buttonLogged = false;
    } else {
      this.buttonLogged = true;
    }
  }

  logout(): void {
    this.authenticationService.logout();
    this.changeButtonLogged();
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.loadUser();

    }
  }

}
