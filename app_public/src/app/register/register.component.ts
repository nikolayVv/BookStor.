import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HistoryService } from '../history.service';
import { BookstorDataService } from '../bookstor-data.service';
import {AuthenticationService} from "../authentication.service";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {Rating} from "../classes/rating";
import {Comment} from "../classes/comment";
import { User } from "../classes/user";
import { LayoutComponent } from "../layout/layout.component";

import {throwError} from "rxjs";
import {PovezavaService} from "../povezava.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private bookstorDataService: BookstorDataService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private layout: LayoutComponent,
    private historyStoritev: HistoryService,
    private povezavaStoritev: PovezavaService
  ) {}

  ngOnInit(): void {}

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public formControl(): boolean {
    let sporocilo: any = document.getElementById('sporociloName');
    let status: any = document.getElementById('name');
    let submit: any = document.getElementById('submit');
    let result = true;

    if (!this.newUser.name || !this.validateWord(this.newUser.name)) {
      submit.disabled = true;
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Invalid name!';
      result = false;
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
      this.submitControl();
    }

    let priimek = this.newUser.surname;
    sporocilo = document.getElementById('sporociloSurname');
    status = document.getElementById('surname');

    if (!priimek || !this.validateWord(priimek)) {
      submit.disabled = true;
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Invalid surname!';
      result = false;
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
      this.submitControl();
    }

    let uporabniskoIme = this.newUser.username;
    sporocilo = document.getElementById('sporociloUsername');
    status = document.getElementById('username');

    if (!uporabniskoIme || !this.validateUsername(uporabniskoIme)) {
      submit.disabled = true;
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Invalid username!';
      result = false;
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
      this.submitControl();
    }

    let email = this.newUser.email;
    sporocilo = document.getElementById('sporociloEmail');
    status = document.getElementById('email');

    if (!email || !this.validateEmail(email)) {
      submit.disabled = true;
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Invalid email!';
      result = false;
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
      this.submitControl();
    }

    let geslo = this.newUser.password;
    sporocilo = document.getElementById('sporociloPassword');
    status = document.getElementById('password');

    if (!geslo || !this.validatePassword(geslo)) {
      submit.disabled = true;
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML =
        'Password must contain at least 8 characters, 1 number, 1 upper and 1 lower case letter!';
      result = false;
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
      this.submitControl();
    }

    let country = this.newUser.country;
    sporocilo = document.getElementById('sporociloCountry');
    status = document.getElementById('country');

    if (country && !this.validateWords(country)) {
      submit.disabled = true;
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Invalid country!';
      result = false;
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
      this.submitControl();
    }

    let city = this.newUser.city;
    sporocilo = document.getElementById('sporociloCity');
    status = document.getElementById('city');

    if (city && !this.validateWords(city)) {
      submit.disabled = true;
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Invalid city!';
      result = false;
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
      this.submitControl();
    }
    let address = this.newUser.address;
    sporocilo = document.getElementById('sporociloAddress');
    status = document.getElementById('address');

    if (address && !this.validateAddress(address)) {
      submit.disabled = true;
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Invalid address!';
      result = false;
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
      this.submitControl();
    }

    let phoneNumber = this.newUser.phoneNumber;
    sporocilo = document.getElementById('sporociloNumber');
    status = document.getElementById('phoneNumber');

    if (phoneNumber && !this.validateNumber(phoneNumber)) {
      submit.disabled = true;
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Phone number must be of form: (###) ###-####';
      result = false;
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
      this.submitControl();
    }

    return result;
  }

  public submitControl(): void {
    if (document.getElementsByClassName('is-invalid').length == 0) {
      let submit: any = document.getElementById('submit');
      submit.disabled = false;
    }
  }

  public validateEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  public validateWords(input: string): boolean {
    const words = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    return words.test(input);
  }
  public validateWord(input: string): boolean {
    const word = /^[a-zA-Z]*$/;
    return word.test(input);
  }
  public validateUsername(input: string): boolean {
    const username = /^[a-zA-Z0-9_]*$/;
    return username.test(input);
  }
  public validateAddress(input: string): boolean {
    const address = /^[A-Za-z0-9'\.\-\s\,]*$/;
    return address.test(input);
  }
  public validatePassword(input: string): boolean {
    const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return password.test(input);
  }
  public validateNumber(input: string): boolean {
    const number = /^\(?\d{3}\) \d{3}-\d{4}$/;
    return number.test(input);
  }

  public newUser = {
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
  public registerError = "";

  public registerUser(): void {
    if (this.formControl()) {
      this.bookstorDataService
        .registerUserCheck(this.newUser)
        .subscribe({
          next: (user) => {
            if (!user) {
              this.authenticationService
                .register(this.newUser)
                .pipe(catchError((error: HttpErrorResponse) => {
                  this.registerError = error.toString();
                  return throwError(() => error);
                })).subscribe(() => {
                  this.layout.changeButtonLogged();
                  this.layout.loadUser();
                  this.router.navigateByUrl(this.historyStoritev.returnPreviousAddressWithoutLoginAndRegister());
                })
            } else {
              this.registerError = "Email or username is already taken";
            }
          },
          error: (error) => {
            console.log(error);
          }
        })
    }
  }
}
