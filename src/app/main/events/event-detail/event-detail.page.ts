import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { EventsService } from '../events.service';
import { Events } from '../events.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  loadedEvent: Events;
  today = new Date();

  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _navController: NavController,
    private _eventsService: EventsService,
    private _alertController: AlertController
  ) { }

  ngOnInit() {
    this._activatedRouter.paramMap.subscribe(
      paramMap => {

        if(!paramMap.has('eventId')){
          this._navController.navigateBack('/main/tabs/events')
          return
        }

        this.loadedEvent = this._eventsService.getEvent(paramMap.get('eventId'));
      }
    )

  }


  // async confirmRsvp() {
    
  //   const alert = await this._alertController.create({
  //     header: "SUCCESS!",
  //     message: "You have successfully RSVP'd to this event",
  //     buttons: ['OK']
  //   })
  //   this._eventsService.toggleRSVP(this.loadedEvent.id, true)
  //   await alert.present();
  //   this._router.navigateByUrl('/main/tabs/events')
    
  // }

  confirmRsvp(){
    this._alertController.create({
      header: 'SUCCESS!',
      message: "You have successfully RSVP'd to this event.",
      buttons: [
        {
          text: 'OK',
          handler: () => {
           this._eventsService.toggleRSVP(this.loadedEvent.id, true)
            this._navController.navigateBack(['/main/tabs/events']);
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  // async cancelRsvp() {

  //   const alert = await this._alertController.create({
  //     header: "SUCCESS!",
  //     message: "You have successfully canceled your reservation",
  //     buttons: ['OK']
  //   })
  //   await alert.present();
  //   // this.loadedEvent[this.loadedEvent.id].isRsvpd = true
  //   // this.loadedEvent.isRsvpd = true;
  //   //console.log(this._eventsService[this.loadedEvent.id])
    
  //   this._eventsService.toggleRSVP(this.loadedEvent.id, false)
    
  // }

  cancelRsvp(){
    
      this._alertController.create({
        header: 'Reservation Cancelled!',
        message: "You have successfully canceled your reservation.",
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this._eventsService.toggleRSVP(this.loadedEvent.id, false)
              this._navController.navigateBack(['/main/tabs/events']);
            }
          }
        ]
      }).then(alertElement => {
        alertElement.present();
      });
    
  }
  

}
