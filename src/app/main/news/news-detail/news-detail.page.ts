import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { NewsService } from "../news.service";
import { ActivatedRoute } from "@angular/router";
import { News } from "../news.model";

@Component({
  selector: "app-news-detail",
  templateUrl: "./news-detail.page.html",
  styleUrls: ["./news-detail.page.scss"],
})
export class NewsDetailPage implements OnInit {
  loadedNews: News;

  constructor(
    private _router: ActivatedRoute,
    private _navController: NavController,
    private _newsService: NewsService
  ) {}

  ngOnInit() {
    this._router.paramMap.subscribe(paramMap => {
      if (!paramMap.has("newsId")) {
        this._navController.navigateBack("/main/tabs/news/");
        return;
      }

      // this.loadedNews = this._newsService.getSingleNews(paramMap.get('newsId'));
      this._newsService
        .fetchSingleNews(paramMap.get("newsId"))
        .subscribe(data => {
          console.log(data);
          this.loadedNews = data;
        });
    });
  }
}
