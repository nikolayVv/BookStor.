import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookstorDataService } from '../bookstor-data.service';
import { User } from '../classes/user';
import { LayoutComponent } from '../layout/layout.component';
import { Comment } from '../classes/comment';
import { AuthenticationService } from '../authentication.service';
import { UsersProfileViewComponent } from '../users-profile-view/users-profile-view.component';
import {PovezavaService} from "../povezava.service";
import { Router  } from '@angular/router';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  comments: Comment[] = [];
  public filteredComments: Comment[] = [];
  commentsShown: number = 0;
  public user: User = new User();
  newComment: Comment = new Comment();
  public errorMessage: string = '';
  constructor(
    private bookstorDataService: BookstorDataService,
    private route: ActivatedRoute,
    private layout: LayoutComponent,
    private authentication: AuthenticationService,
    private povezavaStoritev: PovezavaService,
    private router: Router
  ) {}

  public editUser() {
    if (!this.formControl()) {
      return;
    }
    this.bookstorDataService
      .editUser(this.user._id, this.user)
      .subscribe((data) => {
        let id = this.authentication.returnCurrentUser()?._id as string;
        this.bookstorDataService
          .getUsersProfile(id)
          .subscribe((user) => (this.user = user));
      });
  }

  showMore(): void {
    let button = document.querySelector("#showMoreButton");
    if (this.commentsShown === this.comments.length) {
      this.commentsShown = 0;
      this.filteredComments = [];
      if (button) {
        button.innerHTML = "Show more";
      }
    }
    let max = this.commentsShown + 3;
    for (let i = this.commentsShown; i < max; i++) {
      this.commentsShown = i;
      if (i >= this.comments.length) {
          if (button) {
            button.innerHTML = "Hide";
          }
          break;
      }
      this.filteredComments.push(this.comments[i]);
    }
  }


  // editOn(): void {
  //   let overlay = document.querySelector("#overlay-editprofile");
  //   let bg = document.querySelector("#backgroundEditForm");
  // }
  /*

function editOn() {
    document.getElementById("overlay-editprofile").style.display = "block";
    document.getElementById("backgroundEditForm").style.display = "block";
}
function editOff() {
    document.getElementById("overlay-editprofile").style.display = "none";
    document.getElementById("backgroundEditForm").style.display = "none";
}
  */

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  loadData(): void {
    if (this.comments) {
      this.comments = [].slice
        .call(this.comments)
        .sort((comment1: Comment, comment2: Comment) => {
          if (comment1.created > comment2.created) return -1;
          if (comment1.created < comment2.created) return 1;
          return 0;
        });
      this.showMore();
    }
  }

  public formControl(): boolean {
    let sporocilo: any = document.getElementById('sporociloName');
    let status: any = document.getElementById('name');
    let submit: any = document.getElementById('submit');
    let result = true;

    let country = this.user.country;
    sporocilo = document.getElementById('sporociloCountry');
    status = document.getElementById('country');

    if (country && !this.validateWords(country)) {
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Invalid country!';
      result = false;
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
      this.submitControl();
    }

    let city = this.user.city;
    sporocilo = document.getElementById('sporociloCity');
    status = document.getElementById('city');

    if (city && !this.validateWords(city)) {
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Invalid city!';
      result = false;
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
      this.submitControl();
    }
    let address = this.user.address;
    sporocilo = document.getElementById('sporociloAddress');
    status = document.getElementById('address');

    if (address && !this.validateAddress(address)) {
      status.className = 'form-control is-invalid';
      sporocilo.innerHTML = 'Invalid address!';
      result = false;
    } else {
      status.className = 'form-control is-valid';
      sporocilo.innerHTML = '';
      this.submitControl();
    }

    let phoneNumber = this.user.phoneNumber;
    sporocilo = document.getElementById('sporociloNumber');
    status = document.getElementById('phoneNumber');

    if (phoneNumber && !this.validateNumber(phoneNumber)) {
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

  public submitControl(): void {}

  public validateWords(input: string): boolean {
    const words = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    return words.test(input);
  }
  public validateWord(input: string): boolean {
    const word = /^[a-zA-Z]*$/;
    return word.test(input);
  }

  public validateAddress(input: string): boolean {
    const address = /^[A-Za-z0-9'\.\-\s\,]*$/;
    return address.test(input);
  }

  public validateNumber(input: string): boolean {
    const number = /^\(?\d{3}\) \d{3}-\d{4}$/;
    return number.test(input);
  }

  ngOnInit(): void {
    if (this.authentication.isLoggedIn()) {
      let id = this.authentication.returnCurrentUser()?._id as string;
      this.bookstorDataService
        .getUsersProfile(id)
        .subscribe(
          (user) => ((this.user = user), (this.comments = user.comments, this.loadData()))
        );
    }
    else{
      this.router.navigate(["login"])
    }
  }
}
