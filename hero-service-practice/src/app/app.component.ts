import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Hero } from '../model/hero.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  heroes!: Hero[];
  heroesCounter!: number;
  constructor(private heroService: HeroService) {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  getHeroesCounter(): void {
 
    this.heroService
      .getHeroesCounter()
      .subscribe((counter) => {this.heroesCounter = counter});
  }

  ngOnInit(): void {
    this.getHeroes();
    this.getHeroesCounter();
  }

  addHero(): void {
    this.heroService.mockedAddHero('new hero');
  }
}
