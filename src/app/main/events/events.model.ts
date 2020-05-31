export class Events {
  constructor(
    public id: string,
    public publisher_id: number,
    public publisher_first_name: string,
    public publisher_last_name: string,
    public title: string,
    public address: string,
    public meeting_point: string,
    public event_date_and_time: Date,
    public description: string,
    public created_at: Date,
    public isRsvpd?: boolean,
    public attendees?: []
  ) {}
}

/* {
"id": 4,
"publisher_id": 8,
"publisher_first_name": "James",
"publisher_last_name": "Bond-Wife",
"title": "Week 4 - 2nd sprint meeting",
"address": "264, Flinders Street",
"meeting_point": "Flinders street station",
"event_date_and_time": "2020-03-25T10:00:00.000Z",
"description": "This is going to be amazing.\r\nLets moke everywhere since no one is here (:",
"created_at": "2020-03-24T23:12:15.851Z"
}, */
