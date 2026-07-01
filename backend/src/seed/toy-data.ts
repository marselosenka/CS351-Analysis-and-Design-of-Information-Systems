import * as mysql from "mysql2/promise";

type SeedEvent = {
  title: string;
  game: string;
  eventType: string;
  date: string;
  startTime: string;
  timezone: string;
  price: number;
  status: "Upcoming" | "Live";
  wallpaper: string | null;
  description: string;
  teams: string[];
  schedule: { time: string; activity: string }[];
};

const seedEvents: SeedEvent[] = [
  {
    title: "League Championship Finals",
    game: "League of Legends",
    eventType: "Final",
    date: "2026-07-12",
    startTime: "18:00",
    timezone: "EEST",
    price: 0,
    status: "Live",
    wallpaper: "lol",
    description: "Season finale between the two top ranked teams.",
    teams: ["Blue Phoenix", "Red Atlas"],
    schedule: [
      { time: "18:00", activity: "Opening ceremony" },
      { time: "18:30", activity: "Game 1" },
      { time: "19:30", activity: "Game 2" },
    ],
  },
  {
    title: "Valorant Tokyo Clash",
    game: "Valorant",
    eventType: "Showmatch",
    date: "2026-07-18",
    startTime: "19:00",
    timezone: "EEST",
    price: 4.99,
    status: "Live",
    wallpaper: "home-valorant",
    description: "Fast-paced best-of-three showmatch with guest players.",
    teams: ["Astra Core", "Neon Rift"],
    schedule: [
      { time: "19:00", activity: "Pre-show" },
      { time: "19:20", activity: "Match 1" },
      { time: "20:00", activity: "Match 2" },
    ],
  },
  {
    title: "CS Major Preview Night",
    game: "CS:GO",
    eventType: "Preview",
    date: "2026-08-03",
    startTime: "20:00",
    timezone: "EEST",
    price: 0,
    status: "Upcoming",
    wallpaper: "home-css",
    description: "Community preview event before the major begins.",
    teams: ["Nord", "Vault"],
    schedule: [
      { time: "20:00", activity: "Stage intro" },
      { time: "20:30", activity: "Map reveal" },
    ],
  },
  {
    title: "Dota Invitational",
    game: "Dota 2",
    eventType: "Tournament",
    date: "2026-08-16",
    startTime: "17:30",
    timezone: "EEST",
    price: 9.99,
    status: "Upcoming",
    wallpaper: "home-data2",
    description: "Invitational with invited regional champions.",
    teams: ["Titan", "Orbit", "Echo", "Nova"],
    schedule: [
      { time: "17:30", activity: "Opening" },
      { time: "18:00", activity: "Bracket draw" },
      { time: "18:30", activity: "Game block" },
    ],
  },
];

async function main() {
  const host = process.env.DB_HOST || "mysql";
  const port = Number(process.env.DB_PORT || 3306);
  const user = process.env.DB_USER || "app_user";
  const password = process.env.DB_PASSWORD || "app_pass_12345";
  const database = process.env.DB_NAME || "app_db";

  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  });

  try {
    const [rows] = await connection.query<any[]>("SELECT COUNT(*) AS count FROM events");
    const count = Number((rows[0] as any)?.count ?? 0);

    if (count > 0) {
      console.log(`Events already exist (${count}); skipping seed.`);
      return;
    }

    for (const event of seedEvents) {
      await connection.execute(
        `
          INSERT INTO events
            (title, game, eventType, date, startTime, timezone, price, status, wallpaper, description, teams, schedule)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          event.title,
          event.game,
          event.eventType,
          event.date,
          event.startTime,
          event.timezone,
          event.price,
          event.status,
          event.wallpaper,
          event.description,
          JSON.stringify(event.teams),
          JSON.stringify(event.schedule),
        ]
      );
    }

    console.log(`Seeded ${seedEvents.length} events.`);
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});
