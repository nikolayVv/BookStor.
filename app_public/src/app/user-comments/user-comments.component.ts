import { Component, OnChanges, Input } from '@angular/core';
import { Comment } from '../classes/comment';
import {User} from "../classes/user";
import {LayoutComponent} from "../layout/layout.component";
import {UsersProfileViewComponent} from "../users-profile-view/users-profile-view.component";
import {PovezavaService} from "../povezava.service";
import { MyProfileComponent } from '../my-profile/my-profile.component';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnChanges {
  @Input() comments: Comment[] = [];
  public filteredComments: Comment[] = [];
  commentsShown: number = 0;
  logged: User = new User();

  constructor(private layout: LayoutComponent, private profile: UsersProfileViewComponent, private povezavaStoritev: PovezavaService) {
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
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

  deleteComment(commentId: string): void {
    this.profile.deleteComment(commentId);
    this.comments.forEach(comment => {
      if (comment._id == commentId) {
        var index = this.comments.indexOf(comment);
        if (index !== -1) {
          this.comments.splice(index, 1);
        }
      }
    })
    this.commentsShown = this.comments.length;
    this.showMore();
  }

  ngOnChanges(): void {
    this.logged = this.layout.getCurrentUser();
    this.filteredComments = [];
    this.commentsShown = 0;
    if (this.comments) {
      this.comments = [].slice.call(this.comments).sort((comment1: Comment, comment2: Comment) => {
        if (comment1.created > comment2.created)
          return -1;
        if (comment1.created < comment2.created)
          return 1;
        return 0;
      });
      this.showMore();
    }

  }

}
