import { Component, OnInit, Input } from '@angular/core';
import { Contributor } from './contributors.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team-list.component.css'],
})
export class TeamComponent implements OnInit {
  @Input() person: Contributor;
  noPicture = '_no-one.png';
  pictureBase = 'assets/images/bios/';

  flipCard(person: Contributor) {
    person.isFlipped = !person.isFlipped;
  }

  constructor() {}

  ngOnInit(): void {}
}
