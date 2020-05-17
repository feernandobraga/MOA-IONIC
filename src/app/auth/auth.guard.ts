import { Injectable } from "@angular/core";
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { MemberService } from "./member.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
  private _shouldAutoLogin: boolean;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _memberService: MemberService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this._authService.userIsAuthenticated) {
    //   this._router.navigateByUrl('auth')
    // }
    // return this._authService.userIsAuthenticated;

    const ShouldAutoLogin = this._memberService
      .retrieveMemberData()
      .then(resMember => {
        if (!resMember) {
          console.log("No token stored");
          // this._shouldAutoLogin = false;
          this._router.navigateByUrl("auth");
          return false;
        } else {
          console.log("Token found");
          // this._shouldAutoLogin = true;
          return true;
        }
        // this._memberEmail = resMember._email;
        // this._memberToken = resMember._authenticationToken;
      });

    // console.log("value of should login " + this._shouldAutoLogin);
    return ShouldAutoLogin;
    // return this._shouldAutoLogin;
  }
}
