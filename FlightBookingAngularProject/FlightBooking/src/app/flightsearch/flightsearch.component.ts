import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AirlineInventory } from '../models/airlinedata';
import { EventService } from '../services/event.service';
import { FilterPanelService } from '../services/filterpanel';

@Component({
  selector: 'app-flightsearch',
  templateUrl: './flightsearch.component.html',
  styleUrls: ['./flightsearch.component.css']
})
export class FlightsearchComponent implements OnInit {
   //flightDetai
  tblShow: boolean = false;
  filteredRecord: Array<AirlineInventory> = new Array<AirlineInventory>();
  SearchAirlineList: Array<AirlineInventory> = new Array<AirlineInventory>();
  constructor(private _eventService: EventService, private _router: Router,public filterPanelService:FilterPanelService) {

  }

  ngOnInit(): void {
  }

  GetScheduleFlights(data: any) {
    this._eventService.GetAirlineList().subscribe(res => this.SearchAirlineList = res, err => (console.log(err),this._router.navigate(['/login'])));
    this.filteredRecord = this.SearchAirlineList.filter(function (item) {
      return item.fromPlace == data.txtFromPlace || item.toPlace == data.txtToPlace || item.startDateTime==data.txtBoardingDate || item.flightNumber==data.txtFlightNumber;
    });
    console.log(this.filteredRecord);
    //this.tblShow = true;
  }

  GoToBookFlight(flightDetails:any){
    this.filterPanelService.data = flightDetails;
    this._router.navigate(['/bookflight']);   
  }

}
