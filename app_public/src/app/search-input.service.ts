import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchInputService {
  searchInput: string = "";
  constructor() { }

  public getSearchInput(): string {
    return this.searchInput;
  }

  public setSearchInput(value: string): void {
    this.searchInput = value;
  }
}
