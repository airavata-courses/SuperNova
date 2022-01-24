import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{

  constructor(private router: Router,
    public socialAuthServive: SocialAuthService) {
}

  logout(): void {
    this.socialAuthServive.signOut().then(() => this.router.navigate(['login']));
  }

}
