import { Injectable } from '@angular/core';
import { RadStation } from '../app/modal/rad-station';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  baseWeatherUrl = 'http://0.0.0.0:8000';
  constructor(private http: HttpClient) { }

  getWeatherPlot(query: any): Observable<Blob>  {
    console.log('Query Params:' + query)
    return this.http.get(this.baseWeatherUrl+'/plot?radar_id='+query.radStation+'&date='+query.date, { responseType: 'blob' });
  }
}
