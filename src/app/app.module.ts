import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { FlightComponent } from './flight/flight.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { NgxStronglyTypedFormsModule } from 'ngx-strongly-typed-forms';
import { GetFormControlPipe } from './pipes/get-form-control.pipe';
import { CityPairComponent } from './city-pair/city-pair.component';
import { PassengersComponent } from './passengers/passengers.component';
import { BookerComponent } from './booker/booker.component';
import { BookerOneWayComponent } from './booker/booker-one-way/booker-one-way.component';
import { BookerMultiCityComponent } from './booker/booker-multi-city/booker-multi-city.component';
import { BookerReturnComponent } from './booker/booker-return/booker-return.component';
import { GuardTypePipe } from './pipes/guard-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FlightComponent,
    FlightListComponent,
    GetFormControlPipe,
    CityPairComponent,
    PassengersComponent,
    BookerComponent,
    BookerOneWayComponent,
    BookerMultiCityComponent,
    BookerReturnComponent,
    GuardTypePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStronglyTypedFormsModule,
    BrowserAnimationsModule,
    FlexModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
