import { Injectable } from "@angular/core";
import { Events } from "./events.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Member } from "../../auth/member.model";
import { environment } from "../../../environments/environment";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EventsService {
  private apiURL = environment.apiURL;

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

  fetchAllEvents(
    memberEmail: string,
    memberToken: string
  ): Observable<Events[]> {
    return this._http.get<Events[]>(this.apiURL + "events", {
      headers: new HttpHeaders({
        "X-Member-Email": memberEmail,
        "X-Member-Token": memberToken,
      }),
    });
  }

  // fetchSingleNews(
  //   id: string,
  //   memberEmail: string,
  //   memberToken: string
  // ): Observable<News> {
  //   return this._http.get<News>(this.apiURL + "news/" + id, {
  //     headers: new HttpHeaders({
  //       "X-Member-Email": memberEmail,
  //       "X-Member-Token": memberToken,
  //     }),
  //   });
  // }

  fetchSingleEvent(
    id: string,
    memberEmail: string,
    memberToken: string
  ): Observable<Events> {
    return this._http.get<Events>(this.apiURL + "events/" + id, {
      headers: new HttpHeaders({
        "X-Member-Email": memberEmail,
        "X-Member-Token": memberToken,
      }),
    });
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

  rsvpToEvent(
    memberEmail: string,
    memberToken: string,
    memberID: string,
    eventID: string,
    time: Date
  ): Observable<Events> {
    return this._http
      .post<Events>(this.apiURL + "attendances", {
        headers: new HttpHeaders({
          "X-Member-Email": memberEmail,
          "X-Member-Token": memberToken,
        }),
        member_id: memberID,
        event_id: eventID,
        time: new Date(),
      })
      .pipe(
        tap(apiResponse => {
          console.log("RESPONSE FROM POST API");

          console.log(apiResponse);
        })
      );
  }

  cancelReservation(
    reservationID: string,
    memberEmail: string,
    memberToken: string
  ): Observable<any> {
    return this._http.delete<any>(
      this.apiURL + "attendances/" + reservationID,
      {
        headers: new HttpHeaders({
          "X-Member-Email": memberEmail,
          "X-Member-Token": memberToken,
        }),
      }
    );
  }
}
