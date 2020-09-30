import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'concepts/:page', component: ContentComponent },
  { path: 'version-6/:page', component: ContentComponent },
  { path: 'operators/:category/:page', component: ContentComponent },
  { path: ':page', component: ContentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
