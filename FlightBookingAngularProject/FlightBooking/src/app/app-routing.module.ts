import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookflightComponent } from './bookflight/bookflight.component';
import { BookinghistoryComponent } from './bookinghistory/bookinghistory.component';
import { EventsComponent } from './events/events.component';
import { FlightsearchComponent } from './flightsearch/flightsearch.component';
import { LoginComponent } from './login/login.component';
import { ManageairlinesComponent } from './manageairlines/manageairlines.component';
import { ManageinventoryComponent } from './manageinventory/manageinventory.component';
import { RegisterComponent } from './register/register.component';
import { AuthGaurd } from './services/auth.gaurd';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'events',
    canActivate:[AuthGaurd],
    component: EventsComponent
  },
  {
    path: 'special',
    canActivate:[AuthGaurd],
    component: SpecialEventsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'flightsearch',
    canActivate:[AuthGaurd],
    component: FlightsearchComponent
  },
  {
    path: 'bookinghistory',
    canActivate:[AuthGaurd],
    component: BookinghistoryComponent
  },
  {
    path: 'manageairlines',
    canActivate:[AuthGaurd],
    component: ManageairlinesComponent
  },
  {
    path: 'manageinventory',
    canActivate:[AuthGaurd],
    component: ManageinventoryComponent
  },
  {
    path:'bookflight',
    component:BookflightComponent
  },
  {
    path:'ticketdetails',
    component:TicketdetailsComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
