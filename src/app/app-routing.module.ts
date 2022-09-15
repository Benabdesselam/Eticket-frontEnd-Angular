import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {ClientComponent} from "./client/client.component";
import {TicketComponent} from "./ticket/ticket.component";
import {TicketDetailsComponent} from "./ticket-details/ticket-details.component";
import {EditTicketComponent} from "./edit-ticket/edit-ticket.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path :"login" , component: LoginComponent},
   { path :"tickets" , component: TicketComponent},
  { path :"ticketDetails/:reference" , component: TicketDetailsComponent},
  { path :"editTicket/:reference" , component: EditTicketComponent},

  { path :"clients" , component: ClientComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
