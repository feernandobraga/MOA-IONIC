import { Injectable } from "@angular/core";
import { News } from "./news.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  // private apiURL = "https://moa.herokuapp.com/api/v1/";
  private apiURL = "http://localhost:3000/api/v1/";

  constructor(private _http: HttpClient) {}

  private _news: News[] = [];

  get news() {
    return [...this._news];
  }

  getSingleNews(id: string) {
    return { ...this._news.find(n => n.id === id) };
  }

  fetchNews(): Observable<News[]> {
    return this._http.get<News[]>(this.apiURL + "news");
  }

  fetchSingleNews(id: string): Observable<News> {
    return this._http.get<News>(this.apiURL + "news/" + id);
  }
}
