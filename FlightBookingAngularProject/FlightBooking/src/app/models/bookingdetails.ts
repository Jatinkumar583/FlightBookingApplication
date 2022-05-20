import { PassengerDetails } from "./passengerdetails";

export class BookingDetails{   
    FlightNumber: Number=0;
    Pnr: string="";
    Source: string="";
    Destination:string="";
    UserName: String="";
    EmailId: String="";
    TotalSeat:Number=0;
    PassengerLists:  Array<PassengerDetails>=new Array<PassengerDetails>();
    CreatedBy: Number=0;
    CreatedOn: Date = new Date();
    UpdatedBy: Number=0;
    UpdatedOn: Date=new Date();
}