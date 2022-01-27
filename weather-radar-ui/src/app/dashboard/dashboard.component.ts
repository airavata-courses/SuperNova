import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { RadStation } from '../modal/rad-station';
import { UserService } from '../user.service';
import { WeatherService } from '../weather.service';

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

  /**
   * Creates an instance of dashboard component.
   * @param router
   * @param socialAuthServive
   */
  constructor(private router: Router,
    public socialAuthServive: SocialAuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private weatherService: WeatherService) {
  }


  /**
   * on init
   */
  ngOnInit(): void {
    this.login();
    this.createForm();
    this.getRadStation();
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
  displayedColumns: string[] = ['radStation', 'date'];
  dataSource = this.userService.getUserSession();

  // user input data
  formGroup!: FormGroup;

  createForm() {
    this.formGroup = this.formBuilder.group({
      radStation: new FormControl(),
      date: new FormControl(),
      email:this.user.email,
    });
  }

  // weather radar data
  // weather radar data
  radStationList!: RadStation[];
  getRadStation() {
    this.radStationList = this.weatherService.getRadStationList();
  }

  onSubmit(query: any) {
    let result = this.weatherService.getWeatherPlot(query);
    if (result) {
    this.userService.postUserQuery(query);
    }
  }
}
