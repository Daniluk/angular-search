import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, tap, debounceTime } from 'rxjs/operators';
import { CustomersService } from '../customers.service';
import { ListCustomersService } from '../list-customers/list-customers.service';
import ICustomer from '../list-customers/interfaces/ICustomer';

@Directive({
  selector: '[appSearch]'
})
export class SearchDirective {

  constructor(
    private el: ElementRef,
    private service: ListCustomersService,
    private customersService: CustomersService
  ) {
    this.addListenerKeyUp();
  }

  private addListenerKeyUp(): void {
    const observable = fromEvent(this.el.nativeElement, 'keyup')
      .pipe(
        debounceTime(400),
        switchMap((data: any) => {
          const word: string = data.target.value;

          return this.service.fetchItems(word);
        })
      );
    observable.subscribe((res: ICustomer[]) => {
      const items: ICustomer[] = res as ICustomer[];
      this.customersService.setSearch(items);
    },
      (err) => console.log(err),
    );
  }
}
