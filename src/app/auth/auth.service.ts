import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Member } from "./member.model";
import { MemberService } from "./member.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _userIsAuthenticated = false;
  private apiURL = "http://localhost:3000/api/v1/";
  apiResponse: any;

  constructor(
    private _http: HttpClient,
    private _memberService: MemberService
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
          // console.log("after the redirect");
          // IF validtoken then _userIsAuthenticated = true?

          // console.log("stringfied: " + JSON.stringify(this.apiResponse));
        })
      );
  }

  createMember(apiResponse: any) {
    const member = new Member(
      apiResponse.id,
      apiResponse.email,
      apiResponse.authentication_token
    );
    // console.log("New member created: " + JSON.stringify(member, null, 2));
    console.log(
      "Adding info to local storage... " + JSON.stringify(member, null, 2)
      // this._memberService.storeMemberData(member)
    );

    // console.log("Information added to local storage... Now retrieving it: ");
    this._memberService.retrieveMemberData().then(retrievedMember => {
      console.log(
        "retrieving the user token from storage: " +
          retrievedMember._authenticationToken
      );
    });
  }

  logout() {
    this._userIsAuthenticated = false;
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
        tap(response => {
          console.log("Server response is: " + response);
          console.log(
            "Authentication Token returned is: " + response.authentication_token
          );
        })
      );
  }
}
/*     const membershipNumber = form.value.membershipNumber;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password; */

//     {
//     "status": "created",
//     "member": {
//         "id": 13,
//         "email": "apiuser2@moa.com",
//         "membership_number": "999",
//         "first_name": "API",
//         "last_name": "USER",
//         "authorized_for_app": false,
//         "created_at": "2020-05-13T19:09:15.972+10:00",
//         "updated_at": "2020-05-13T19:09:15.972+10:00",
//         "access_level": null,
//         "authentication_token": "GiBf-ReTXsLzxByEdrzs"
//     }
// }
