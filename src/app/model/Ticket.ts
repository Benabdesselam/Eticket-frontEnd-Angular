import {Client} from "./Client";
import {Chat} from "./Chat";

export  interface Ticket{
  reference:    string;
  demande:      string;
  createdAt:    Date;
  updatedAt:    Date;
  email_second: string;
  status:string;
  gravite:string;
  raison:string;
  pays:         string;
  client:       Client;
  srn:          string;





}



