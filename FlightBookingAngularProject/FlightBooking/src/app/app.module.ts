import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
//import { RoutingComponent } from './routing/routing.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { RouterEvent, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { AuthGaurd } from './services/auth.gaurd';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FlightsearchComponent } from './flightsearch/flightsearch.component';
import { BookinghistoryComponent } from './bookinghistory/bookinghistory.component';
import { ManageairlinesComponent } from './manageairlines/manageairlines.component';
import { ManageinventoryComponent } from './manageinventory/manageinventory.component';
import { BookflightComponent } from './bookflight/bookflight.component';
import { FilterPanelService } from './services/filterpanel';
import { DatePipe } from '@angular/common';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    SpecialEventsComponent,
    FlightsearchComponent,
    BookinghistoryComponent,
    ManageairlinesComponent,
    ManageinventoryComponent,
    BookflightComponent,
    TicketdetailsComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule    
  ],
  providers: [AuthService,EventService,AuthGaurd,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  },FilterPanelService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
