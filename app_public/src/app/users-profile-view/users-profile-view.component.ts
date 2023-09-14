import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookstorDataService } from "../bookstor-data.service";
import { User } from "../classes/user";
import { Comment } from "../classes/comment";
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutComponent } from "../layout/layout.component";
import {Rating} from "../classes/rating";
import {PovezavaService} from "../povezava.service";

@Component({
  selector: 'app-users-profile-view',
  templateUrl: './users-profile-view.component.html',
  styleUrls: ['./users-profile-view.component.css']
})
export class UsersProfileViewComponent implements OnInit {

  newComment: Comment = new Comment();
  newRating: Rating = new Rating();
  logged: User = new User();
  public user: User = new User();

  constructor(private bookstorDataService: BookstorDataService, private route: ActivatedRoute, private layout: LayoutComponent, private povezavaStoritev: PovezavaService) {}

  public errorMessage: string = '';

  rated: boolean = false;

  private validData(): boolean {
    let valid: boolean = false;
    if (this.newComment.text)
      valid = true;
    return valid;
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public deleteComment(idComment: string): void {
    this.bookstorDataService
      .deleteCommentUser(this.user._id, idComment)
      .subscribe((data) => {
        this.user.comments.forEach(comment => {
          if (comment._id == idComment) {
            var index = this.user.comments.indexOf(comment);
            if (index !== -1) {
              this.user.comments.splice(index, 1);
              this.user.comments = this.user.comments.slice();
            }
          }
        })
      });
  }

  public addNewComment(): void {
    this.errorMessage = '';
    if (this.validData()) {
      this.bookstorDataService
        .addCommentUser(this.user._id, this.newComment)
        .subscribe({
          next: (comment) => {
            this.user.comments.push(comment);
            this.user.comments = this.user.comments.slice();
            this.newComment.text = '';
          },
          error: (err) => {
            this.errorMessage = err;
          }
        })
    } else {
      this.errorMessage = 'The textfield is required! Please type your comment and try again!';
    }
  }

  public addNewRating(): void {
    if (this.rated) {
      this.bookstorDataService
        .editRatingUser(this.user._id, this.newRating)
        .subscribe({
          next: (data) => {
            this.user.alreadyRanked.push(data.rating);
            this.user.ranking = data.userRanking;
          },
          error: (err) => {
            this.errorMessage = err;
          }
        })
    } else {
      this.bookstorDataService
        .addRatingUser(this.user._id, this.newRating)
        .subscribe({
          next: (data) => {
            this.user.alreadyRanked.push(data.rating);
            this.user.ranking = data.userRanking;
            this.rated = true;
          },
          error: (err) => {
            this.errorMessage = err;
          }
        })
    }
  }

  loadData(): void {
    this.logged = this.layout.getCurrentUser();
    this.newComment = {
      _id: '',
      profilePicture: this.logged.profilePicture,
      name: this.logged.name + " " + this.logged.surname,
      email: this.logged.email,
      text: '',
      created: ''
    }
    this.newRating = {
      _id: '',
      userId: this.logged._id,
      rank: 0,
    }
    this.user.alreadyRanked.forEach(ranking => {
      if (ranking.userId === this.logged._id) {
        this.rated = true;
        this.newRating.rank = ranking.rank;
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idUser: string = (params.get('idUser') || '').toString();
          return this.bookstorDataService.getUsersProfile(idUser);
        })
      )
      .subscribe((foundUser: User) => {
        this.user = foundUser
        this.loadData();
      });
  }

}
