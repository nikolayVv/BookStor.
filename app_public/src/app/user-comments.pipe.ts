import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from './classes/comment';
@Pipe({
  name: 'userComments'
})
export class UserCommentsPipe implements PipeTransform {

  transform(comments: Comment[]): string {
    // const date = new Date(comment.created);
    // const months = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ];
    // const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    // const m = months[date.getMonth()];
    // const l = date.getFullYear();
    // const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    // const min =
    //   date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    // const s =
    //   date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    // let deleteComment =
    //   comment.email === logged.email || logged.role === "admin"
    //     ? `<form action="/usersProfileView/${user._id}/deleteComment/${comment._id}" method="post">
    //                         <span class="text-secondary">${d}. ${m}, ${l} - ${h}:${min}:${s}</span>
    //                         <input type="submit" class="btn btn-link text-decoration-none" value="Delete comment">
    //                      </form>`
    //     : `<span class="text-secondary">${d}. ${m}, ${l} - ${h}:${min}:${s}</span>`;
    return `

                    </li>`;
  }

}
