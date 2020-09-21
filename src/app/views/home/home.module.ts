import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { ContentComponent } from './content/content.component';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [HomeComponent, ContentComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ScullyLibModule,
    MarkdownModule.forChild(),
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
