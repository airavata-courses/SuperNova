import { RadStation } from "./rad-station";
import { Dictionary } from "lodash";

export class RadStationList {

  static radStationList: RadStation[] = [
    {name:'Indianapolis, IN', value:'KIND'},
    {name:'Albany, NY', value:'KENX'}
  ];

  static getStationName:Dictionary<string> = {
    'KIND':'Indianapolis, IN',
    'KENX':'Albany, NY'
  }



}
