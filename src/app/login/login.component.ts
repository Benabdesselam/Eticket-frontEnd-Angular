import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Client} from "../model/Client";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../model/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  message!: any
  public lista:any;


  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(u=>{
      this.lista=u;
    })
  }




  doLogin(user: any) {
    this.authService.login(user.username, user.password);
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/home");
    }


  }


}

