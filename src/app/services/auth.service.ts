import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Client} from "../model/Client";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl=environment.apiBaseUrl;

  public host:string="https://localhost:8085";
  public authenticated!: boolean;
  public authenticatedUser!:any;
  public nameUser!:any;
  private users=[
    {username:"admin", password:"1234",roles:['USER','ADMIN']},
    {username:"user1", password:"1234",roles:['USER']},
    {username:"user2", password:"1234",roles:['USER']}
  ]

  constructor(private http:HttpClient) {
  }

  login(username:string,password:string){
    let user;
    this.users.forEach(u=>{
      if(u.username===username && u.password===password){
        user=u;
        this.nameUser=u.username;
      }
    })
    if(user){
      this.authenticated=true;
      this.authenticatedUser=user;
      localStorage.setItem("authenticatedUser",JSON.stringify(this.authenticatedUser));


    }
    else{
      this.authenticated=false;
    }
  }

  loadUser(){
    let user=localStorage.getItem('authenticatedUser');
    if(user){
      this.authenticatedUser=JSON.parse(user);
      this.authenticated=true;
    }
  }

  isAdmin(){
    if(this.authenticatedUser){
      return this.authenticatedUser.roles.indexOf("ADMIN")>-1;
    }
    else return false;
  }

  isAuthenticated(){
    return this.authenticated;
  }
  logout(){
    this.authenticated=false;
    this.authenticatedUser=undefined;
    localStorage.removeItem('authenticatedUser');
  }


}
