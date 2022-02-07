import { PlotStatus } from "./plot-status";

export interface UserSessionInfo {
  id:number;
  userID:number;
  radStation: string;
  date: string;
  sessionTime:number;
  plotStatus: string;
}
