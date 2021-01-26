import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validator,
} from 'ngx-strongly-typed-forms';
import { Flight } from '../form.types';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FlightListComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: FlightListComponent,
      multi: true,
    },
  ],
})
export class FlightListComponent
  implements ControlValueAccessor, Validator<Flight[]> {
  @Input() showValidationErrors = false;
  constructor(private formBuilder: FormBuilder) {}

  formArray: FormArray<Flight> = this.formBuilder.array<Flight>([]);

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.formArray.valueChanges.subscribe((value) => fn(value));
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {}

  writeValue(value: Flight[]): void {
    value.forEach((abc) => {
      this.formArray.push(this.formBuilder.control<Flight>(abc));
    });
  }

  addFlight(): void {
    this.formArray.push(
      this.formBuilder.control<Flight>({
        cities: {
          origin: '',
          destination: '',
        },
        departureDate: '',
      })
    );
  }

  remove(i: number): void {
    this.formArray.removeAt(i);
  }

  validate(control: FormControl<Flight[]>): ValidationErrors | null {
    return this.formArray.valid ? null : { invalid: true };
  }
}
