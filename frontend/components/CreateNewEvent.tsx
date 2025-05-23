import React from 'react'
import Link from 'next/link'
import styles from '../styles/CreateNewEvent.module.css'

export default function CreateNewEvent() {
  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navLogo}>eSports System</Link>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/live" className={styles.navLink}>Live</Link>
          <Link href="/upcoming" className={styles.navLink}>Upcoming</Link>
          <Link href="/popular" className={styles.navLink}>Popular</Link>
          <Link href="/history" className={styles.navLink}>History</Link>
        </div>
        <div className={styles.navActions}>
            <button className={styles.iconButton}>
                <img src="/img/notification.png" alt="Notifications" />
            </button>
            <button className={styles.iconButton}>
                <img src="/img/profile.png" alt="Profile" />
            </button>
            <button className={styles.iconButton}>
                <img src="/img/profile.png" alt="Profile" />
            </button>
        </div>
      </nav>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>CREATE NEW EVENT</h1>
            <button className={styles.cancel}>CANCEL</button>
          </div>
          <div className={styles.breadcrumb}>Upload / Creator Center / Events</div>
        </header>

        <form className={styles.formGrid}>
          <div className={styles.fullWidth}>
            <label htmlFor="title">TITLE</label>
            <input id="title" type="text" placeholder="Enter the title…" />
          </div>

          <div>
            <label htmlFor="game">GAME</label>
            <select id="game"><option>Select game</option></select>
          </div>
          <div>
            <label htmlFor="eventType">EVENT TYPE</label>
            <select id="eventType"><option>Select type</option></select>
          </div>

          <div>
            <label htmlFor="date">DATE</label>
            <input id="date" type="date" />
          </div>
          <div>
            <label htmlFor="startTime">START TIME</label>
            <input id="startTime" type="time" />
          </div>

          <div>
            <label htmlFor="timezone">TIME ZONE</label>
            <select id="timezone"><option>GMT +02</option></select>
          </div>
          <div>
            <label htmlFor="price">PRICE (€)</label>
            <input id="price" type="number" placeholder="0.00 for free." step="0.01" />
          </div>

          <div className={styles.fullWidth}>
            <label htmlFor="status">STATUS</label>
            <select id="status"><option>Upcoming</option></select>
          </div>

          <div className={styles.fullWidth}>
            <label>EVENT WALLPAPER</label>
            <div className={styles.dropzone}>
              <div className={styles.dropzoneContent}>
                <span>Drag and drop to insert an image or click to upload.</span>
                <small>maximum size 8MB</small>
              </div>
            </div>
          </div>

          <div className={styles.fullWidth}>
            <label htmlFor="description">EVENT DESCRIPTION</label>
            <textarea id="description" placeholder="Describe your event…" />
          </div>

          <div className={styles.fullWidth}>
            <label htmlFor="teams">PARTICIPANT TEAMS</label>
            <div className={styles.teams}>
              <input id="teams" type="text" placeholder="Search teams…" />
              <div className={styles.tags}>
                <span className={styles.tag}>Team 1<button aria-label="Remove Team 1">×</button></span>
                <span className={styles.tag}>Team 2<button aria-label="Remove Team 2">×</button></span>
                <span className={styles.tag}>Team 3<button aria-label="Remove Team 3">×</button></span>
              </div>
            </div>
          </div>

          <div className={styles.fullWidth}>
            <label>EVENT SCHEDULE</label>
            <div className={styles.scheduleList}>
              <div className={styles.scheduleItem}>
                <input type="time" defaultValue="06:00" />
                <input type="text" placeholder="Activity title" />
              </div>
              <div className={styles.scheduleItem}>
                <input type="time" defaultValue="06:30" />
                <input type="text" placeholder="Activity title" />
              </div>
            </div>
            <button type="button" className={styles.addSchedule}>+ Add new schedule item</button>
          </div>
        </form>

        <footer className={styles.actions}>
          <button className={styles.draft}>SAVE AS DRAFT</button>
          <button className={styles.upload}>UPLOAD EVENT</button>
        </footer>
      </div>
    </>
  )
}
