import {Ticket} from "./Ticket";

export  interface Client{
  id: number;
  image_url:string;
  nom_societe:string
  email : string;
  name : string;
  num_telephone:string;
  tickets :Ticket[];

}
