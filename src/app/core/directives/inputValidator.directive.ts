import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

type InputType = 'email' | 'password' | 'text' | 'number' | 'tel' | 'url' | 'search' | 'textarea';

@Directive({
  selector: '[inputValidator]',
  standalone: true
})
export class InputValidatorDirective {

  @Input() inputType!: InputType;
  @Output() isValid = new EventEmitter<boolean>();

  private readonly patterns: Record<InputType, RegExp> = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
    text: /^[a-zA-Z\s]*$/,
    number: /^\d+$/,
    tel: /^\d{10}$/,
    url: /^https:\/\/.*/,
    search: /^.{3,}$/,
    textarea: /^.{10,}$/,
  };

  @HostListener('keyup', ['$event']) onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const isValid = this.validateInput(target.value.trim());
    this.updateValidityStyle(target, isValid);
    this.isValid.emit(isValid);
  }

  private validateInput(value: string): boolean {
    const pattern = this.patterns[this.inputType];
    switch (this.inputType) {
      case 'email':
        return pattern.test(value);
      case 'password':
        return pattern.test(value);
      case 'text':
        return value.length >= 3;
      case 'number':
        return !isNaN(Number(value));
      case 'tel':
        return value.length === 9;
      case 'url':
        return value.includes('https://');
      case 'search':
        return value.length >= 3;
      case 'textarea':
        return value.length >= 10;
      default:
        return false;
    }
  }

  private updateValidityStyle(target: HTMLInputElement, isValid: boolean): void {
    target.style.borderColor = isValid ? 'green' : 'red';
    target.style.borderWidth = isValid ? '2px' : '1.5px';
  }
}