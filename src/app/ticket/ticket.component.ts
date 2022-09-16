import { Component, OnInit } from '@angular/core';
import {Client} from "../model/Client";
import {Ticket} from "../model/Ticket";
import {CLientService} from "../services/client.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TicketService} from "../services/ticket.service";
import {NgForm} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
import {Option} from "@angular/cli/models/interface";
import {$0} from "@angular/compiler/src/chars";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  public tickets!: Ticket[];
  public clients!: Observable<Client[]>;
  public ticket!: Ticket;
  public editTicket!: Ticket;
  private errorMessage!: string;
  public deleteTicket!: Ticket;
  public selectedClient!: any;
  public ref!:string;

  constructor(private ticketService: TicketService,
              public clientService:CLientService,
              private router:Router,
              private route:ActivatedRoute,
              public auth:AuthService) {
  }

  ngOnInit(): void {


    this.getTickets();
    this.clients= this.clientService.getClients().pipe(
      catchError(err=> {
        this.errorMessage=err.message;
        return throwError(err);

      })
    );



  }

  isAdmin(){
    return this.auth.isAdmin();
 }
  public getTickets(): void {
    this.ticketService.getTickets().subscribe(
      (response: Ticket[]) => {
        this.tickets = response;
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
    if (mode === 'edit') {
      this.editTicket = ticket;
      button.setAttribute('data-target', '#updateTicketModal');
    }
    if (mode === 'delete') {
     this.deleteTicket=ticket;
      button.setAttribute('data-target', '#deleteTicketModal');
    }
    // @ts-ignore
    container.appendChild(button)
    button.click();
  }

  public  onSelectedClient(e:any){
     this.selectedClient = e.target.value;
    console.log(e.target.value);

  }
  onAddTicket(addForm: NgForm) {

    // @ts-ignore
    document.getElementById('add-ticket-form').click();
    this.ticketService.addTicket(addForm.value).subscribe(
      (response: Ticket) => {
        console.log(response);
        this.getTickets();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  handleDetailsTickets(ticket: Ticket) {
    this.router.navigateByUrl("ticketDetails/"+ticket.reference, {state: ticket});
  }


  public onUpdateTicket(ticket:Ticket): void {
    this.ticketService.updateTicket(ticket).subscribe(
      (response: Ticket) => {
        console.log(response);
        this.getTickets();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteTicket(ticketReference: string): void {
    this.ticketService.deleteTicket(ticketReference).subscribe(
      (response: void) => {
        console.log(response);
        this.getTickets();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
      this.getTickets();
    }
  }
}
