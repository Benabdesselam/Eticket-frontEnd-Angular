import { Component, OnInit } from '@angular/core';
import {TicketService} from "../services/ticket.service";
import {CLientService} from "../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Ticket} from "../model/Ticket";
import {HttpErrorResponse} from "@angular/common/http";
import {Client} from "../model/Client";
import {User} from "../model/User";
import {NgForm} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-my-ticket',
  templateUrl: './my-ticket.component.html',
  styleUrls: ['./my-ticket.component.css']
})
export class MyTicketComponent implements OnInit {
  public tickets!: Ticket[];
  public ticket!:Ticket;
  public client!:Observable<Client>;
  public clients!:Observable<Client[]>;
  private errorMessage!: string;
  public deleteTicket: any;



  constructor(private ticketService: TicketService,
              public clientService:CLientService,
              private router:Router,
              private route:ActivatedRoute,
              public auth:AuthService) { }

  ngOnInit(): void {
    this.getTicketsByClient(this.auth.authenticatedUser);
    this.client=this.clientService.getClient(this.auth.authenticatedUser.id);
    this.clients= this.clientService.getClients().pipe(
      catchError(err=> {
        this.errorMessage=err.message;
        return throwError(err);

      })
    );
  }
  public getTicketsByClient(user:User): void {
    this.ticketService.getTicketsByClient(user.id).subscribe(
      (response: Ticket[]) => {
        this.tickets = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onOpenModal(ticket: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTicketModal');
    }
    if (mode === 'delete') {
      this.deleteTicket=ticket;
      button.setAttribute('data-target', '#deleteTicketModal');
    }

    // @ts-ignore
    container.appendChild(button)
    button.click();
  }
  public onDeleteTicket(ticketReference: string): void {
    this.ticketService.deleteTicket(ticketReference).subscribe(
      (response: void) => {
        console.log(response);
        this.getTicketsByClient(this.auth.authenticatedUser);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onAddTicket(addForm: NgForm) {


    // @ts-ignore
    document.getElementById('add-ticket-form').click();
    this.ticketService.addTicket(addForm.value).subscribe(
      (response: Ticket) => {
        console.log(response);
        this.getTicketsByClient(this.auth.authenticatedUser);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public searchTickets(key: string): void {
    console.log(key);
    const results: Ticket[] = [];
    for (const ticket of this.tickets) {
      if (ticket.demande.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || ticket.status.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ||ticket.pays.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || ticket.client.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(ticket);
      }
    }
    this.tickets = results;
    if (results.length === 0 || !key) {
      this.getTicketsByClient(this.auth.authenticatedUser);

    }
  }
}
