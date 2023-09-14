import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from '../history.service';
import { BookstorDataService } from '../bookstor-data.service';
import { User } from '../classes/user';
import { ResultAuthentication } from '../classes/result-authentication';
import { Observable, throwError } from 'rxjs';
import {AuthenticationService} from "../authentication.service";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import { LayoutComponent } from "../layout/layout.component";
import {PovezavaService} from "../povezava.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private bookstorDataService: BookstorDataService, private router:Router, private authenticationService: AuthenticationService, private layout: LayoutComponent, private historyService: HistoryService, private povezavaStoritev: PovezavaService) {}
  public user = {
    _id: '',
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    country: '',
    city: '',
    address: '',
    phoneNumber: '',
    successfulSales: 0,
    activeSales: 0,
    joined: '',
    profilePicture: '',
    role: 'user',
    ranking: 0,
    alreadyRanked: [],
    comments: [],
    myBooks: []
  };
  public loginError:string = ""
  public verifyUsername() {
    let username = this.user.username;
    let sporocilo: any = document.getElementById('sporociloUsername');
    let status: any = document.getElementById('username');
    if (!username) {
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Invalid username!';
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
    }
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public verifyPassword() {
    let password = this.user.password;
    let sporocilo: any = document.getElementById('sporociloPassword');
    let status: any = document.getElementById('password');
    if (!password) {
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Invalid password!';
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
    }
  }

  public loginUser(): void {
    this.authenticationService
      .login(this.user)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.loginError = 'Wrong username or password';
        return throwError(() => error);
      })).subscribe(() => {
        this.layout.changeButtonLogged();
        this.layout.loadUser();
        this.router.navigateByUrl(this.historyService.returnPreviousAddressWithoutLoginAndRegister());
      });
  }



  ngOnInit(): void {}
}
