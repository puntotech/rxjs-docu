import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  link$ = this.scully.available$;

  constructor(private scully: ScullyRoutesService) {}

  ngOnInit(): void {
    this.link$.subscribe(links => {
      console.log(links);
    });
  }
}
