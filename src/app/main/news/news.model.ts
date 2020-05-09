export class News {
  constructor(
    public id: string,
    public member_id: number,
    public title: string,
    public description: string,
    public created_at: Date
  ) {}
}
