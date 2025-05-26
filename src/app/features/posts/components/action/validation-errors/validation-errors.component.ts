import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { KeyValuePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-validation-errors',
  imports: [NgForOf, KeyValuePipe, NgIf],
  templateUrl: './validation-errors.component.html',
  styleUrl: './validation-errors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationErrorsComponent implements OnChanges {
  @Input() errors: ValidationErrors | null = null;
  @Input() customErrorMessages: Record<string, string> = {};

  private defaultMessages: Record<string, string> = {
    required: 'This field is required.',
    minlength: 'Too short.',
    maxlength: 'Too long.',
    email: 'Invalid email address.',
    pattern: 'Invalid format.',
  };

  public errorMessages: Record<string, string> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customErrorMessages']) {
      this.errorMessages = {
        ...this.defaultMessages,
        ...this.customErrorMessages,
      };
    }
  }
}
