import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  user!: SocialUser;
  constructor(private router: Router,
    public socialAuthServive: SocialAuthService) {
}
  ngOnInit(): void {
    this.socialAuthServive.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

  logout(): void {
    this.socialAuthServive.signOut().then(() => this.router.navigate(['login']));
  }

  nameIntial(): string {
    const fullName = this.user.name.split(' ');
    const initials = fullName.shift()!.charAt(0) + fullName.pop()!.charAt(0);
    return initials.toUpperCase();
  }

}
