import { Injectable } from '@angular/core';
import { RadStation } from '../app/modal/rad-station';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicApi } from './public-api';
import { UserSessionInfo } from './modal/user-session-info';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient, private publicApi: PublicApi) { }

  getWeatherPlot(userQuery: any): Observable<any>  {
    console.log('Query Params:' + userQuery)
    let endpoint:string;
    if (userQuery.dataType=='NexRAD') {
      endpoint = this.publicApi.weatherPlot;
    } else {
      endpoint = this.publicApi.merraPlot;
    }
    return this.http.get(this.publicApi.gatewayURL+endpoint+'?dataType='+userQuery.dataType+'&radar_id='+userQuery.radStation+'&date='+userQuery.date,{responseType: 'text'});
  }

  getQueryStatus(data:UserSessionInfo[]) {
    return this.http.post<UserSessionInfo[]>(this.publicApi.weatherCacheURL+ this.publicApi.weatherPlotStatus, data);
  }
}
