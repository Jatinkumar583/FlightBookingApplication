import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FlightsearchComponent } from '../flightsearch/flightsearch.component';
import { AirlineInventory } from '../models/airlinedata';
import { BookingDetails } from '../models/bookingdetails';
import { PassengerDetails } from '../models/passengerdetails';
import { UserData } from '../models/UserData';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { FilterPanelService } from '../services/filterpanel';

@Component({
  selector: 'app-bookflight',
  templateUrl: './bookflight.component.html',
  styleUrls: ['./bookflight.component.css']
})
export class BookflightComponent implements OnInit {
  @ViewChild('FlightsearchComponent', {static : false}) filterPanel: any;
  flightRecord:AirlineInventory=new AirlineInventory();
  dynamicArray : Array<PassengerDetails>=new Array<PassengerDetails>();
  bookingDetails: BookingDetails=new BookingDetails();
  userDetails: UserData=new UserData();

  constructor(public filterPanelService: FilterPanelService,private _router: Router,
    private _eventService: EventService,private _authService:AuthService,public datepipe: DatePipe) {
    
  }

  ngOnInit(): void {
    this.flightRecord=this.filterPanelService.data;
    console.log(this.flightRecord);    
    this.dynamicArray.push({ PassengerName: '', PassengerGender: '', PassengerAge:Number(18),MealOption:''  });
  }
  
  addRow() {
    this.dynamicArray.push({ PassengerName: '', PassengerGender: '', PassengerAge:Number(18),MealOption:''  });
    console.log('New row added successfully', 'New Row');
  }
  deleteRow(index:any) {
    if (this.dynamicArray.length > 1)
    this.dynamicArray.splice(index, 1);
  }
  flightBook() {
    this.dynamicArray.forEach((x)=>{ x.PassengerAge=Number(x.PassengerAge) });   
    var pnrNumber=this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss')?.replace('/','').replace(':','').replace('/','').replace(':','').replace(' ','');
    this.bookingDetails.FlightNumber=this.flightRecord.flightNumber;
    this.bookingDetails.Pnr= pnrNumber!;
    this.bookingDetails.Source=this.flightRecord.fromPlace;
    this.bookingDetails.Destination=this.flightRecord.toPlace;
    this.bookingDetails.UserName= localStorage.getItem('username')!;
    this.bookingDetails.EmailId= localStorage.getItem('emailId')!;
    this.bookingDetails.TotalSeat=this.dynamicArray.length;
    this.bookingDetails.PassengerLists=this.dynamicArray;
    this.bookingDetails.CreatedBy=Number(localStorage.getItem('userid')!);
    this.bookingDetails.CreatedOn= new Date();
    this.bookingDetails.UpdatedBy=Number(localStorage.getItem('userid')!);
    this.bookingDetails.UpdatedOn= new Date();
    console.log(this.bookingDetails);
    this._eventService.BookCustomerFlight(this.bookingDetails).subscribe(res=>this.SuccessGet(res),res=>this.ErrorGet(res));;
  }
  SuccessGet(res:any){    
    Swal.fire({  
      position: 'center',  
      icon: 'success',  
      text: 'Booked Flight Successfully!'
    }) 
    this._router.navigate(['/bookinghistory']);   
  }
  ErrorGet(res:any){
    console.log(res);   
    Swal.fire({  
      position: 'center',  
      icon: 'error',  
      title: 'Oops...',  
      text: 'Something went wrong!'
    })  
  }

}
