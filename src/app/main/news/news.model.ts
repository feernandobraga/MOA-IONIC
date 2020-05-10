export class News {
  constructor(
    public id: string,
    public publisher_id: number,
    public publisher_first_name: string,
    public publisher_last_name: string,
    public title: string,
    public description: string,
    public created_at: Date
  ) {}
}

/* id": 1,
"publisher_id": 9,
"publisher_first_name": "Fernando",
"publisher_last_name": "MOA",
"title": "First news",
"description": "First news description",
"created_at": "2020-05-07T07:14:44.877Z" */
