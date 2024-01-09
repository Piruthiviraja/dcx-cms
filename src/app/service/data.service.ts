import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new BehaviorSubject<any>({});
  currentData = this.dataSource.asObservable();

  constructor() { }

  transmitData(p: any) {
    console.log(p);
    this.dataSource.next(p);
  }

}
