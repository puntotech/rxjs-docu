import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { TeamRoutingModule } from './team-routing.module';
import { TeamListComponent } from './team-list.component';

@NgModule({
  declarations: [TeamComponent, TeamListComponent],
  imports: [CommonModule, TeamRoutingModule],
})
export class TeamModule {}
