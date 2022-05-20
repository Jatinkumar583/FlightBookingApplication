
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AirlineInventory } from '../models/airlinedata';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-manageinventory',
  templateUrl: './manageinventory.component.html',
  styleUrls: ['./manageinventory.component.css']
})
export class ManageinventoryComponent implements OnInit {
  airlineInventoryDetails: AirlineInventory = new AirlineInventory();
  inventoryList: Array<AirlineInventory> = new Array<AirlineInventory>();
  isVisibleUpdate:boolean=false;
  isVisibleSubmit:boolean=true;
  constructor(private _eventService: EventService,public datepipe: DatePipe,private _router: Router) { }

  ngOnInit(): void {
    this._eventService.GetAirlineList().subscribe(res => this.inventoryList = res, err => (console.log(err),this._router.navigate(['/login'])));
  }

  AddNewInventory(){    
    var pnrNumber=this.datepipe.transform((new Date), 'dd/MM/yyyy h:mm:ss')?.replace('/','').replace(':','').replace('/','').replace(':','').replace(' ','');
        
    this.airlineInventoryDetails.flightNumber= Number(localStorage.getItem('userid')!+pnrNumber?.substr(8));    
    this.airlineInventoryDetails.totalBussClassSeats=Number(this.airlineInventoryDetails.totalBussClassSeats);
    this.airlineInventoryDetails.ticketCost=Number(this.airlineInventoryDetails.ticketCost);
    this.airlineInventoryDetails.numberOfRows=Number(this.airlineInventoryDetails.numberOfRows);
    this.airlineInventoryDetails.CreatedBy=Number(localStorage.getItem('userid')!);
    this.airlineInventoryDetails.CreatedOn= new Date();
    this.airlineInventoryDetails.UpdatedBy=Number(localStorage.getItem('userid')!);
    this.airlineInventoryDetails.UpdatedOn= new Date();
    
    this._eventService.SaveNewInventory(this.airlineInventoryDetails).subscribe(res=>this.SuccessGet(res),res=>this.ErrorGet(res));
  }

  SuccessGet(res:any){    
    Swal.fire({  
      position: 'center',  
      icon: 'success',  
      text: 'Record Saved Successfully!'
    })
    this.airlineInventoryDetails=new AirlineInventory();  
    this.ngOnInit();
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

  EditInventory(inventoryDetails:AirlineInventory){   
    this.isVisibleUpdate=true;
    this.isVisibleSubmit=false;
   this.airlineInventoryDetails = this.inventoryList.find(x=>x.flightNumber== inventoryDetails.flightNumber)!;
  }
  UpdateInventory(){
    this.isVisibleUpdate=false;
    this.isVisibleSubmit=true;
    this.airlineInventoryDetails.totalBussClassSeats=Number(this.airlineInventoryDetails.totalBussClassSeats);
    this.airlineInventoryDetails.ticketCost=Number(this.airlineInventoryDetails.ticketCost);
    this.airlineInventoryDetails.numberOfRows=Number(this.airlineInventoryDetails.numberOfRows);
    this._eventService.UpdateFlightInventory(this.airlineInventoryDetails).subscribe(res=>this.OnSuccess(res),res=>this.OnError(res));;
  }
  OnSuccess(res:any){    
    Swal.fire({  
      position: 'center',  
      icon: 'success',  
      text: 'Record Updated Successfully!'
    })
    this.airlineInventoryDetails=new AirlineInventory();  
  }
  OnError(res:any){
    console.log(res);   
    Swal.fire({  
      position: 'center',  
      icon: 'error',  
      title: 'Oops...',  
      text: 'Something went wrong!'
    })  
  }

}
