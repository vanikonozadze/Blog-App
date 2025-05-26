import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '../../../../../core/directives/control-value-accessor.directive';
import { NgIf } from '@angular/common';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, NgIf, ValidationErrorsComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() label = '';
  @Input() type = '';
  @Input()
  customErrorMessages: Record<string, string> = {};
}
