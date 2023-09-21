import { Component, OnInit } from '@angular/core';
import { BookstorDataService } from "../bookstor-data.service";
import {User} from "../classes/user";
import usersJSON from "../../assets/dbUsers.json";
import dataUsers from "../../assets/dbBooksCommentsRatings.json";

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {
  counterUsersDelete = 0;
  counterUsersAdd = 0;

  constructor(private bookstorDataService: BookstorDataService) {}

  deleteData() {
    this.bookstorDataService
      .getAllUsers()
      .subscribe((users) => {
        for (let i = 0; i < users.length; i++) {
          this.bookstorDataService
            .deleteDataDB(users[i]._id)
            .subscribe((answer) => {});
        }
      })
  }

  loadData() {
    console.log("Test");
    this.bookstorDataService
      .getAllUsers()
      .subscribe((users) => {
        this.counterUsersDelete = users.length
        if (this.counterUsersDelete == 0) {
          this.addUsers();
        }
        this.bookstorDataService
          for (let i = 0; i < users.length; i++) {
            this.bookstorDataService
              .deleteDataDB(users[i]._id)
              .subscribe((answer) => {
                this.counterUsersDelete--;
                if (this.counterUsersDelete == 0) {
                  this.addUsers();
                }
              });
          }
      })
  }

  private addUsers() {
    this.counterUsersAdd = usersJSON.length;
    for (let i = 0; i < usersJSON.length; i++) {
      this.bookstorDataService
        .addUserDB(usersJSON[i])
        .subscribe((answer) => {
          this.counterUsersAdd--;
          if (this.counterUsersAdd <= 0) {
            this.addUsersBooks();
          }
        })
    }
  }

  private addUsersBooks() {
    this.bookstorDataService
      .getAllUsers()
      .subscribe(async (users) => {
        for (let i = 0; i < users.length; i++) {
          for (let j = 0; j < dataUsers[i].books.length; j++) {
            let data: any = {
              title: dataUsers[i].books[j].title,
              author: dataUsers[i].books[j].author,
              bookReleaseYear: dataUsers[i].books[j].bookReleaseYear,
              description: dataUsers[i].books[j].description,
              genres: dataUsers[i].books[j].genres,
              condition: dataUsers[i].books[j].condition,
              buy: dataUsers[i].books[j].buy,
              rent: dataUsers[i].books[j].rent,
              buyPrice: dataUsers[i].books[j].buyPrice,
              rentPrice: dataUsers[i].books[j].rentPrice,
              location: users[i].country + ", " + users[i].city,
              phone: users[i].phoneNumber,
              pictures: dataUsers[i].books[j].pictures,
              sellerId: users[i]._id,
              sellerName: users[i].name + " " + users[i].surname,
              ethereumAddress: dataUsers[i].books[j].ethereumAddress,
            }
            await this.bookstorDataService
              .addBookDB(users[i]._id, data)
              .subscribe((answer) => {});
          }
          for (let j = 0; j < dataUsers[i].comments.length; j++) {
            await this.bookstorDataService
              .addCommentDB(users[i]._id, dataUsers[i].comments[j])
              .subscribe((answer) => {});
          }
          if (i < users.length - 1) {
            for (let j = 0; j < dataUsers[i].ratings.length; j++) {
              let data: any = {
                userId: users[i + 1]._id,
                rank: dataUsers[i].ratings[j].rank,
              }
              await this.bookstorDataService
                .addRankingDB(users[i]._id, data)
                .subscribe((answer) => {});
            }
          }
        }
     });
  }

  ngOnInit(): void {
  }

}
