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

  getUserSession(emailAddress: string) {
    return this.http.get<UserSessionInfo[]>(this.publicApi.gatewayURL+this.publicApi.userSessionInfoEndpoint+'?emailAddress='+emailAddress);
  }

  postUserQuery(query: any) {
    console.log("postUserQuery:",query);
    return this.http.post(this.publicApi.userApiURL+this.publicApi.userQueryEndpoint,query);
  }
}
