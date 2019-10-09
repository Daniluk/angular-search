import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { SearchComponent } from './search/search.component';
import { DemoMaterialModule } from '../../../app/shared-modules/material-module';
import { SearchDirective } from './search/search.directive';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { ListCustomersDirective } from './list-customers/list-customers.directive';


@NgModule({
  declarations: [CustomersComponent, SearchComponent, SearchDirective, ListCustomersComponent, ListCustomersDirective],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    DemoMaterialModule,
  ]
})
export class CustomersModule { }
