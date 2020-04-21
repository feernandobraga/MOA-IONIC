import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { EventsService } from '../events.service';
import { Events } from '../events.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  loadedEvent: Events

  constructor(
    private _router: ActivatedRoute,
    private _navController: NavController,
    private _eventsService: EventsService
  ) { }

  ngOnInit() {
    this._router.paramMap.subscribe(
      paramMap => {

        if(!paramMap.has('eventId')){
          this._navController.navigateBack('/main/tabs/events')
          return
        }

        this.loadedEvent = this._eventsService.getEvent(paramMap.get('eventId'));

      }
    )
  }

}
