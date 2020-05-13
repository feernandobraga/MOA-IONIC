import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { Member } from "./member.model";

@Injectable({
  providedIn: "root",
})
export class MemberService {
  private storageKey = "memberData";

  constructor() {}

  storeMemberData(member: Member) {
    // console.log(
    //   "member.service - storeMemberData() " + JSON.stringify(member, null, 2)
    // );

    const memberDataAsString = JSON.stringify(member);
    Plugins.Storage.set({ key: this.storageKey, value: memberDataAsString });
  }

  async retrieveMemberData() {
    const retrievedMember = await Plugins.Storage.get({ key: this.storageKey });
    const member = JSON.parse(retrievedMember.value);
    // console.log(
    //   "member.service - retrieveMemberData() " + JSON.stringify(member, null, 2)
    // );

    return member;
  }
}
