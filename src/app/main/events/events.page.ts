import { Component, OnInit } from "@angular/core";
import { EventsService } from "./events.service";
import { Events } from "./events.model";
import { SegmentChangeEventDetail } from "@ionic/core";
import { MemberService } from "../../auth/member.service";
import { stringify } from "@angular/compiler/src/util";
import { element } from "protractor";

@Component({
  selector: "app-events",
  templateUrl: "./events.page.html",
  styleUrls: ["./events.page.scss"],
})
export class EventsPage implements OnInit {
  upcomingEvents: Events[];
  loadedEvents: Events[];
  pastEvents: Events[];
  today = new Date();
  isLoading: boolean = true;
  private _memberEmail: string;
  private _memberToken: string;
  private _memberID: string;
  private _attendees: [];
  segment: string;

  constructor(
    private _eventsService: EventsService,
    private _memberService: MemberService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.segment = "upcomingEvents";
    this._memberService.retrieveMemberData().then(resMember => {
      this._memberEmail = resMember._email;
      this._memberToken = resMember._authenticationToken;
      this._memberID = resMember.id;
      this._eventsService
        .fetchAllEvents(this._memberEmail, this._memberToken)
        .subscribe(
          (eventData: any) => {
            this.isLoading = false;
            console.log(eventData);
            // this.loadedEvents = eventData
            this.upcomingEvents = eventData;
            this.pastEvents = eventData;
            this.filterUpcoming();
            console.log("FINDING ATTENDEEESSSS");
            // console.log(this.upcomingEvents[0].attendees);
            for (let singleEvent of this.upcomingEvents) {
              // console.log("inside the loop");
              // let found: any = evt.attendees.filter(
              //   (element: any) => (element: any) =>
              //     element.member_id === this._memberID
              // );

              // let attendee: any = evt.attendees.filter(
              //   (element: any) => element.member_id === this._memberID
              // );

              // for (let singleAttendee of singleEvent.attendees) {
              //   console.log(JSON.stringify(singleAttendee.id));
              // }

              singleEvent.attendees.forEach((whatever: any) => {
                if (whatever.member_id === this._memberID) {
                  console.log("FUCKYEAH!!");
                  singleEvent.isRsvpd = true;
                } else {
                  singleEvent.isRsvpd = false;
                }
              });

              // console.log(JSON.stringify(evt.attendees[0].member_id));

              // evt.attendees.filter
              // console.log(stringify(evt.attendees));
              // console.log("IS FOUND??? " + found);
            }
          },
          err => {
            this.isLoading = false;
            console.log("Something went wrong when fetching events");
          }
        );
    });
  }

  filterUpcoming() {
    this.upcomingEvents = this.upcomingEvents.filter(event => {
      // console.log(event.event_date_and_time >= this.today);
      return new Date(event.event_date_and_time) >= this.today;
    });
    this.loadedEvents = this.upcomingEvents;
  }

  // ionViewWillEnter() {
  //   this.loadedEvents = this._eventsService.allEvents
  //   this.pastEvents = this._eventsService.allEvents

  // }

  /* 
   this is the method that handles the change on the segment menu in the discover.pages
   The method receives an event as parameter
 */

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    /* console.log("initial value of pastEvents "+ this.pastEvents)

      this.pastEvents = this.loadedEvents.filter(
        event => {
          return event.date < this.today
        }
      )
   */
    console.log("Before filter pastEvents " + this.pastEvents);
    console.log(event.detail.value);
    if (event.detail.value === "pastEvents") {
      this.pastEvents = this.pastEvents.filter(event => {
        return new Date(event.event_date_and_time) < this.today;
      });

      console.log(event.detail.value);

      // console.log(this.pastEvents);
      // console.log(this.pastEvents.reverse());
      this.loadedEvents = [...this.pastEvents].reverse();
    } else {
      this.loadedEvents = this.upcomingEvents;
    }
  }
}
