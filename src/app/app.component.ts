import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eticket_frontEnd';

  constructor(
              private  router:Router,

              public authService:AuthService){}

  ngOnInit(): void {
    this.authService.loadUser();
   /* if(this.authService.isAuthenticated())
      this.caddyService.loadCaddyFromLocalStorage();
  }*/




}
  onLogin() {
    this.router.navigateByUrl('/login');
  }

  onLogout() {
    //this.caddyService.emptyCaddy();
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
