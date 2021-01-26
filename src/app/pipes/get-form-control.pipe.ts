import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from 'ngx-strongly-typed-forms';

@Pipe({
  name: 'getFormControl',
})
export class GetFormControlPipe implements PipeTransform {
  transform<T>(
    form: AbstractControl<T>,
    controlName: keyof T
  ): AbstractControl<T[keyof T]> | null {
    return form.get(controlName);
  }
}
