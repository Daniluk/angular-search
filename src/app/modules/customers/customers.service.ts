import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private setSearchSubject = new Subject<any>();

  setSearch$: Observable<any>;

  constructor(

  ) {
    this.setSearch$ = this.setSearchSubject.asObservable();
  }

  setSearch(data?: any): void {
    if (data === null) {
      return;
    }

    this.setSearchSubject.next(data);
  }
}
