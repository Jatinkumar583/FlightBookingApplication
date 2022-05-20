import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BookedDetails } from '../models/bookeddetails';
import { BookedPassengerDetails } from '../models/bookedpassenger';
import { PassengerDetails } from '../models/passengerdetails';
import { EventService } from '../services/event.service';
import { FilterPanelService } from '../services/filterpanel';

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})
export class BookinghistoryComponent implements OnInit {
  bookedFlightDetails:Array<BookedDetails>=new Array<BookedDetails>(); 
  searchBookedFlightList: Array<BookedDetails> = new Array<BookedDetails>();
  
  constructor(private _eventService: EventService,private _router: Router,public filterPanelService:FilterPanelService) { }

  ngOnInit(): void {
    var userEmailId=localStorage.getItem('emailId')!;
    this._eventService.GetBookedDetailsByEmailId(userEmailId).subscribe(res => this.bookedFlightDetails = res, err => (console.log(err)));
  }

  GetBookedFlightDetails(data: any) {    
    var userEmailId=localStorage.getItem('emailId')!;
    this._eventService.GetBookedDetailsByEmailId(userEmailId).subscribe(res => this.searchBookedFlightList = res, err => (console.log(err),this._router.navigate(['/login'])));
    this.bookedFlightDetails = this.searchBookedFlightList.filter(function (item) {
      return item.pnr == data.txtPnr || item.emailId == data.txtUserEmailId;
    });
    console.log(this.bookedFlightDetails);
  }

  ViewTicketDetails(ticketDetails:BookedDetails){
    this.filterPanelService.BookedData = ticketDetails;    
    this._router.navigate(['/ticketdetails']);   
  }

  CancelTicket(ticketDetails:BookedDetails){
    this._eventService.CancelBookedTicket(ticketDetails.pnr).subscribe(res => this.SuccessGet(res), err => (console.log(err),this._router.navigate(['/login'])));
  }

  SuccessGet(res:any){    
    Swal.fire({  
      position: 'center',  
      icon: 'success',  
      text: 'Ticket Cancelled Successfully!'
    })  
    this.ngOnInit();
  }


}
