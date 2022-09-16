import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!:string;
  password!:string;
 message!:any


  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  doLogin(user:any) {
  this.authService.login(user.username,user.password);
    this.authService.login(user.username,user.password);
    if(this.authService.isAuthenticated()){
      this.router.navigateByUrl("/home");
    }
  }
}
