import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [HomeComponent, ContentComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MarkdownModule.forChild(),
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
