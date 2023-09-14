import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { STORAGE_BROWSER } from './classes/storage';
import { of } from "rxjs";

import { Book } from './classes/book';
import { Quote } from './classes/quote';
import { User } from "./classes/user";
import {ResultAuthentication} from "./classes/result-authentication";
import {PovezavaService} from "./povezava.service";

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor(private povezavaStoritev: PovezavaService, private http: HttpClient, @Inject(STORAGE_BROWSER) private storage:Storage) {}

  private apiUrl = 'https://api.quotable.io';

  public getQuote(): Observable<Quote> {
    return this.http
      .get<Quote>(this.apiUrl + "/random")
      .pipe(retry(1), catchError(this.showError));
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
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
