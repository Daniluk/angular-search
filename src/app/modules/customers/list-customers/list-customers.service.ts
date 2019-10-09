import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, toArray, tap, catchError, debounceTime } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import ICustomer from './interfaces/ICustomer';

@Injectable({
  providedIn: 'root'
})
export class ListCustomersService {

  constructor(
    private http: HttpClient,
  ) {

  }

  fetchItems(text: string = ''): Observable<ICustomer[]> {
    const url = '../../../assets/json/data/customers.json';
    return this.http.get(url)
      .pipe(
        debounceTime(Math.floor(Math.random() * (600 + 1) + 400)),
        map((data: ICustomer[]) => {
          if (text) {
            const re = new RegExp(text, 'i');

            return data.filter(item => {
              if (item.name.match(re)) {

                return true;
              }
              if (item.email.match(re)) {

                return true;
              }

              return item.purchases.filter(value => value.match(re)).length > 0;

            });
          } else {

            return data;
          }
        }),
        switchMap((data: ICustomer[]) => data),
        toArray(),
        catchError(this.handleError),
      );
  }

  private handleError(rawError) {
    let error: any;

    if (rawError instanceof HttpErrorResponse) {
      error = rawError.error || {};
    } else {
      error = rawError.message ? rawError.message : JSON.stringify(rawError);
    }

    return throwError(error);
  }
}
