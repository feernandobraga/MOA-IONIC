import { Injectable } from "@angular/core";
import { Events } from "./events.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class EventsService {
  private apiURL = "http://localhost:3000/api/v1/";

  constructor(private _http: HttpClient) {}

  private _events: Events[] = [
    //   {
    //     id: 'e4',
    //     title: 'After-Pandemic Party',
    //     description: 'We are planning a big party when all of this is over!',
    //     date: new Date('2020-05-11 23:30'),
    //     meetingPoint: 'Peter\'s House',
    //     address: '77 St Georges Rd, Preston VIC 3072',
    //     isRsvpd: false
    //   }
  ];

  get allEvents() {
    return [...this._events];
  }

  fetchAllEvents(): Observable<Events[]> {
    return this._http.get<Events[]>(this.apiURL + "events");
  }

  fetchSingleEvent(id: string): Observable<Events> {
    return this._http.get<Events>(this.apiURL + "events/" + id);
  }

  getEvent(id: string) {
    return { ...this._events.find(e => e.id === id) };
  }

  toggleRSVP(id: string, value: boolean) {
    const arrayIndex = this._events.findIndex(e => e.id === id);
    // console.log("index is " + arrayIndex)
    this._events[arrayIndex].isRsvpd = value;

    // this._events.find(e => {
    //   return e.id === id})
  }

  isPastEvent(id: string): boolean {
    const arrayIndex = this._events.findIndex(event => event.id === id);
    // if (this._events.date < new Date()){
    //   return true
    // } else {
    return false;
    // }
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
