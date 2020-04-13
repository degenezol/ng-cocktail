import { Component, OnInit, Input } from '@angular/core';
import { Cocktail } from 'src/app/shared/models/cocktails-dto.model';

@Component({
  selector: 'app-cocktail-item',
  templateUrl: './cocktail-item.component.html',
  styleUrls: ['./cocktail-item.component.scss']
})
export class CocktailItemComponent implements OnInit {
  @Input() cocktail: Cocktail;

  constructor() { }

  ngOnInit(): void {
  }

}
