import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { RadStation } from '../modal/rad-station';
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
        this.userSessionData.data = data;
        console.log(data);
    })
  }

  // weather radar data
  radStationList!: RadStation[];
  getRadStation() {
    this.radStationList = this.weatherService.getRadStationList();
  }

  onSubmit(query: any) {

    const userQuery:UserQuery = {
      radStation: query.radStation,
      date: new dateFormatPipe().transform(query.date),
      emailAddress: this.user.email
    };
    this.postUserAction(userQuery);
    this.plotQueryData(userQuery);
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
    this.weatherService.getWeatherPlot(userQuery).subscribe( blob=> {
      console.log(blob);
      let objectURL = URL.createObjectURL(blob);
      this.file = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this._snackBar.open('Plot Generation Success',undefined, { duration:1000 });
    },
    err => {
      console.log('Plot Generation Failed',err);
      this._snackBar.open('Plot Generation Failed',undefined, { duration:1000 });
    })
  }

}

