import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { URLS, LIST } from 'src/app/app.config';
import { Category, Cocktail, Cocktails } from 'src/app/shared/models/cocktails-dto.model';
import { CocktailParams } from 'src/app/shared/models/query-params.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  private filterListOptoins: CocktailParams = {
    params: {
      c: LIST
    }
  };
  private cocktailsListOptoins: CocktailParams = {
    params: {
      c: null
    }
  };

  categoriesBehaviorSubject = new BehaviorSubject<Category[]>([]);
  cocktailsBehaviorSubject = new BehaviorSubject<Observable<Cocktails<Cocktail>>[]>([]);
  checkedCategoriesBehaviorSubject = new BehaviorSubject<string[]>([]);

  constructor(private httpService: HttpService) { }

  getCategoriesList(): Observable<Cocktails<Category>> {
    return this.httpService.get(URLS.list, this.filterListOptoins)
      .pipe(take(1));
  }

  getCocktailsByCategory(category: string): Observable<Cocktails<Cocktail>> {
    this.cocktailsListOptoins.params.c = category;
    return this.httpService.get(URLS.filter, this.cocktailsListOptoins)
      .pipe(take(1));
  }

  getCocktailsByCategories(categories: Category[]): Observable<Cocktails<Cocktail>>[] {
    const cocktailsObservables: Observable<Cocktails<Cocktail>>[] = [];
    const checkedCategories: string[] = [];

    categories.forEach((category: Category) => {
      if (category.checked || !category.hasOwnProperty('checked')) {
        checkedCategories.push(category.strCategory);
        cocktailsObservables.push(this.getCocktailsByCategory(category.strCategory));
      }
    });

    this.checkedCategoriesBehaviorSubject.next(checkedCategories);
    this.cocktailsBehaviorSubject.next(cocktailsObservables);

    return cocktailsObservables;
  }
}
