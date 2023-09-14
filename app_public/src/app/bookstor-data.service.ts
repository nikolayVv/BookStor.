import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { STORAGE_BROWSER } from './classes/storage';

import { Book } from './classes/book';
import { User } from "./classes/user";
import {ResultAuthentication} from "./classes/result-authentication";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookstorDataService {
  constructor(private http: HttpClient, @Inject(STORAGE_BROWSER) private storage:Storage) {}

  private apiUrl = environment.apiUrl;

  public getAllUsers(): Observable<User[]> {
    const url: string = `${this.apiUrl}/users`;
    return this.http
      .get<User[]>(url)
      .pipe(retry(1), catchError(this.showError));
  }

  public getAllBooks(): Observable<Book[]> {
    const url: string = `${this.apiUrl}/books`;
    return this.http
      .get<Book[]>(url)
      .pipe(retry(1), catchError(this.showError));
  }

  public getBooksPerPage(inputValue: string, page: number, data: any): Observable<any> {
    if (inputValue == '') {
      inputValue = 'noFilter';
    }
    const url: string = `${this.apiUrl}/pagination/${inputValue}/${page.toString()}`;
    return this.http
      .post<any>(url, data)
      .pipe(retry(1), catchError(this.showError));
  }

  public getUsersBooks(userId: string, inputValue: string, page: number): Observable<any> {
    if (inputValue == '') {
      inputValue = 'noFilter';
    }
    const url: string = `${this.apiUrl}/books/${userId}/${inputValue}/${page.toString()}`;
    return this.http
      .get<any>(url)
      .pipe(retry(1), catchError(this.showError));
  }

  public registerUserCheck(user: User): Observable<any> {
    const url: string = `${this.apiUrl}/users`;
    return this.http
      .post<any>(url, { username: user.username, email: user.email })
      .pipe(retry(1), catchError(this.showError));
  }

  public deleteUsersBook(userId: string, bookId: string): Observable<Book[]> {
    const url: string = `${this.apiUrl}/users/${userId}/books/${bookId}`;
    const httpProperties = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('bookstor-token')}`,
      }),
    };
    return this.http
      .delete<Book[]>(url , httpProperties)
      .pipe(retry(1), catchError(this.showError));
  }

  public getUsersProfile(idUser: string): Observable<User> {
    const url: string = `${this.apiUrl}/users/${idUser}`;
    return this.http
      .get<User>(url)
      .pipe(retry(1), catchError(this.showError));
  }

  public addCommentUser(idUser: string, data: any): Observable<any> {
    const url: string = `${this.apiUrl}/users/${idUser}/comments`;
    const httpProperties = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('bookstor-token')}`,
      }),
    };
    return this.http
      .post(url, data, httpProperties)
      .pipe(retry(1), catchError(this.showError));
  }

  public deleteCommentUser(idUser: string, idComment: string): Observable<any> {
    const url: string = `${this.apiUrl}/users/${idUser}/comments/${idComment}`;
    const httpProperties = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('bookstor-token')}`,
      }),
    };
    return this.http
      .delete(url, httpProperties)
      .pipe(retry(1), catchError(this.showError));
  }

  public addRatingUser(idUser: string, data: any): Observable<any> {
    const url: string = `${this.apiUrl}/users/${idUser}/ratings`;
    const httpProperties = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('bookstor-token')}`,
      }),
    };
    return this.http
      .post(url, data, httpProperties)
      .pipe(retry(1), catchError(this.showError));
  }

  public editRatingUser(idUser: string, data: any): Observable<any> {
    const url: string = `${this.apiUrl}/users/${idUser}/ratings`;
    const httpProperties = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('bookstor-token')}`,
      }),
    };
    return this.http
      .put(url, data, httpProperties)
      .pipe(retry(1), catchError(this.showError));
  }

  public login(user: User): Observable<ResultAuthentication> {
    return this.authentication('users/login', user);
  }

  public register(user: User): Observable<ResultAuthentication> {
    return this.authentication('users/register', user);
  }

  public addBook(userId: string, data: any): Observable<Book[]> {
    const url: string = `${this.apiUrl}/users/${userId}/books`;
    const httpProperties = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('bookstor-token')}`,
      }),
    };
    return this.http
      .post<Book[]>(url, data, httpProperties)
      .pipe(retry(1), catchError(this.showError));
  }

  public bookDetails(bookId: string,): Observable<Book> {
    const url: string = `${this.apiUrl}/books/${bookId}`;
    return this.http
      .get<Book>(url)
      .pipe(retry(1), catchError(this.showError));
  }

  public getUser(userId: string): Observable<User> {
    const url: string = `${this.apiUrl}/users/${userId}`;
    return this.http
      .get<User>(url)
      .pipe(retry(1), catchError(this.showError));
  }

  public deleteUser(userId: string): Observable<any> {
    const url: string = `${this.apiUrl}/users/${userId}`;
    const httpProperties = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('bookstor-token')}`,
      }),
    };
    return this.http
      .delete<any>(url, httpProperties)
      .pipe(retry(1), catchError(this.showError));
  }

  public editBook(userId: string, idBook: string, data: any): Observable<Book[]> {
    const url: string = `${this.apiUrl}/users/${userId}/books/${idBook}`;
    const httpProperties = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('bookstor-token')}`,
      }),
    };
    return this.http
      .put<Book[]>(url, data, httpProperties)
      .pipe(retry(1), catchError(this.showError));
  }

  public editUser(userId: string, data: any): Observable<User[]> {
    const url: string = `${this.apiUrl}/users/${userId}`;
    const httpProperties = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('bookstor-token')}`,
      }),
    };
    return this.http
      .put<User[]>(url, data, httpProperties)
      .pipe(retry(1), catchError(this.showError));
  }

  public deleteDataDB(idUser: string): Observable<any> {
    const url: string = `${this.apiUrl}/db/delete/${idUser}`;
    return this.http
      .delete<any>(url)
      .pipe(retry(1), catchError(this.showError));
  }

  public addUserDB(user: any): Observable<any> {
    const url: string = `${this.apiUrl}/db/add`;
    return this.http
      .post<any>(url, user)
      .pipe(retry(1), catchError(this.showError));
  }

  public addBookDB(userId: string, book: any): Observable<any> {
    const url: string = `${this.apiUrl}/db/${userId}/addBook`;
    return this.http
      .post<any>(url, book)
      .pipe(retry(1), catchError(this.showError));
  }

  public addCommentDB(userId: string, comment: any): Observable<any> {
    const url: string = `${this.apiUrl}/db/${userId}/addComment`;
    return this.http
      .post<any>(url, comment)
      .pipe(retry(1), catchError(this.showError));
  }

  public addRankingDB(userId: string, ranking: any): Observable<any> {
    const url: string = `${this.apiUrl}/db/${userId}/addRanking`;
    return this.http
      .post<any>(url, ranking)
      .pipe(retry(1), catchError(this.showError));
  }

  private authentication(
    urlAddress: string,
    user: User
  ): Observable<ResultAuthentication> {
    const url: string = `${this.apiUrl}/${urlAddress}`;
    return this.http
      .post<ResultAuthentication>(url, user)
      .pipe(retry(1), catchError(this.showError));
  }

  private showError(napaka: HttpErrorResponse) {
    return throwError(
      () =>
        `There was an error '${napaka.status}' with '${
          napaka.error.message || napaka.statusText
        }'`
    );
  }
}
