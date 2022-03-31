import { PlotStatus } from "./plot-status";

export interface UserSessionInfo {
  id:number;
  userID:number;
  dataType: string;
  radStation: string;
  date: string;
  sessionTime:number;
  plotStatus: string;
}
