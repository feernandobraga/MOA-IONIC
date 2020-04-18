import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MainPage,
    children: [
      { // All routers for news
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.NewsPageModule)
      },
      { // All routes for trips
        path: 'events',
        loadChildren: () => import('./events/events.module').then(m => m.EventsPageModule)
      }
    ]
  },
  { // when the user goes to the main root, it redirects to the news page
    path: '',
    redirectTo: '/main/tabs/news',
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
