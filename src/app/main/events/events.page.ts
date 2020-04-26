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

  loadedEvents: Events[]

  constructor(private _eventsService: EventsService) { }

  ngOnInit() {
    this.loadedEvents = this._eventsService.allEvents
  }

  /* 
   this is the method that handles the change on the segment menu in the discover.pages
   The method receives an event as parameter
 */
  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {

    console.log(event.detail)

  }

}
