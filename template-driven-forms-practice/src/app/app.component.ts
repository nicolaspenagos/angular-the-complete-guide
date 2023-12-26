import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('f') singupForm!: NgForm;
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  };
  submitted = false;
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.singupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male',
    // });
    this.singupForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  //   console.log(form.value);
  // }

  onSubmit() {
    // Useful if you need to access the form not only when has been just
    // submitted
    this.submitted = true;
    console.log(this.singupForm);
    this.user.username = this.singupForm.value.userData.username;
    this.user.email = this.singupForm.value.userData.email;
    this.user.gender = this.singupForm.value.gender;
    this.user.secretQuestion = this.singupForm.value.secret;
    this.user.answer = this.singupForm.value.questionAnswer;
    // Reset the state, the valid, the touched
    this.singupForm.reset();
  }
}
