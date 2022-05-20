import { Injectable } from '@angular/core';
import { AirlineInventory } from '../models/airlinedata';
import { BookedDetails } from '../models/bookeddetails';

@Injectable()
export class FilterPanelService {

  selectedFlightDetails: AirlineInventory=new AirlineInventory();
  bookedTicketDetails: BookedDetails=new BookedDetails();
  constructor() { }

   get data(): any{
    return this.selectedFlightDetails;
  }

  set data(val: any){
    this.selectedFlightDetails = val;
  }

  get BookedData(): any{
    return this.bookedTicketDetails;
  }
  set BookedData(val: any){
    this.bookedTicketDetails = val;
  }

}