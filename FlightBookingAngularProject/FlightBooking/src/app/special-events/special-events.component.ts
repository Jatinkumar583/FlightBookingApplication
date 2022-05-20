import { Component, OnInit } from '@angular/core';
import { AirlineInventory } from '../models/airlinedata';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
  AirlineList: Array<AirlineInventory> = new Array<AirlineInventory>();
 // events:Array<EventData> = new Array<EventData>();
  constructor(private _eventService: EventService) { }

  ngOnInit(): void {
    this._eventService.GetAirlineList().subscribe(res => this.AirlineList = res, err => console.log(err))
  }

}
