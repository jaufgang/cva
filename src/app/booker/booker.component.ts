import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  isMultiCityTrip,
  isOneWayTrip,
  isReturnTrip,
  Trip,
  tripTransformers,
  TripType,
} from '../form.types';
import {
  debounceTime,
  delay,
  filter,
  first,
  map,
  pairwise,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { BehaviorSubject, merge } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'app-booker',
  templateUrl: './booker.component.html',
  styleUrls: ['./booker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ComponentStore],
})
export class BookerComponent {
  isOneWayTrip = isOneWayTrip;
  isReturnTrip = isReturnTrip;
  isMultiCityTrip = isMultiCityTrip;

  trip$ = this.store.select((state) => state.trip);

  tripTransformation$ = this.trip$.pipe(
    pairwise(),
    filter(([previous, current]) => previous.tripType !== current.tripType),
    delay(0),
    map(([previous, current]) =>
      tripTransformers[previous.tripType][current.tripType](current)
    ),
    shareReplay(),
    tap((transformedTrip) => this.store.patchState({ trip: transformedTrip }))
  );

  tripControlInstance$ = merge(
    this.trip$.pipe(first()),
    this.tripTransformation$
  );

  constructor(private readonly store: ComponentStore<{ trip: Trip }>) {
    this.store.setState({
      trip: {
        tripType: TripType.return,
        usePoints: false,
        promoCode: '',
        passengers: {
          adults: 0,
          children: 0,
          infants: 0,
        },
        cities: {
          origin: '',
          destination: '',
        },
        departureDate: '',
        returnDate: '',
      },
    });

    const saved = localStorage.getItem('booker');

    if (saved) {
      this.store.patchState({ trip: JSON.parse(saved) as Trip });
    }

    this.trip$.pipe(debounceTime(250)).subscribe((trip) => {
      localStorage.setItem('booker', JSON.stringify(trip));
    });
  }

  logChanges(trip: Trip): void {
    this.store.patchState({ trip });
  }
}
