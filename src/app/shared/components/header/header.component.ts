import { Component, OnInit } from '@angular/core';

import { TITLE } from 'src/app/app.config';
import { from } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = TITLE;

  constructor() { }

  ngOnInit(): void {
  }

}
