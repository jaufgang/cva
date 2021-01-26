import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validator,
} from 'ngx-strongly-typed-forms';
import { Flight } from '../form.types';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FlightComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: FlightComponent,
      multi: true,
    },
  ],
})
export class FlightComponent
  implements ControlValueAccessor, Validator<Flight> {
  @Input() showValidationErrors = false;

  constructor(private formBuilder: FormBuilder) {}

  formGroup: FormGroup<Flight> = this.formBuilder.group<Flight>({
    cities: { origin: ' ', destination: '' },
    departureDate: ['', Validators.required],
  });

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe((value) => fn(value));
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  }

  writeValue(value: Partial<Flight>): void {
    this.formGroup.setValue(value);
  }

  validate(control: FormControl<Flight>): ValidationErrors | null {
    return this.formGroup.valid ? null : { invalid: true };
  }
}
