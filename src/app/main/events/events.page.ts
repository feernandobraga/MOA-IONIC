import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import { Events } from './events.model';
import { SegmentChangeEventDetail } from '@ionic/core'

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  upcomingEvents: Events[]
  loadedEvents: Events[]
  pastEvents: Events[]
  today = new Date();

  constructor(private _eventsService: EventsService) { }

  ngOnInit() {
    this.upcomingEvents = this._eventsService.allEvents.filter(
      event => {
        return event.date >= this.today
      }
    )
    this.loadedEvents = this.upcomingEvents
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
    console.log("Before filter pastEvents " + this.pastEvents)
    console.log(event.detail.value)
    if (event.detail.value === 'pastEvents') {
      
      this.pastEvents = this._eventsService.allEvents.filter(
        event => {
          return event.date < this.today
        }
      )

      console.log("After filter pastEvents " + this.pastEvents)
      console.log(event.detail.value)

      this.loadedEvents = this.pastEvents
    
    } else {

      this.loadedEvents = this.upcomingEvents

    }

  }

}
