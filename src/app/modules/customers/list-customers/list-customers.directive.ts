import { Directive, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appListCustomers]'
})
export class ListCustomersDirective implements AfterViewInit {

  constructor(
    private el: ElementRef,
  ) {

  }

  ngAfterViewInit() {
    const text = this.el.nativeElement.innerHTML.split(',').join(', ');
    this.el.nativeElement.innerHTML = text;
  }
}
