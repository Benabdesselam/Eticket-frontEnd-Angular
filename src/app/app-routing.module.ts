import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {ClientComponent} from "./client/client.component";
import {TicketComponent} from "./ticket/ticket.component";
import {TicketDetailsComponent} from "./ticket-details/ticket-details.component";
import {EditTicketComponent} from "./edit-ticket/edit-ticket.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

const routes: Routes = [
  { path :"" , component: LoginComponent},
  { path :"signUp" , component: SignUpComponent},

  { path :"home" , component: HomeComponent},

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
