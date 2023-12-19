import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Hero } from '../model/hero.model';
import { HEROES } from '../constants/hero.constant';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes!: Hero[];
  heroesCounter!:number;

  constructor() {
    this.heroes = HEROES;
    this.heroesCounter = this.heroes.length;
  }

  getHeroes(): Observable<Hero[]> {
    return of(this.heroes);
  }

  getHeroesCounter(): Observable<number> {
    return of(this.heroesCounter);
  }

  mockedAddHero(name: string): void {
    setTimeout(() => {
      this.heroes.push(new Hero(name));
      this.heroesCounter = this.heroes.length;
      console.log(this.heroesCounter);
    }, 1500);
  }
}
