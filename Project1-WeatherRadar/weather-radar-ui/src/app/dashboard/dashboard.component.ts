import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { RadStation } from '../modal/rad-station';
import { UserSessionInfo } from '../modal/user-session-info';
import { SpinnerService } from '../spinner.service';
import { UserService } from '../user.service';
import { WeatherService } from '../weather.service';


/**
 * Error state matcher for input email values.
 */
 export class InputErrorStateMatcher implements ErrorStateMatcher {
  /**
   * Determines whether error state is
   * @param control
   * @param _form
   * @returns true if error state
   */
  isErrorState(control: FormControl | null): boolean {
    return !!(control?.invalid && (control.dirty || control.touched));
  }
}

/**
 * Dashboard Component
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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
    public spinnerService: SpinnerService) {
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
  dataSource!: UserSessionInfo[];

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
        this.dataSource = data;
        console.log(data);
    })
  }

  // weather radar data
  // weather radar data
  radStationList!: RadStation[];
  getRadStation() {
    this.radStationList = this.weatherService.getRadStationList();
  }

  onSubmit(query: any) {
    this.plotQueryData(query);
    this.postUserAction(query);
  }

  postUserAction(query: any): void {
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
