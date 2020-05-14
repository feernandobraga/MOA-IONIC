import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { NewsService } from "../news.service";
import { ActivatedRoute } from "@angular/router";
import { News } from "../news.model";
import { MemberService } from "src/app/auth/member.service";

@Component({
  selector: "app-news-detail",
  templateUrl: "./news-detail.page.html",
  styleUrls: ["./news-detail.page.scss"],
})
export class NewsDetailPage implements OnInit {
  loadedNews: News;
  private _memberEmail: string;
  private _memberToken: string;

  constructor(
    private _router: ActivatedRoute,
    private _navController: NavController,
    private _newsService: NewsService,
    private _memberService: MemberService
  ) {}

  ngOnInit() {
    this._router.paramMap.subscribe(paramMap => {
      if (!paramMap.has("newsId")) {
        this._navController.navigateBack("/main/tabs/news/");
        return;
      }

      // this.loadedNews = this._newsService.getSingleNews(paramMap.get('newsId'));
      this._memberService.retrieveMemberData().then(resMember => {
        this._memberEmail = resMember._email;
        this._memberToken = resMember._authenticationToken;
        this._newsService
          .fetchSingleNews(
            paramMap.get("newsId"),
            this._memberEmail,
            this._memberToken
          )
          .subscribe(data => {
            this.loadedNews = data;
          });
      });
    });
  }
}
