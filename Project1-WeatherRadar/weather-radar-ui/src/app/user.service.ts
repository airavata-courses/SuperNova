import { Injectable } from '@angular/core';
import { UserSessionInfo } from './modal/user-session-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserSession() {
    const ELEMENT_DATA: UserSessionInfo[] = [
      {radStation: 'Indianapolis', date: '10-10-2021'},
      {radStation: 'New York', date: '10-10-2021'},
    ];

    return ELEMENT_DATA;
  }

  postUserQuery(query: any) {
    console.log(query);
  }
}
