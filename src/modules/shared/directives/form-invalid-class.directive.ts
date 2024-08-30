import { Directive, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  UntypedFormControl,
} from '@angular/forms';

@Directive({
  selector: '[appFormInvalidClass]',
  standalone: true,
})
export class FormInvalidClassDirective implements OnInit {
  @Input() appFormInvalidClass!: any;
  ngOnInit(): void {
    this.appFormInvalidClass;
  }
}
