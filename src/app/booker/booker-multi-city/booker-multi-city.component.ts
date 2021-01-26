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
import { MultiCityTrip, TripType } from '../../form.types';

@Component({
  selector: 'app-booker-multi-city',
  templateUrl: './booker-multi-city.component.html',
  styleUrls: ['./booker-multi-city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BookerMultiCityComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BookerMultiCityComponent,
      multi: true,
    },
  ],
})
export class BookerMultiCityComponent
  implements ControlValueAccessor, Validator<MultiCityTrip> {
  @Input() set value(value: MultiCityTrip) {
    this.form.setValue(value);
  }

  @Input() showValidationErrors = false;
  TripType = TripType;

  constructor(private formBuilder: FormBuilder) {}

  form = this.formBuilder.group<MultiCityTrip>({
    tripType: TripType.multiCity,
    usePoints: false,
    promoCode: '',
    passengers: {
      adults: 0,
      children: 0,
      infants: 0,
    },
    flights: [
      [
        {
          cities: {
            origin: '',
            destination: '',
          },
          departureDate: '',
        },
        {
          cities: {
            origin: '',
            destination: '',
          },
          departureDate: '',
        },
      ],
    ],
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

  writeValue(value: MultiCityTrip): void {
    this.form.setValue(value);
  }

  validate(control: FormControl<MultiCityTrip>): ValidationErrors | null {
    return this.form.valid ? null : { invalid: true };
  }
}
