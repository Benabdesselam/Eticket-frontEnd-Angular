import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import {CLientService} from "./services/client.service";
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import { TicketComponent } from './ticket/ticket.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from "./services/auth.service";
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MyTicketComponent } from './my-ticket/my-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    NavbarComponent,
    TicketComponent,
    TicketDetailsComponent,
    EditTicketComponent,
    ChatComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    MyTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CLientService,CLientService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
