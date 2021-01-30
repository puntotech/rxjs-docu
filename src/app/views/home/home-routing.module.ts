import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiComponent } from './api/api.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'api', component: ApiComponent },
  { path: 'api/:category/:page', component: ContentComponent },
  { path: 'concepts/:page', component: ContentComponent },
  { path: 'version-6/:page', component: ContentComponent },
  { path: 'concepts/testing/:page', component: ContentComponent },
  { path: 'operators/:category/:page', component: ContentComponent },
  { path: ':page', component: ContentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
