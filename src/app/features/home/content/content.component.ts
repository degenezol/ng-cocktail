import { Component, OnInit, OnDestroy } from '@angular/core';
import { CocktailsService } from '../cocktails.service';
import { Subscription, Observable } from 'rxjs';
import { Cocktails, Cocktail } from 'src/app/shared/models/cocktails-dto.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  categories: string[] = [];
  cocktails: Cocktails<Cocktail>[] = [];

  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit(): void {
    this.cocktailsService.checkedCategoriesBehaviorSubject
      .subscribe((categories: string[]) => {
        this.categories = categories;
      });

    this.cocktailsService.cocktailsBehaviorSubject
      .subscribe((cocktailsObservables: Observable<Cocktails<Cocktail>>[]) => {
        const cocktails: Cocktails<Cocktail>[] = [];
        cocktailsObservables.forEach((cocktailsObservable: Observable<Cocktails<Cocktail>>) => {
          this.subscription.add(
            cocktailsObservable.subscribe((cocktailsByCategory: Cocktails<Cocktail>) => {
              cocktails.push(cocktailsByCategory);
            })
          );
        });
        this.cocktails = cocktails;
      });
  }

  ngOnDestroy(): void {
    this.cocktailsService.categoriesBehaviorSubject.unsubscribe();
    this.cocktailsService.cocktailsBehaviorSubject.unsubscribe();
    this.subscription.unsubscribe();
  }
}
