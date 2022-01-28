import { Injectable } from '@angular/core';
import { RadStation } from '../app/modal/rad-station';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  radStationList: RadStation[] = [
    {name:'IND', value:'IND'},
    {name:'NEW YORK', value:'NY'}
  ];
  getRadStationList() {
    return this.radStationList;
  }

  constructor() { }

  getWeatherPlot(query:any) {
    return true;
  }
}
