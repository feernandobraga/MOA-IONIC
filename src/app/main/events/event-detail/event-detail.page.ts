import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController, AlertController } from "@ionic/angular";
import { EventsService } from "../events.service";
import { Events } from "../events.model";
import { MemberService } from "../../../auth/member.service";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "app-event-detail",
  templateUrl: "./event-detail.page.html",
  styleUrls: ["./event-detail.page.scss"],
})
export class EventDetailPage implements OnInit {
  loadedEvent: Events;
  today = new Date();
  isPastEvent: boolean = false;
  isLoading: boolean = true;
  private _memberEmail: string;
  private _memberToken: string;
  private _memberID: string;
  private _attendee: [];
  isAlreadyAttending: boolean;
  private _eventID: string;
  private _attendanceID: string;

  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _navController: NavController,
    private _eventsService: EventsService,
    private _alertController: AlertController,
    private _memberService: MemberService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this._activatedRouter.paramMap.subscribe(paramMap => {
      if (!paramMap.has("eventId")) {
        this._navController.navigateBack("/main/tabs/events");
        return;
      }

      this._memberService.retrieveMemberData().then(resMember => {
        this._memberEmail = resMember._email;
        this._memberToken = resMember._authenticationToken;
        this._memberID = resMember.id;
        this._eventsService
          .fetchSingleEvent(
            paramMap.get("eventId"),
            this._memberEmail,
            this._memberToken
          )
          .pipe(
            tap((eventData: any) => {
              this.isLoading = false;
              this._eventID = eventData.id;
              console.log("EVENT ID: " + this._eventID);

              console.log("ARRAY OF ATTENDEES: ");
              this._attendee = eventData.attendees;
              console.log(this._attendee);
              console.log("Im member number: " + this._memberID);
              let found: any = this._attendee.find(
                (element: any) => element.member_id === this._memberID
              );
              if (found) {
                console.log("MEMBER IS GOING TO THIS EVENT");
                this._attendanceID = found.id;
                console.log("Attendance ID: " + this._attendanceID);

                this.isAlreadyAttending = true;
              } else {
                console.log("MEMBER IS NOOOOTTTTT GOING TO THIS EVENT! ):");
                this.isAlreadyAttending = false;
              }
              console.log(found);
            })
          )
          .subscribe(data => {
            this.loadedEvent = data;
            if (new Date(this.loadedEvent.event_date_and_time) < this.today) {
              this.isPastEvent = true;
              console.log("Past event is true");
            } else {
              this.isPastEvent = false;
              console.log("past event is false");
            }
          });
      });
    });
  }

  // this.pastEvents = this.pastEvents.filter(event => {
  //       return new Date(event.event_date_and_time) < this.today;
  //     });

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

  confirmRsvp() {
    this._alertController
      .create({
        header: "SUCCESS!",
        message: "You have successfully RSVP'd to this event.",
        buttons: [
          {
            text: "OK",
            handler: () => {
              console.log(
                "RSVPING WITH THE FOLLOWING ARGUMENTS" + this._memberEmail,
                this._memberToken,
                this._memberID,
                this._eventID
              );

              this._eventsService
                .rsvpToEvent(
                  this._memberEmail,
                  this._memberToken,
                  this._memberID,
                  this._eventID,
                  new Date()
                )
                .pipe(
                  tap(resData => {
                    this._navController.navigateBack(["/main/tabs/events"]);
                  })
                )
                .subscribe();
            },
          },
        ],
      })
      .then(alertElement => {
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

  cancelRsvp(eventID?: string) {
    this._alertController
      .create({
        header: "Reservation Cancelled!",
        message: "You have successfully canceled your reservation.",
        buttons: [
          {
            text: "OK",
            handler: () => {
              this._eventsService
                .cancelReservation(
                  this._attendanceID,
                  this._memberEmail,
                  this._memberToken
                )
                .pipe(
                  tap(() => {
                    this._navController.navigateBack(["/main/tabs/events"]);
                  })
                )
                .subscribe();
            },
          },
        ],
      })
      .then(alertElement => {
        alertElement.present();
      });
  }
}
