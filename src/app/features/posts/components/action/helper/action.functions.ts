import { AbstractControl, FormGroup } from '@angular/forms';

export function generateUniqueId(existingIds: Set<string | number>): string {
  let id: string;
  do {
    id = Math.floor(100000000 + Math.random() * 900000000).toString();
  } while (existingIds.has(id));
  return id;
}

export function getFormErrors(form: FormGroup): string[] {
  const errors: string[] = [];
  const controls = form.controls;

  const pushError = (
    key: keyof typeof controls,
    messages: { [key: string]: string },
  ) => {
    const controlErrors = controls[key]?.errors;
    if (controlErrors) {
      for (const errorKey in controlErrors) {
        if (messages[errorKey]) errors.push(messages[errorKey]);
      }
    }
  };

  pushError('title', {
    required: 'Title is required.',
    minlength: 'Title must be at least 3 characters.',
    maxlength: 'Title must be less than 100 characters.',
  });

  pushError('author', {
    required: 'Author is required.',
    minlength: 'Author must be at least 2 characters.',
    maxlength: 'Author must be less than 50 characters.',
  });

  pushError('date', {
    required: 'Date is required.',
  });

  pushError('description', {
    required: 'Description is required.',
    minlength: 'Description must be at least 10 characters.',
  });

  pushError('content', {
    required: 'Content is required.',
    minlength: 'Content must be at least 20 characters.',
  });

  return errors;
}
