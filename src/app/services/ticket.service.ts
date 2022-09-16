import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../model/Client";
import {Ticket} from "../model/Ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  public getTickets():Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`${this.apiServerUrl}/ticket/allTicket`);
  }

  public getTicketByReference(reference: string ):Observable<Ticket>{
    return this.http.get<Ticket>(`${this.apiServerUrl}/ticket/findTicket/${reference}`);
  }

  public addTicket(ticket:Ticket):Observable<Ticket>{
    return this.http.post<Ticket>(`${this.apiServerUrl}/ticket/addTicket`,ticket);
  }

  public updateTicket(ticket:Ticket):Observable<Ticket>{
    return this.http.put<Ticket>(`${this.apiServerUrl}/ticket/updateTicket`,ticket);
  }


  public deleteTicket(ticketId:string):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/ticket/DeleteTicket/${ticketId}`);
  }
}
