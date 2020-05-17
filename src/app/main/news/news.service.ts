import { Injectable } from "@angular/core";
import { News } from "./news.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, switchMap, tap, take } from "rxjs/operators";
import { Member } from "../../auth/member.model";
import { MemberService } from "../../auth/member.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  // private apiURL = "https://moa.herokuapp.com/api/v1/";
  // private apiURL = "http://localhost:3000/api/v1/";
  private apiURL = environment.apiURL;
  private _memberEmail: string;
  private _memberToken: string;
  private headers = new HttpHeaders();
  private _options;

  constructor(
    private _http: HttpClient,
    private _memberService: MemberService
  ) {}

  header: string;

  private _news: News[] = [];

  get news() {
    return [...this._news];
  }

  getSingleNews(id: string) {
    return { ...this._news.find(n => n.id === id) };
  }

  oldFetchNews() {
    this._memberService.retrieveMemberData().then(memberInfo => {
      this._memberEmail = memberInfo._email;
      this._memberToken = memberInfo._authenticationToken;
      return this._http.get<News[]>(this.apiURL + "news", {
        headers: new HttpHeaders({
          // "X-Member-Email": this._memberEmail,
          // "X-Member-Token": this._memberToken,
          "X-Member-Email": "fernando@moa.com",
          "X-Member-Token": "JMeHnn6jkSYzJfY8LwHv",
        }),
      });
    });

    // return this._http.get<News[]>(this.apiURL + "news", {
    //   headers: new HttpHeaders({
    //     "X-Member-Email": "fernando@moa.com",
    //     "X-Member-Token": "JMeHnn6jkSYzJfY8LwHv",
    //   }),
    // });

    // return this._http.get<News[]>(this.apiURL + "news");

    // console.log("Sending HEADER" + JSON.stringify(options, null, 2));
    // console.log(
    //   "EMAIL AND AUTHENTICATIONTOKEN: " + this._memberToken,
    //   this._memberEmail
    // );

    // return this._http.get<News[]>(this.apiURL + "news");
  }

  fetchSingleNews(
    id: string,
    memberEmail: string,
    memberToken: string
  ): Observable<News> {
    return this._http.get<News>(this.apiURL + "news/" + id, {
      headers: new HttpHeaders({
        "X-Member-Email": memberEmail,
        "X-Member-Token": memberToken,
      }),
    });
  }

  fetchNews(memberEmail: string, memberToken: string): Observable<News[]> {
    return this._http.get<News[]>(this.apiURL + "news", {
      headers: new HttpHeaders({
        "X-Member-Email": memberEmail,
        "X-Member-Token": memberToken,
        // "X-Member-Email": "fernando@moa.com",
        // "X-Member-Token": "JMeHnn6jkSYzJfY8LwHv",
      }),
    });
  }
}
