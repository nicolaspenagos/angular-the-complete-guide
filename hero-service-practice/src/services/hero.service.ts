import { Injectable} from '@angular/core';
import { Hero } from '../model/hero.model';
import { HEROES } from '../constants/hero.constant';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes!: Hero[];

  constructor() {
    this.heroes = HEROES;
  }

  getHeroes(): Observable<Hero[]> {
    return of(this.heroes);
  }

  mockedAddHero(name: string): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this.heroes.push(new Hero(name));
        resolve();
      }, 1500);
    });
    return promise;
    
   
  }
}
