import { Injectable } from '@angular/core';
import { Events } from './events.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  private _events: Events[] = [
    new Events(
      'e1',
      'Monthly General Meetings',
      'Not you average meeting...',
      '06/05/2020',
      "Vintage Driver's Club",
      "41 Norcal Road"
    ),

    new Events(
      'e2',
      'Mokes at the Movies',
      'Popcorn and Netflix all night along',
      '07/06/2020',
      'St. Kilda Pier',
      '123, St. Kilda Road'
    ),

    new Events(
      'e3',
      'Northern Lights Tour',
      'Bring you sunnies',
      '08/07/2020',
      'Eureka Tower',
      '33, Southbank Blv'
    )
  ]

  get allEvents(){
    return [...this._events]
  }

  getEvent(id: string){
    return {...this._events.find(e => e.id === id)}
  }


}
