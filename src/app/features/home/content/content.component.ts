import { Component, OnInit } from '@angular/core';
import { CocktailsService } from '../cocktails.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit(): void {
  }

}
