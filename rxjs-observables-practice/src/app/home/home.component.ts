import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, Observable, Observer } from 'rxjs';
import { map, filter } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private obsSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    // Utilty function prvided by Angular
    // this.obsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntervalObservable = new Observable(
      (observer: Observer<number>) => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if (count === 2) {
            observer.complete();
          }
          if (count > 3) {
            observer.error(new Error('Count is greater 3!'));
          }
          count++;
        }, 1000);
      }
    );

    // this.obsSubscription = customIntervalObservable.subscribe({
    //   next(data: number) {
    //     // console.log('Round: ' + (data + 1));
    //     console.log(data);
    //   },
    //   error(error: Error) {
    //     console.log(error);
    //     alert(error.message);
    //   },
    //   complete() {
    //     // You don't necessary have to unsubscribe if your observable
    //     // fires the completed event
    //     console.log('Completed!');
    //     // Complete is not invoked if an error is fired.
    //   },
    // });

    this.obsSubscription = customIntervalObservable
      .pipe(
        filter((data: number) => data % 2 === 0),
        map((data: number) => {
          return 'Round: ' + (data + 1);
        })
      )
      .subscribe({
        next(data: string) {
          // console.log('Round: ' + (data + 1));
          console.log(data);
        },
        error(error: Error) {
          console.log(error);
          alert(error.message);
        },
        complete() {
          // You don't necessary have to unsubscribe if your observable
          // fires the completed event
          console.log('Completed!');
          // Complete is not invoked if an error is fired.
        },
      });
  }

  ngOnDestroy(): void {
    this.obsSubscription.unsubscribe();
  }
}
