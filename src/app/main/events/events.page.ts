import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import { Events } from './events.model';

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

}
