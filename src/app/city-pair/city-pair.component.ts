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
import { CityPair } from '../form.types';

@Component({
  selector: 'app-city-pair',
  templateUrl: './city-pair.component.html',
  styleUrls: ['./city-pair.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CityPairComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CityPairComponent,
      multi: true,
    },
  ],
})
export class CityPairComponent
  implements ControlValueAccessor, Validator<CityPair> {
  @Input() showValidationErrors = false;

  constructor(private formBuilder: FormBuilder) {}

  formGroup: FormGroup<CityPair> = this.formBuilder.group<CityPair>({
    origin: ['', Validators.required],
    destination: ['', Validators.required],
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

  writeValue(value: CityPair): void {
    this.formGroup.setValue(value);
  }

  validate(control: FormControl<CityPair>): ValidationErrors | null {
    return this.formGroup.valid ? null : { invalid: true };
  }
}
