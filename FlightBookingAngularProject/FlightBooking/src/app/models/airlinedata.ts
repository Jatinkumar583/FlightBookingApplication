export class AirlineInventory{
    inventoryId: number=0;
    flightNumber: number=0;
    airline:string="";
    fromPlace:string="";
    toPlace: string="";
    startDateTime: string = "";
    endDateTime: string = "";
    scheduledDays: string="";
    instrumentUsed: string="";
    totalBussClassSeats:number=0;
    ticketCost:number=0;
    numberOfRows: number=0;
    meal:string="";
    CreatedBy: Number=0;
    CreatedOn: Date = new Date();
    UpdatedBy: Number=0;
    UpdatedOn: Date=new Date();
}