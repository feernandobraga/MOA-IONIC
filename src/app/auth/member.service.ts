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
    const memberDataAsString = JSON.stringify(member);
    Plugins.Storage.set({ key: this.storageKey, value: memberDataAsString });

    console.log("****MEMBER ADDED TO STORAGE: " + memberDataAsString);
  }

  async retrieveMemberData() {
    const retrievedMember = await Plugins.Storage.get({ key: this.storageKey });
    const member = JSON.parse(retrievedMember.value);
    // console.log(
    //   "member.service - retrieveMemberData() " + JSON.stringify(member, null, 2)
    // );

    return member;
  }

  // retrieveMember() {
  //   return Plugins.Storage.get({ key: this.storageKey });
  // }

  destroyMemberData() {
    Plugins.Storage.remove({ key: this.storageKey });
  }
}
