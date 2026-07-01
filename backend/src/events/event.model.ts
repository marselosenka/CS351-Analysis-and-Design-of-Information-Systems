export interface Event {
  id?: number;
  title: string;
  game: string;
  eventType: string;
  date: string;         // ISO format 'YYYY-MM-DD'
  startTime: string;    // format 'HH:MM'
  timezone: string;
  price: number;
  status: 'Upcoming' | 'Live';  // 
  wallpaper?: File | string;              // file upload or URL
  description: string;
  teams: string[];                        // list of selected teams
  schedule: {
    time: string;                         // format 'HH:MM'
    activity: string;
  }[];
}
