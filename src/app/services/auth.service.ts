import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Client} from "../model/Client";
import {map, Observable} from "rxjs";
import {User} from "../model/User";
import {resolve} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl=environment.apiBaseUrl;

  public host:string="https://localhost:8085";
  public authenticated!: boolean;
  public authenticatedUser!:any;
  public nameUser!:any;
  public users!:User[]


  constructor(private http:HttpClient ) {

    this.getUsers().subscribe(u=>{
      this.users=u;

    })
  }
  ngOnInit(): void {

  }

  public getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/user/allUser`);
  }


  public addUser(user:User):Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/user/addUser`,user);
  }






  login(username:string,password:string){
    let user;
    for (const u of this.users) {

      if (u.username === username && u.password === password) {
        user = u;
        this.nameUser = u.username;
      }
    }
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
  isSupport(){
    if(this.authenticatedUser){
      return this.authenticatedUser.roles=="SUPPORT";
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
