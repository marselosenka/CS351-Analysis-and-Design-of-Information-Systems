import React, { useState } from "react";
import styles from "../../styles/CreateNewEvent.module.css";
import Navbar from "../layout/Navbar";
import { fetchJson } from "../../lib/api";

export default function CreateNewEvent() {
  const [title, setTitle] = useState("");
  const [game, setGame] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [timezone, setTimezone] = useState("GMT +02");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [wallpaper, setWallpaper] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [teams, setTeams] = useState(["Team 1", "Team 2", "Team 3"]);
  const [teamInput, setTeamInput] = useState("");
  const [schedule, setSchedule] = useState([
    { time: "06:00", activity: "" },
    { time: "06:30", activity: "" },
  ]);

  const addTeam = () => {
    const nextTeam = teamInput.trim();
    if (nextTeam && !teams.includes(nextTeam)) {
      setTeams([...teams, nextTeam]);
      setTeamInput("");
    }
  };

  const removeTeam = (team: string) => {
    setTeams(teams.filter((item) => item !== team));
  };

  const updateScheduleItem = (index: number, field: "time" | "activity", value: string) => {
    const nextSchedule = [...schedule];
    nextSchedule[index] = { ...nextSchedule[index], [field]: value };
    setSchedule(nextSchedule);
  };

  const addScheduleItem = () => {
    setSchedule([...schedule, { time: "", activity: "" }]);
  };

  const handleWallpaperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setWallpaper(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = {
      title,
      game,
      eventType,
      date,
      startTime,
      timezone,
      price: Number(price),
      status,
      description,
      teams,
      schedule,
      wallpaper: wallpaper ? wallpaper.name : null,
    };

    try {
      await fetchJson("/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      alert("Event created successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      alert(`Error uploading event: ${message}`);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>CREATE NEW EVENT</h1>
            <button className={styles.cancel} type="button" onClick={() => window.history.back()}>
              CANCEL
            </button>
          </div>
          <div className={styles.breadcrumb}>Upload / Creator Center / Events</div>
        </header>

        <form className={styles.formGrid} onSubmit={handleSubmit} encType="multipart/form-data">
          <div className={styles.fullWidth}>
            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              type="text"
              placeholder="Enter the title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="game">GAME</label>
            <select id="game" value={game} onChange={(e) => setGame(e.target.value)} required>
              <option value="">Select game</option>
              <option value="Game 1">Game 1</option>
              <option value="Game 2">Game 2</option>
              <option value="Game 3">Game 3</option>
            </select>
          </div>

          <div>
            <label htmlFor="eventType">EVENT TYPE</label>
            <select
              id="eventType"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              required
            >
              <option value="">Select type</option>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
            </select>
          </div>

          <div>
            <label htmlFor="date">DATE</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="startTime">START TIME</label>
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="timezone">TIME ZONE</label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              required
            >
              <option value="GMT +02">GMT +02</option>
              <option value="GMT +01">GMT +01</option>
              <option value="GMT +00">GMT +00</option>
            </select>
          </div>

          <div>
            <label htmlFor="price">PRICE (EUR)</label>
            <input
              id="price"
              type="number"
              placeholder="0.00 for free."
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              required
            />
          </div>

          <div className={styles.fullWidth}>
            <label htmlFor="status">STATUS</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="Upcoming">Upcoming</option>
              <option value="Live">Live</option>
            </select>
          </div>

          <div className={styles.fullWidth}>
            <label>EVENT WALLPAPER</label>
            <div className={styles.dropzone}>
              <input
                type="file"
                accept="image/*"
                onChange={handleWallpaperChange}
                style={{ display: "none" }}
                id="wallpaperInput"
              />
              <label
                htmlFor="wallpaperInput"
                className={styles.dropzoneContent}
                style={{ cursor: "pointer" }}
              >
                <span>Drag and drop to insert an image or click to upload.</span>
                <small>maximum size 8MB</small>
                {wallpaper && <p>Selected file: {wallpaper.name}</p>}
              </label>
            </div>
          </div>

          <div className={styles.fullWidth}>
            <label htmlFor="description">EVENT DESCRIPTION</label>
            <textarea
              id="description"
              placeholder="Describe your event..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className={styles.fullWidth}>
            <label>PARTICIPANT TEAMS</label>
            <div className={styles.teams}>
              <input
                id="teams"
                type="text"
                placeholder="Search teams..."
                value={teamInput}
                onChange={(e) => setTeamInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTeam())}
              />
              <div className={styles.tags}>
                {teams.map((team) => (
                  <span key={team} className={styles.tag}>
                    {team}
                    <button
                      type="button"
                      aria-label={`Remove ${team}`}
                      onClick={() => removeTeam(team)}
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.fullWidth}>
            <label>EVENT SCHEDULE</label>
            <div className={styles.scheduleList}>
              {schedule.map((item, index) => (
                <div key={index} className={styles.scheduleItem}>
                  <input
                    type="time"
                    value={item.time}
                    onChange={(e) => updateScheduleItem(index, "time", e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Activity title"
                    value={item.activity}
                    onChange={(e) => updateScheduleItem(index, "activity", e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>
            <button type="button" className={styles.addSchedule} onClick={addScheduleItem}>
              + Add new schedule item
            </button>
          </div>

          <footer
            className={styles.actions}
            style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}
          >
            <button type="button" className={styles.draft} onClick={() => alert("Draft saved.")}>
              SAVE AS DRAFT
            </button>
            <button type="submit" className={styles.upload} style={{ marginLeft: "auto" }}>
              UPLOAD EVENT
            </button>
          </footer>
        </form>
      </div>
    </>
  );
}
