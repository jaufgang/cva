import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from 'ngx-strongly-typed-forms';
import { Passengers } from '../form.types';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PassengersComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PassengersComponent,
      multi: true,
    },
  ],
})
export class PassengersComponent implements ControlValueAccessor {
  @Input() showValidationErrors = false;

  constructor(private formBuilder: FormBuilder) {}

  formGroup: FormGroup<Passengers> = this.formBuilder.group<Passengers>({
    adults: [0, Validators.required],
    children: [0, Validators.required],
    infants: [0, Validators.required],
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

  writeValue(value: Passengers): void {
    this.formGroup.setValue(value);
  }

  validate(control: FormControl<Passengers>): ValidationErrors | null {
    return this.formGroup.valid ? null : { invalid: true };
  }
}
