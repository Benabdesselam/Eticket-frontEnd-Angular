import { Component, OnInit } from '@angular/core';
import {Client} from "../model/Client";
import {CLientService} from "../services/client.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
    public clients! :Client[];
    public editClient!: Client;
  public deleteClient!: Client;

  constructor(private clientService:CLientService) { }

  ngOnInit(): void {
    this.getClients();
  }
public getClients():void{
    this.clientService.getClients().subscribe(
      (response:Client[])=>{
        this.clients=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
}

public onOpenModal(client:any,mode:string):void{
  const container=document.getElementById('main-container') ;
  const button=document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addClientModal');
  }
  if (mode === 'edit') {
     this.editClient=client;
    button.setAttribute('data-target', '#updateClientModal');
  }
  if (mode === 'delete') {
     this.deleteClient=client;
    button.setAttribute('data-target', '#deleteClientModal');
  }

  // @ts-ignore
  container.appendChild(button)
  button.click();
  }

  onAddCLient(addForm: NgForm) {

      // @ts-ignore
    document.getElementById('add-client-form').click();
      this.clientService.addClient(addForm.value).subscribe(
        (response: Client) => {
          console.log(response);
          this.getClients();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    }

  public onUpdateClient(client: Client): void {
    this.clientService.updateClient(client).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchClients(key: string): void {
    console.log(key);
    const results: Client[] = [];
    for (const client of this.clients) {
      if (client.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || client.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ||client.num_telephone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || client.nom_societe.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(client);
      }
    }
    this.clients = results;
    if (results.length === 0 || !key) {
      this.getClients();
    }
  }
  public onDeleteClient(clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe(
      (response: void) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  }

