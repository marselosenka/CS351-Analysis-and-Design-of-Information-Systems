export interface Event {
    id?: number;
    title: string;
    game: string;
    eventType: string;
    date: string;
    startTime: string;
    timezone: string;
    price: number;
    status: 'Upcoming' | 'Live';
    wallpaper?: File | string;
    description: string;
    teams: string[];
    schedule: {
        time: string;
        activity: string;
    }[];
}
