import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validator-warnings',
  templateUrl: './validator-warnings.component.html',
  styleUrl: './validator-warnings.component.css',
})
export class ValidatorWarningsComponent {
  @Input() errors!: { key: string; msg: string }[];
  @Input() control!: AbstractControl;
}
