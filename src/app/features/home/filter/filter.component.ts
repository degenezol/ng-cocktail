import { Component, OnInit, OnDestroy } from '@angular/core';
import { CocktailsService } from '../cocktails.service';
import { Category, Cocktail, Cocktails } from 'src/app/shared/models/cocktails-dto.model';
import { Subscription, Observable } from 'rxjs';
import { BUTTONS } from 'src/app/app.config';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  buttonName = BUTTONS.apply;
  categories: Category[] = [];

  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.cocktailsService.getCategoriesList()
        .subscribe((categories: Cocktails<Category>) => {
          this.cocktailsService.categoriesBehaviorSubject.next(categories.drinks);
        })
    );

    this.subscription.add(
      this.cocktailsService.categoriesBehaviorSubject
        .subscribe((categories: Category[]) => {
          this.categories = categories;
          this.cocktailsService.getCocktailsByCategories(this.categories);
        })
    );
  }

  checkboxHandler(event: Event, index: number): void {
    const checkbox = event.target as HTMLInputElement;
    this.categories[index].checked = checkbox.checked;
  }

  applyFilters(): void {
    this.cocktailsService.getCocktailsByCategories(this.categories);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
