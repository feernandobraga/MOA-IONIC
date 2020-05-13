import { Injectable } from "@angular/core";
import { News } from "./news.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, switchMap, tap, take } from "rxjs/operators";
import { Member } from "../../auth/member.model";
import { MemberService } from "../../auth/member.service";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  // private apiURL = "https://moa.herokuapp.com/api/v1/";
  private apiURL = "http://localhost:3000/api/v1/";

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

  fetchNews(): Observable<News[]> {
    let email: string;
    let authenticationToken: string;

    this._memberService.retrieveMemberData().then(data => {
      (email = data._email),
        (authenticationToken = data._authenticationToken),
        console.log(email, authenticationToken);
    });

    const options = {
      headers: new HttpHeaders({
        "X-Member-Email": email,
        "X-Member-Token": authenticationToken,
      }),
    };

    // TODO: THE header is not getting the values for email and authenticationToken. It can be variable scope issue
    console.log("Sending HEADER" + JSON.stringify(options, null, 2));
    console.log("EMAIL AND AUTHENTICATIONTOKEN: " + email, authenticationToken);

    return this._http.get<News[]>(this.apiURL + "news", options);
    // return this._http.get<News[]>(this.apiURL + "news");
  }

  fetchSingleNews(id: string): Observable<News> {
    return this._http.get<News>(this.apiURL + "news/" + id);
  }
}
