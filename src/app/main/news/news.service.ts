import { Injectable } from '@angular/core';
import { News } from './news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  private _news: News[] = [
    new News(
      'n1',
      'Less Important Announcement',
      'I arrived here first',
      '25/03/2020',
      'Fernando'
    ),
    new News(
      'n2',
      'A special Announcement',
      'Here comes the sun...',
      '18/04/2020',
      'Monica'
    ),
    new News(
      'n3',
      'Official Release',
      'A new version of the app has been release',
      '20/04/2020',
      'Clive'
    ),
  ]

  get news(){
    return [...this._news]
  }

}
