import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  email: string = 'email@email.com';

  password: string = '1234';
  submmited: boolean = false;
  subscriptions: string[] = ['Basic', 'Advanced', 'Pro'];
  defaultSubscription: string = this.subscriptions[1];
  data!: { email: string; password: string; subscription: string };

  onSubmit(form: NgForm) {
    this.submmited = true;
    console.log(form.value);
    this.data = form.value;
    form.reset({ subscription: this.defaultSubscription });
  }
}
