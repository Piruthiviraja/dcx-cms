import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-page-table',
  templateUrl: './page-table.component.html',
  styleUrls: ['./page-table.component.scss']
})

export class PageTableComponent {

  constructor (private router: Router, private userService: UserService, private dataService: DataService) {
  }

  status: boolean | null = null;
  dataList: any;
  isSelected: boolean = false;
  changeId: number|undefined = undefined;

  ngOnInit() {
    this.userService.getAll()
        .pipe()
        .subscribe(dList => this.dataList = dList);
  }

  public pagesData =[
    {"pTitle":"Sample Page One","category":"Category One","author":"John Wick"},
    {"pTitle":"Sample Page Two","category":"Category Two","author":"Vicky Nash"},
    {"pTitle":"Sample Page Three","category":"Category One","author":"Jenni Iora"},
    {"pTitle":"Sample Page Four","category":"Category Three","author":"Haley maya"},
    {"pTitle":"Sample Page Five","category":"Category Two","author":"Austen Paige"},
    {"pTitle":"Sample Page One","category":"Category One","author":"John Wick"},
    {"pTitle":"Sample Page Two","category":"Category Two","author":"Vicky Nash"},
  ]

  selectRow(e: any, obj: any) {
    // console.log(e, obj);
    this.isSelected = e.target.checked;
    this.changeId = obj.id;
    if (!this.isSelected) {
      this.changeId = undefined;
    }
    console.log(this.isSelected, this.changeId);
    
    this.dataService.transmitData([obj.id, e.target.checked]);
    this.status = true;
  }

  addPageList() {
    this.router.navigate(['/add']);
  }

  editPageList() {
    this.router.navigate(['/edit', this.status]);
  }

  deletePageList() {
    
  }

  ngOnDestroy() {
    this.status = null;
    console.log("this.status", this.status);
  }

}
