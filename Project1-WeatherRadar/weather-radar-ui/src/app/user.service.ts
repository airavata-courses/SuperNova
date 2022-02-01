import { Injectable } from '@angular/core';
import { UserSessionInfo } from './modal/user-session-info';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  userApiUrl = 'http://localhost:4001';

  getUserSession() {
    // const ELEMENT_DATA: UserSessionInfo[] = [
    //   {radStation: 'Indianapolis', date: '10-10-2021'},
    //   {radStation: 'New York', date: '10-10-2021'},
    // ];

    return this.http.get<UserSessionInfo[]>(this.userApiUrl+'/sessionInfo');

    // return ELEMENT_DATA;
  }

  postUserQuery(query: any) {
    console.log(query);
    return this.http.post(this.userApiUrl+'/userQuery',query);
  }
}
