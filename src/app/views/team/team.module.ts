import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { TeamRoutingModule } from './team-routing.module';
import { TeamListComponent } from './team-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [TeamComponent, TeamListComponent],
  imports: [CommonModule, TeamRoutingModule, FlexLayoutModule],
})
export class TeamModule {}
