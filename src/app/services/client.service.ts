import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../model/Client";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CLientService {
private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  public getClients():Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiServerUrl}/client/allClient`);
  }

  public addClient(client:Client):Observable<Client>{
    return this.http.post<Client>(`${this.apiServerUrl}/client/addClient`,client);
  }

  public updateClient(client:Client):Observable<Client>{
    return this.http.put<Client>(`${this.apiServerUrl}/client/updateClient`,client);
  }

  public getClientById(clientId:number):Observable<Client>{
    return this.http.get<Client>(`${this.apiServerUrl}/client/findClient/{clientId}`);
  }

  public deleteClient(clientId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/client/DeleteClient/${clientId}`);
  }

}
