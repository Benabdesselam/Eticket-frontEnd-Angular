import { Component, OnInit } from '@angular/core';
import {TicketService} from "../services/ticket.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ticket} from "../model/Ticket";
import {catchError, Observable, throwError} from "rxjs";
import {Client} from "../model/Client";
import {Raison} from "../model/Raison";
import {Gravite} from "../model/Gravite";




import {CLientService} from "../services/client.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  public ticket!:Ticket;
  public editTicket!:Ticket;
  public tickets!: Ticket[];
  public ref!:string;
  public clients!: Observable<Client[]>;
  private errorMessage!: string;
  public raison!:Raison;
  public gravite!:Gravite;
  public raisonKeys!:string[]
  public graviteKeys!:string[]



  constructor(private ticketService:TicketService,
              private route:ActivatedRoute,
              private router:Router,
              private clientService:CLientService,
              public authService:AuthService) {

  }

  ngOnInit(): void {

    this.ref=this.route.snapshot.params['reference'];



    this.ticketService.getTicketByReference(this.ref).subscribe(ticket=>{
      this.ticket=ticket;
      console.log(ticket);
    });
    this.clients= this.clientService.getClients().pipe(
      catchError(err=> {
        this.errorMessage=err.message;
        return throwError(err);

      })
    );




  }





     onSubmit():void{
   this.ticket.reference=this.ref;
    this.ticketService.updateTicket(this.ticket).subscribe(t=>{
     this.editTicket=t;
   });
    console.log(this.editTicket)
       this.router.navigate(['/ticketDetails',this.ref])

}
}
