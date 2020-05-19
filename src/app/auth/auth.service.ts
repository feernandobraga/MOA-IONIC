import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Member } from "./member.model";
import { MemberService } from "./member.service";
import { Router } from "@angular/router";
import { NavController, AlertController } from "@ionic/angular";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _userIsAuthenticated = false;
  private apiURL = environment.apiURL;
  apiResponse: any;
  private isMemberAuthorized = false;

  constructor(
    private _http: HttpClient,
    private _memberService: MemberService,
    private _router: Router,
    private _navController: NavController,
    private _alertController: AlertController
  ) {}

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  login(email: string, password: string) {
    // this._userIsAuthenticated = true;
    return this._http
      .post<any>(this.apiURL + "sessions", {
        email: email,
        password: password,
      })
      .pipe(
        tap(pipedData => {
          console.log(
            "Token return from API " + pipedData.authentication_token
          );

          console.log("Check if user is authorized to see the content");
          this.isMemberAuthorized = pipedData.authorized_for_app;
          console.log(this.isMemberAuthorized);

          // IF credentials are valid and user is authorized
          if (
            pipedData.authentication_token != null &&
            this.isMemberAuthorized
          ) {
            this._userIsAuthenticated = true;
            this.createMember(pipedData);
            this._router.navigateByUrl("/main/tabs/news");
            //ELSE IF credentials are valid but not authorized
          } else if (!this.isMemberAuthorized) {
            this.displayAlert(
              "Your account has not been approved yet, please try logging again later."
            );
          }
        })
      );
  }

  createMember(apiResponse: any) {
    const member = new Member(
      apiResponse.id,
      apiResponse.email,
      apiResponse.authentication_token
    );

    // ADD member to storage
    this._memberService.storeMemberData(member);
  }

  logout() {
    this._userIsAuthenticated = false;
    this._memberService.destroyMemberData();
    this._navController.navigateBack("auth");
  }

  signUp(
    membershipNumber: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    return this._http
      .post<any>(this.apiURL + "members", {
        email: email,
        membership_number: membershipNumber,
        first_name: firstName,
        last_name: lastName,
        password: password,
        password_confirmation: password,
      })
      .pipe(
        tap(resSignUp => {
          console.log("Check if user is authorized to see the content");
          this.isMemberAuthorized = resSignUp.authorized_for_app;
          console.log(this.isMemberAuthorized);
          // IF credentials are valid and user is Authorized
          if (
            resSignUp.authentication_token != null &&
            this.isMemberAuthorized
          ) {
            this._userIsAuthenticated = true;
            this.createMember(resSignUp);
            this._router.navigateByUrl("/main/tabs/news");
          } else if (!this.isMemberAuthorized) {
            this.displayAlert(
              "You have successfully created an account but your access has not been approved yet. Please try logging again later."
            );
          }
        })
      );
  }

  displayAlert(message: string) {
    this._alertController
      .create({
        header: "Awaiting Approval",
        message: message,
        buttons: [
          {
            text: "Okay",
          },
        ],
      })
      .then(alertElement => {
        alertElement.present();
      });
  }
}
