import { Injectable } from '@angular/core';
import { Events } from './events.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  private _events: Events[] = [
    {
      id:'e1',
      title: 'Monthly General Meetings',
      description: 'Not you average meeting...',
      date: '06/05/2020 - 7:30 PM',
      meetingPoint:"Vintage Driver's Club",
      address: "41 Norcal Road",
      isRsvpd: false
    },

    {
      id:'e2',
      title: 'Mokes at the Movies',
      description: 'Popcorn and Netflix all night along',
      date: '07/06/2020 - 13:00 PM',
      meetingPoint:'St. Kilda Pier',
      address: '123, St. Kilda Road',
      isRsvpd: false
    },

    {
      id:'e3',
      title: 'Northern Lights Tour',
      description: 'Bring you sunnies',
      date: '08/07/2020 - 5:00 AM',
      meetingPoint:'Eureka Tower',
      address: '33, Southbank Blv',
      isRsvpd: false
    }
  ]

  get allEvents(){
    return [...this._events]
  }

  getEvent(id: string){
    return {...this._events.find(e => e.id === id)}
  }

  toggleRSVP(id:string, value: boolean){
    const arrayIndex = this._events.findIndex(e => e.id === id)
    // console.log("index is " + arrayIndex)
    this._events[arrayIndex].isRsvpd = value
    
    // this._events.find(e => {
    //   return e.id === id})
    
  }

  // set isRsvpd(value: boolean){
  //   this._events[].isRsvpd = value
  // }

  // public confirmRSVP(id: number, value: boolean){
  //   this._events[id].isRsvpd = value
  // }

  // set isRsvpd(value: boolean) {
  //   this._events. = value
  // }

  

}
