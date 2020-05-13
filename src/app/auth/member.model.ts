export class Member {
  constructor(
    public id: string,
    private _email: string,
    private _authenticationToken: string,
    public firstName?: string,
    public lastName?: string,
    public membershipNumber?: string,
    public authorizedForApp?: boolean // public accessLevel?: string
  ) {}
}
