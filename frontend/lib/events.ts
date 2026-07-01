export type EventStatus = "Upcoming" | "Live";

export interface EventRecord {
  id?: number;
  title: string;
  game: string;
  eventType: string;
  date: string;
  startTime: string;
  timezone: string;
  price: number;
  status: EventStatus;
  wallpaper?: string | null;
  description: string;
  teams: string[] | string;
  schedule: { time: string; activity: string }[] | string;
}

export interface EventCardData {
  id?: number;
  title: string;
  game: string;
  dateLabel: string;
  priceLabel: string;
  image: string;
  status: EventStatus;
}

export const featuredGames = ["League of Legends", "Valorant", "CS:GO", "Dota 2"];

const imageExtensionPattern = /\.(png|jpe?g|webp|gif|svg|avif)$/i;

export function resolveEventImagePath(image?: string | null) {
  if (!image) {
    return "/img/video.png";
  }

  if (image.startsWith("/") || /^https?:\/\//i.test(image)) {
    return image;
  }

  return imageExtensionPattern.test(image) ? `/img/${image}` : `/img/${image}.png`;
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatStableDateLabel(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

export function toCardData(event: EventRecord): EventCardData {
  return {
    id: event.id,
    title: event.title,
    game: event.game,
    dateLabel: formatStableDateLabel(event.date),
    priceLabel: event.price === 0 ? "FREE" : `EUR ${event.price}`,
    image: event.wallpaper || "video",
    status: event.status,
  };
}
