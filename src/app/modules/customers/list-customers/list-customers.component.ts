import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ListCustomersService } from './list-customers.service';
import { CustomersService } from '../customers.service';
import ICustomer from './interfaces/ICustomer';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCustomersComponent implements OnInit {

  items: any[];
  displayedColumns: string[] = ['name', 'email', 'purchases'];

  constructor(
    private service: ListCustomersService,
    private customersService: CustomersService,
    private cdr: ChangeDetectorRef
  ) {
    this.customersService.setSearch$.subscribe((data) => {
      const items = data as ICustomer[];
      this.items = items;
      this.cdr.detectChanges();
    });

    const observable = this.service.fetchItems();
    const subscribe = observable.subscribe((res: ICustomer[]) => {
      this.items = res as ICustomer[];
      this.cdr.detectChanges();
      subscribe.unsubscribe();
    },
      (err) => console.log(err),
    );
  }

  ngOnInit() {
  }
}
