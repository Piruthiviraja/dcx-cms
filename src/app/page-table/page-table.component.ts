import { Component } from '@angular/core';

@Component({
  selector: 'app-page-table',
  templateUrl: './page-table.component.html',
  styleUrls: ['./page-table.component.scss']
})
export class PageTableComponent {

  public pagesData =[
    {"pTitle":"Sample Page One","category":"Category One","author":"John Wick"},
    {"pTitle":"Sample Page Two","category":"Category Two","author":"Vicky Nash"},
    {"pTitle":"Sample Page Three","category":"Category One","author":"Jenni Iora"},
    {"pTitle":"Sample Page Four","category":"Category Three","author":"Haley maya"},
    {"pTitle":"Sample Page Five","category":"Category Two","author":"Austen Paige"},
  ]
}
