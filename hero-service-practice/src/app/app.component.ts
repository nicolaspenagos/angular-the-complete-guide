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
  currentHeroName = 'No name';

  constructor(
    private heroService: HeroService,
    private cd: ChangeDetectorRef
  ) {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  async addHero(): Promise<void> {
    await this.heroService.mockedAddHero(
      this.currentHeroName === '' ? 'No name' : this.currentHeroName
    );
  }
}
