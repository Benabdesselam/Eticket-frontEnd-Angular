import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TicketService} from "../services/ticket.service";
import {Ticket} from "../model/Ticket";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
 public ticket! :any;
  public ref! : string;
  errorMessage! :string;

  constructor(private route:ActivatedRoute,private router:Router,private ticketService:TicketService,public authService:AuthService) {
     //this.ticket=this.router.getCurrentNavigation()?.extras.state as Ticket;

  }

  ngOnInit(): void {
    this.ref=this.route.snapshot.params['reference'];


this.ticketService.getTicketByReference(this.ref).subscribe(ticket=>{
  this.ticket=ticket;
  console.log(ticket);
});


}




}
