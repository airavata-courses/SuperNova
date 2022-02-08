import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import b64toBlob from 'b64-to-blob';
import { PlotStatus } from '../modal/plot-status';
import { RadStation } from '../modal/rad-station';
import { RadStationList } from '../modal/rad-station-list';
import { UserQuery } from '../modal/user-query';
import { UserSessionInfo } from '../modal/user-session-info';
import { SpinnerService } from '../spinner.service';
import { UserService } from '../user.service';
import { WeatherService } from '../weather.service';

@Pipe({
  name: 'dateFormatPipe',
})
export class dateFormatPipe implements PipeTransform {
  transform(value: any) {
     var datePipe = new DatePipe("en-US");
      value = datePipe.transform(value, 'MM-dd-YYYY');
      return value;
  }
}

/**
 * Dashboard Component
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{

  /**
   * user - SocialUser object
   */
  user!: SocialUser;
  file!: any;

  /**
   * Creates an instance of dashboard component.
   * @param router
   * @param socialAuthServive
   */
  constructor(private router: Router,
    public socialAuthServive: SocialAuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    public spinnerService: SpinnerService,
    ) {
  }


  /**
   * on init
   */
  ngOnInit(): void {
    this.login();
    this.createForm();
    this.getRadStation();
    this.getRadStationDict();
    setInterval(()=> {
      this.populateUserSession();
    }, 5000);
    this.populateUserSession();
  }


  // Social Login Function
  /**
   * Logins dashboard component
   */
  login(): void {
    this.socialAuthServive.authState.subscribe((user) => {
      this.user = user;
    });
  }


  /**
   * Logouts dashboard component
   */
  logout(): void {
    this.socialAuthServive.signOut().then(() => this.router.navigate(['login']));
  }

  // Toolbar function
  /**
   * Names intial
   * @returns intial
   */
  nameIntial(): string {
    const fullName = this.user.name.split(' ');
    const initials = fullName.shift()!.charAt(0) + fullName.pop()!.charAt(0);
    return initials.toUpperCase();
  }


  // User session data table
  displayedColumns: string[] = ['radStation', 'date', 'plotStatus'];
  userSessionData = new MatTableDataSource<UserSessionInfo>();

  // user input data
  formGroup!: FormGroup;
  maxDate = new Date();
  createForm() {
    this.formGroup = this.formBuilder.group({
      radStation: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      emailAddress:this.user.email,
    });
  }

  populateUserSession() {
    this.userService.getUserSession(this.user.email).subscribe(data => {
        console.log('User API: Session Info Success:', data);
        this.userSessionData.data = data;
        // for(let d of data) {
        //   d.plotStatus= PlotStatus.PROCESS_DONE;
        // }
        this.weatherService.getQueryStatus(data).subscribe(data => {
          console.log('Weather Cache: Query Status Success:', data);
          this.userSessionData.data = data;
        }, error => {
          console.log('Weather Cache: Query Status Fail:', error);
        })

    }, error => {
      console.log('User API: Session Info Fail:', error);
    })
  }

  // weather radar data
  radStationList!: RadStation[];
  getRadStation() {
    this.radStationList = RadStationList.radStationList;
  }

  radStationDictionary: any;
  getRadStationDict() {
    this.radStationDictionary = RadStationList.getStationName;
  }

  onSubmit(query: any) {

    const userQuery:UserQuery = {
      radStation: query.radStation,
      date: new dateFormatPipe().transform(query.date),
      emailAddress: this.user.email
    };
    this.postUserAction(userQuery);
    this.sendQuery(userQuery);
    this.populateUserSession();
  }

  postUserAction(userQuery: UserQuery): void {
    const currentData = this.userSessionData.data;
    for(let current of currentData){
      if(current.radStation == userQuery.radStation && userQuery.date == current.date) {
        this._snackBar.open('Query Already Processed',undefined, { duration:1000 });
        return;
      }
    }
    this.userService.postUserQuery(userQuery).subscribe(data=>{
      console.log('postUserAction Success');
      this._snackBar.open('User Action Recorded',undefined, { duration:1000 });
    },
    err => {
      console.log('postUserAction Error:', err);
    })
  }

  plotQueryData(userQuery: any): void {
    this.weatherService.getWeatherPlot(userQuery).subscribe( base64PlotData=> {
      const contentType = 'image/gif';
      let blob = b64toBlob(base64PlotData, contentType);
      let objectURL = URL.createObjectURL(blob);
      console.log(objectURL);
      this.file = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this._snackBar.open('Plot Generation Success',undefined, { duration:1000 });
    },
    err => {
      console.log('Plot Generation Failed',err);
      this._snackBar.open('Plot Generation Failed',undefined, { duration:1000 });
    })
  }

  sendQuery(userQuery: any): void {
    this._snackBar.open('Query Added in Queue',undefined, { duration:1000 });
    this.weatherService.getWeatherPlot(userQuery).subscribe( blob=> {
      //this.populateUserSession();
    },
    err => {
      console.log('sendQuery Error:', err);
      //this.populateUserSession();
    })
  }

  currentRadStation: string = 'NA';
  currentRadStationDate: string = 'NA';

  OnRowClick(row: any) {
    console.log(row.radStation);
    if (row.plotStatus == PlotStatus.PROCESS_DONE) {
      this.plotQueryData({ radStation:row.radStation, date:row.date });
      this.currentRadStation = RadStationList.getStationName[row.radStation];
      this.currentRadStationDate = row.date;
    }
  }

}

