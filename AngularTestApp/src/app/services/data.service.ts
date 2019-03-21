import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { userList } from '../users-mock';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  fullData = [...userList];
  userInfo: any;
  data = new Subject<any>();
  userData = new Subject<any>();
  defaultData = {
    username: 'Anonymous',
    password: '',
    tasks: []
  };

  constructor() { }

  initializeData() {
    this.data.next(this.fullData);
  }

  initializeUserLogged() {
    this.userInfo === undefined || this.userInfo.length === 0
      ? this.userData.next(this.defaultData)
      : this.userData.next(this.userInfo[0]);
  }

  setUserData(userLogged) {
    this.userInfo = this.fullData.filter(user => user.username === userLogged);
  }

  getFullData(): Observable<any[]> {
    return this.data;
  }

  getUserData(): Observable<any[]> {
    return this.userData;
  }
}
