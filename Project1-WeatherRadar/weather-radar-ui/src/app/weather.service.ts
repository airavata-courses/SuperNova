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

  getWeatherPlot(userQuery: any): Observable<Blob>  {
    console.log('Query Params:' + userQuery)
    return this.http.get(this.publicApi.weatherServiceURL+this.publicApi.weatherPlot+'?radar_id='+userQuery.radStation+'&date='+userQuery.date, { responseType: 'blob' });
  }

  getQueryStatus(data:UserSessionInfo[]) {
    return this.http.post<UserSessionInfo[]>(this.publicApi.weatherServiceURL+ this.publicApi.weatherPlotStatus, data);
  }
}
