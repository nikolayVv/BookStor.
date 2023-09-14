import { Inject, Injectable } from '@angular/core';
import { STORAGE_BROWSER } from "./classes/storage";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './classes/user';
import { ResultAuthentication } from './classes/result-authentication';
import { BookstorDataService } from './bookstor-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(STORAGE_BROWSER) private storage: Storage, private bookstordataservice: BookstorDataService) { }

  public b64Utf8(value: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(value), (char: string) => {
          return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }

  public login(user: User): Observable<ResultAuthentication> {
    return this.bookstordataservice.login(user).pipe(
      tap((resultAuthentication: ResultAuthentication) => {
        this.setToken(resultAuthentication['token']);
      })
    );
  }

  public register(user: User): Observable<ResultAuthentication> {
    return this.bookstordataservice.register(user).pipe(
      tap((resultAuthentication: ResultAuthentication) => {
        this.setToken(resultAuthentication['token']);
      })
    );
  }

  public isLoggedIn(): boolean {
    const token: string | null = this.getToken();
    if (token) {
      const value = JSON.parse(this.b64Utf8(token.split('.')[1]));
      return value.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public returnCurrentUser(): User | null {
    if (this.isLoggedIn()) {
      const token: string | null = this.getToken();
      if (token) {
        const { _id } = JSON.parse(
          this.b64Utf8(token.split('.')[1])
        );
        return { _id } as User;
      }
    }
    return null;
  }
  public returnCurrentUserAll(): User | null {
    if (this.isLoggedIn()) {
      const token: string | null = this.getToken();
      if (token) {
        const user = JSON.parse(
          this.b64Utf8(token.split('.')[1])
        );
        return user as User;
      }
    }
    return null;
  }

  public returnCurrentUserId(): any {
    if (this.isLoggedIn()) {
      const token: string | null = this.getToken();
      if (token) {
        const { _id } = JSON.parse(
          this.b64Utf8(token.split('.')[1])
        );
        //console.log(_id);
        return _id;
      }
    }
    return null;
  }

  public logout(): void {
    this.storage.removeItem('bookstor-token');
  }

  public getToken(): string | null {
    return this.storage.getItem('bookstor-token');
  }

  public setToken(token: string): void {
    this.storage.setItem('bookstor-token', token);
  }
}
