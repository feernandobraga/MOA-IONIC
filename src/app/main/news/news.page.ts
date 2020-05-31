import { Component, OnInit } from "@angular/core";
import { NewsService } from "./news.service";
import { News } from "./news.model";
import { MemberService } from "../../auth/member.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-news",
  templateUrl: "./news.page.html",
  styleUrls: ["./news.page.scss"],
})
export class NewsPage implements OnInit {
  loadedNews: News[];
  isLoading: Boolean = true;
  private _memberEmail: string;
  private _memberToken: string;

  constructor(
    private _newsService: NewsService,
    private _memberService: MemberService,
    private _authService: AuthService
  ) {}

  // ngOnInit() {
  //   // this.loadedNews = this._newsService.news;
  //   // this.loadedNews = [];
  //   this._newsService.fetchNews().subscribe(
  //     data => (
  //       (this.loadedNews = data),
  //       console.log("***********NEW API RESPONSE" + data)
  //     ),

  //     err =>
  //       console.log(
  //         "Error on news.page TS file" + JSON.stringify(err, null, 2) + err
  //       )
  //   );
  // }

  ngOnInit() {
    this._memberService.retrieveMemberData().then(resMember => {
      this._memberEmail = resMember._email;
      this._memberToken = resMember._authenticationToken;
      this._newsService
        .fetchNews(this._memberEmail, this._memberToken)
        .subscribe(resNews => {
          this.loadedNews = resNews;
          this.isLoading = false;
        });
    });
  }

  onLogout() {
    this._authService.logout();
  }
}
