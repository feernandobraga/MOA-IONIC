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
      date: new Date('2020-03-25 19:00'),
      meetingPoint:"Vintage Driver's Club",
      address: "41 Norcal Road",
      isRsvpd: false
    },

    {
      id:'e2',
      title: 'Mokes at the Movies',
      description: 'Popcorn and Netflix all night along',
      date: new Date('2020-04-10 08:00'),
      meetingPoint:'St. Kilda Pier',
      address: '123, St. Kilda Road',
      isRsvpd: false
    },

    {
      id:'e3',
      title: 'Northern Lights Tour',
      description: 'Bring you sunnies',
      date: new Date('2020-07-01 00:00'),
      meetingPoint:'Eureka Tower',
      address: '33, Southbank Blv',
      isRsvpd: false
    },

    {
      id: 'e4',
      title: 'After-Pandemic Party',
      description: 'We are planning a big party when all of this is over!',
      date: new Date('2020-05-11 23:30'),
      meetingPoint: 'Peter\'s House',
      address: '77 St Georges Rd, Preston VIC 3072',
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

  isPastEvent(id: string): boolean {
    const arrayIndex = this._events.findIndex(event => event.id === id)
    if (this._events[arrayIndex].date < new Date()){
      return true
    } else {
      return false
    }
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
