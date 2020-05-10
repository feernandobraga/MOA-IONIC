import { Component, OnInit } from "@angular/core";
import { NewsService } from "./news.service";
import { News } from "./news.model";

@Component({
  selector: "app-news",
  templateUrl: "./news.page.html",
  styleUrls: ["./news.page.scss"],
})
export class NewsPage implements OnInit {
  loadedNews: News[];

  constructor(private _newsService: NewsService) {}

  ngOnInit() {
    // this.loadedNews = this._newsService.news;
    // this.loadedNews = [];
    this._newsService.fetchNews().subscribe(
      data => (this.loadedNews = data),
      // data => console.log(data),

      err => console.log(err)
    );
  }
}
