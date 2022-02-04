import { Injectable } from '@angular/core';
import { UserSessionInfo } from './modal/user-session-info';
import { HttpClient } from '@angular/common/http';
import { PublicApi } from './public-api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private publicApi: PublicApi) {}

  // userApiUrl = 'http://localhost:4001/userApi';

  getUserSession() {
    // const ELEMENT_DATA: UserSessionInfo[] = [
    //   {radStation: 'Indianapolis', date: '10-10-2021'},
    //   {radStation: 'New York', date: '10-10-2021'},
    // ];

    return this.http.get<UserSessionInfo[]>(this.publicApi.gatewayURL+this.publicApi.userSessionInfoEndpoint);

    // return ELEMENT_DATA;
  }

  postUserQuery(query: any) {
    console.log("postUserQuery:",query);
    return this.http.post(this.publicApi.gatewayURL+this.publicApi.userQueryEndpoint,query);
  }
}
