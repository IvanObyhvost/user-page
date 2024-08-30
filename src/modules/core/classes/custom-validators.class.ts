import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    }
    return null;
  }
  static minOneNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const regex = /\d{1}/;
    return regex.test(control.value) ? null : { minOneNumber: true };
  }
  static minOneLetter(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const regex = /[A-Za-z]{1}/;
    return regex.test(control.value) ? null : { minOneLetter: true };
  }
}
