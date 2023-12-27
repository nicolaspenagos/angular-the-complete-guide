import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, timer, switchMap } from 'rxjs';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Errors } from './constants/Error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  projectForm!: FormGroup;
  statuses: string[] = ['stable', 'critical', 'finished'];
  forbiddenNames: string[] = ['Test'];
  ERRORS = Errors;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl(
        null,
        [
          Validators.required,
          //this.nameValidator.bind(this),
        ],
        this.asyncNameValidator.bind(this)()
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(this.statuses[0], [Validators.required]),
    });
  }

  onSubmit(): void {
    console.log(this.projectForm.value);
  }

  // Syncronous validator

  /*
   * nameValidator(control: FormControl): { [s: string]: boolean } | null {
   *   if (this.forbiddenNames.includes(control.value)) {
   *     return { nameIsForbidden: true };
   *   }
   *   return null;
   * }
   */

  // Asyncronous validator

  asyncNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return timer(3000).pipe(
        switchMap(() =>
          this.isNameAvailable(control.value).pipe(
            map((result: { isAvailable: boolean }) =>
              result.isAvailable ? { nameIsForbidden: true } : null
            )
          )
        )
      );
    };
  }

  isNameAvailable(value: string): Observable<{ isAvailable: boolean }> {
    if (this.forbiddenNames.includes(value)) {
      return new Observable((observer) => {
        observer.next({ isAvailable: true });
        observer.complete();
      });
    }
    return new Observable((observer) => {
      observer.next({ isAvailable: false });
      observer.complete();
    });
  }
}
