import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { RadStation } from '../modal/rad-station';
import { UserSessionInfo } from '../modal/user-session-info';
import { SpinnerService } from '../spinner.service';
import { UserService } from '../user.service';
import { WeatherService } from '../weather.service';

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
      email:this.user.email,
    });
  }

  populateUserSession() {
    this.userService.getUserSession().subscribe(data => {
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
    const dateInput = new Date(query.date);
    const dateFormatted = `${dateInput.getFullYear()}-${dateInput.getMonth()+1}-${dateInput.getDate()}`
    console.log('query date:', dateFormatted);
    query.date = dateFormatted;
    this.postUserAction(query);
    this.plotQueryData(query);
  }

  postUserAction(query: any): void {
    const currentData = this.userSessionData.data;
    let isPresent = false;
    for(let current of currentData){
      if(current.radStation == query.radStation && current.date == query.date ) {
        isPresent = true;
        break;
      }
    }

    if(!isPresent) {
      const newUserSessionObject:UserSessionInfo = { id:0, userID:0, sessionTime:0, plotStatus:'In Process', radStation: query.radStation, date: query.date};
      currentData.push(newUserSessionObject);
      this.userSessionData.data = currentData;
    } else {
      this._snackBar.open('Query Already Processed',undefined, { duration:1000 });
    }

    console.log(this.userSessionData.data);
    this.userService.postUserQuery(query).subscribe(data=>{
      console.log('Success Post:'+ data);
      // this._snackBar.open('User Query Success',undefined, { duration:2000 })
    },
    err => {
      console.log('Error Post:'+ err);
      // this._snackBar.open('User Query Failed',undefined, { duration:2000 })
    })
  }

  plotQueryData(query: any): void {
    this.weatherService.getWeatherPlot(query).subscribe( blob=> {
      console.log(blob);
      let objectURL = URL.createObjectURL(blob);
      this.file = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      console.log('Plot Generation Success');
      this._snackBar.open('Plot Generation Success',undefined, { duration:1000 });
    },
    err => {
      console.log('Plot Generation Failed',err);
      this._snackBar.open('Plot Generation Failed',undefined, { duration:1000 });
    })
  }

}
