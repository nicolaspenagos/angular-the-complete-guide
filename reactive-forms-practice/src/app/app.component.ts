import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, map, switchMap, timer } from 'rxjs';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm!: FormGroup;
  forbiddenUsernames = ['chris', 'anna'];
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbidenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          [this.emailValidator()]
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
    // this.signupForm.valueChanges.subscribe(value=>{
    //   console.log(value);
    // });
    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });
    this.signupForm.setValue({
      userData: {
        username: 'jester',
        email: 'jester@test.com',
      },
      gender: 'male',
      hobbies: [],
    });

    this.signupForm.patchValue({ userData: { username: 'Max' } });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({gender:'male'});
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbidenNames(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      // Return true if is invalid
      return { nameIsForbidden: true };
    }

    // If validation is successfull you have to return null
    return null;
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return timer(3000).pipe(
        switchMap(() =>
          this.emailAvailable(control.value).pipe(
            map((result: { exists: boolean }) =>
              result.exists ? { asyncInvalid: true } : null
            )
          )
        )
      );
    };
  }

  emailAvailable(value: string): Observable<{ exists: boolean }> {
    if (value === 'test@test.com') {
      return new Observable((observer) => {
        observer.next({ exists: true });
        observer.complete();
      });
    }

    return new Observable((observer) => {
      observer.next({ exists: false });
      observer.complete();
    });
  }
}
