import { Component, OnInit } from '@angular/core';
import { CocktailsService } from '../cocktails.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit(): void {
  }

}
