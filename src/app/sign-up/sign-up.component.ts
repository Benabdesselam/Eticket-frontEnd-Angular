import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {NgForm} from "@angular/forms";
import {Client} from "../model/Client";
import {HttpErrorResponse} from "@angular/common/http";
import { User } from '../model/User';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
username!:string;
password!:string;
  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  onAddUser(user:User) {
 this.username=user.username;
 this.password=user.password;

    this.authService.addUser(user).subscribe(
      (response: User) => {
        console.log(response);
           this.router.navigateByUrl("")

      },
      (error: HttpErrorResponse) => {
        alert(error.message);

      }
    );
  }

}
