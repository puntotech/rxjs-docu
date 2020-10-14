import { Component, OnInit } from '@angular/core';
import { ContributorGroup } from './contributors.model';
import { ContributorService } from './contributor.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
})
export class TeamListComponent implements OnInit {
  groups: ContributorGroup[];
  groupNames: string[];
  selectedGroup: ContributorGroup;

  constructor(private contributorService: ContributorService) {}

  ngOnInit() {
    // no need to unsubscribe because `contributors` completes
    this.contributorService.contributors.subscribe((grps) => {
      this.groups = grps;
      this.groupNames = grps.map((g) => g.name);
      this.selectGroup(this.groups[0]);
    });
  }

  selectGroup(group: ContributorGroup) {
    this.selectedGroup = group;
  }
}
