import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, Validator } from 'ngx-strongly-typed-forms';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { OneWayTrip, TripType } from '../../form.types';

@Component({
  selector: 'app-booker-one-way',
  templateUrl: './booker-one-way.component.html',
  styleUrls: ['./booker-one-way.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BookerOneWayComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BookerOneWayComponent,
      multi: true,
    },
  ],
})
export class BookerOneWayComponent
  implements ControlValueAccessor, Validator<OneWayTrip> {
  @Input() set value(value: OneWayTrip) {
    this.form.setValue(value);
  }

  @Input() showValidationErrors = false;
  TripType = TripType;
  constructor(private formBuilder: FormBuilder) {}

  form = this.formBuilder.group<OneWayTrip>({
    tripType: TripType.oneWay,
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
  });
  @Output() valueChanges = this.form.valueChanges;

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe((value) => fn(value));
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(value: OneWayTrip): void {
    this.form.setValue(value);
  }

  validate(control: FormControl<OneWayTrip>): ValidationErrors | null {
    return this.form.valid ? null : { invalid: true };
  }
}
