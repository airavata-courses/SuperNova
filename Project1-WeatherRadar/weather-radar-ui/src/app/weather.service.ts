import { Injectable } from '@angular/core';
import { RadStation } from '../app/modal/rad-station';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PublicApi } from './public-api';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  radStationList: RadStation[] = [
    {name:'IND', value:'KIND'},
    {name:'NEW YORK', value:'NY'}
  ];
  getRadStationList() {
    return this.radStationList;
  }

  // baseWeatherUrl = 'http://127.0.0.1:8000/weatherRadar';
  constructor(private http: HttpClient, private publicApi: PublicApi) { }

  getWeatherPlot(query: any): Observable<Blob>  {
    console.log('Query Params:' + query)
    return this.http.get(this.publicApi.gatewayURL+this.publicApi.weatherRadarEndpoint+'?radar_id='+query.radStation+'&date='+query.date, { responseType: 'blob' });
  }
}
