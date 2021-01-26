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
import { ReturnTrip, TripType } from '../../form.types';

@Component({
  selector: 'app-booker-return',
  templateUrl: './booker-return.component.html',
  styleUrls: ['./booker-return.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BookerReturnComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BookerReturnComponent,
      multi: true,
    },
  ],
})
export class BookerReturnComponent
  implements ControlValueAccessor, Validator<ReturnTrip> {
  @Input() set value(value: ReturnTrip) {
    this.form.setValue(value);
  }
  @Input() showValidationErrors = false;
  TripType = TripType;
  constructor(private formBuilder: FormBuilder) {}

  form = this.formBuilder.group<ReturnTrip>({
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

  writeValue(value: ReturnTrip): void {
    this.form.setValue(value);
  }

  validate(control: FormControl<ReturnTrip>): ValidationErrors | null {
    return this.form.valid ? null : { invalid: true };
  }
}
