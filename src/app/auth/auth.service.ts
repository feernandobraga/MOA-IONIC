import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Member } from "./member.model";
import { MemberService } from "./member.service";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _userIsAuthenticated = false;
  private apiURL = "http://localhost:3000/api/v1/";
  apiResponse: any;

  constructor(
    private _http: HttpClient,
    private _memberService: MemberService,
    private _router: Router,
    private _navController: NavController
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

          if (pipedData.authentication_token != null) {
            this._userIsAuthenticated = true;

            this.createMember(pipedData);
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
          if (resSignUp.authentication_token != null) {
            this._userIsAuthenticated = true;
            this.createMember(resSignUp);
          }
        })
      );
  }
}
