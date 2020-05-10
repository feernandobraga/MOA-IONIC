import { Component, OnInit } from "@angular/core";
import { EventsService } from "./events.service";
import { Events } from "./events.model";
import { SegmentChangeEventDetail } from "@ionic/core";

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

  constructor(private _eventsService: EventsService) {}

  ngOnInit() {
    this._eventsService.fetchAllEvents().subscribe(
      eventData => {
        console.log(eventData);
        // this.loadedEvents = eventData
        this.upcomingEvents = eventData;
        this.pastEvents = eventData;
        this.filterUpcoming();
      },
      err => {
        console.log("Something went wrong when fetching events");
      }
    );
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
