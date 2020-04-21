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
        children: [
          {
            path: '',
            loadChildren: () => import('./news/news.module').then(m => m.NewsPageModule)
          },
          {
            path: ':newsId',
            loadChildren: () => import('./news/news-detail/news-detail.module').then(m => m.NewsDetailPageModule)
          }
        ]
      },
      { // All routes for trips
        path: 'events',
        children: [
          {
            path: '',
            loadChildren: () => import('./events/events.module').then(m => m.EventsPageModule)
          },
          {
            path: ':eventId',
            loadChildren: () => import('./events/event-detail/event-detail.module').then(m => m.EventDetailPageModule)
          }
        ]
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
