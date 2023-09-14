import { Injectable } from '@angular/core';
import {Router, NavigationEnd, Route} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private urlAddresses: string[] = [];
  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent) => {
      if(routerEvent instanceof NavigationEnd)
        this.urlAddresses.push(routerEvent.urlAfterRedirects);
    });
   }

   public returnPreviousAddress(): string {
    this.urlAddresses.pop();
    if (this.urlAddresses.length > 0) return this.urlAddresses.slice(-1).toString();
    else return '/';
  }

  public returnPreviousAddressWithoutLoginAndRegister(): string {
    const exclude: string[] = ['/register', '/login'];
    this.urlAddresses.pop();
    const filtered = this.urlAddresses.filter((url) => !exclude.includes(url));
    if (filtered.length > 0) return filtered.slice(-1).toString();
    else return '/';
  }
}
