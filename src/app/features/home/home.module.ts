import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { FilterComponent } from './filter/filter.component';
import { ContentComponent } from './content/content.component';
import { CocktailsService } from './cocktails.service';
import { CocktailItemComponent } from './content/cocktail-item/cocktail-item.component';



@NgModule({
  declarations: [
    HomeComponent,
    FilterComponent,
    ContentComponent,
    CocktailItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    CocktailsService
  ]
})
export class HomeModule { }
