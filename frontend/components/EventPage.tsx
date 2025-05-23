import React from 'react'
import Link from 'next/link'
import styles from '../styles/EventPage.module.css'

export default function EventPage() {
  return (
    <div className={styles.pageWrapper}>
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
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <span className={styles.heroTag}>LIVE NOW</span>
        <h1 className={styles.heroTitle}>World Championship Finals 2025</h1>
        <div className={styles.heroMeta}>
          <span className={styles.pill}>League of Legends</span>
          <span className={styles.pill}>15 June 2025</span>
          <span className={styles.pill}>18:00 – 22:00 (EEST)</span>
        </div>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn}>Watch Now</button>
          <button className={styles.outlineBtn}>Favorite</button>
        </div>
        <button className={styles.freeBadge}>FREE OF CHARGE</button>
      </section>

  
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.videoContainer}>
            <img
              src="/img/video.png"
              alt="Live event preview"
              className={styles.videoPlaceholder}
            />
            <div className={styles.videoFooter}>
              <span className={styles.viewers}>45,328 viewers</span>
              <button className={styles.shareBtn}>Share</button>
            </div>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>EVENT DESCRIPTION</h2>
            <p className={styles.paragraph}>
              The League of Legends World Championship (commonly abbreviated as Worlds) is the annual professional League of Legends world championship tournament hosted by Riot Games and is the culmination of each season. Teams compete for the champion title, the 44‑pound (20‑kilogram) Summoner’s Cup, and a multi‑million‑dollar championship prize. In 2018, the final was watched by 99.6 million people, breaking 2017’s final’s viewer record.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>TEAMS</h2>
            <div className={styles.teamsRow}>
              <div className={styles.teamCard}>
                <div className={styles.teamAvatar}>T1</div>
                <div className={styles.teamName}>Team 1</div>
                <button className={styles.outlineBtn}>VIEW TEAM</button>
              </div>
              <div className={styles.vs}>VS</div>
              <div className={styles.teamCard}>
                <div className={styles.teamAvatar}>T2</div>
                <div className={styles.teamName}>Team 2</div>
                <button className={styles.outlineBtn}>VIEW TEAM</button>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>SCHEDULE</h2>
            <ul className={styles.scheduleList}>
              {[
                ['18:00 – 18:30', 'Opening ceremony'],
                ['18:30 – 19:30', 'Game 1'],
                ['19:30 – 20:30', 'Game 2'],
                ['20:30 – 21:30', 'Game 3'],
                ['21:30 – 22:00', 'Closing ceremony & awards']
              ].map(([time, desc]) => (
                <li key={time} className={styles.scheduleItem}>
                  <span className={styles.scheduleTime}>{time}</span>
                  <span className={styles.scheduleDesc}>{desc}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.section}>
            <h3 className={styles.sidebarTitle}>RELATED EVENTS</h3>
            <ul className={styles.relatedList}>
              <li className={styles.relatedItem}>
                <img
                  src="/img/valorant.png"
                  alt="Valorant Finals Tokyo"
                  className={styles.relatedThumb}
                />
                <div>
                  <strong>Valorant Finals Tokyo</strong>
                  <div className={styles.relatedTag}>Valorant</div>
                </div>
              </li>
              <li className={styles.relatedItem}>
                <img
                  src="/img/minecraft.png"
                  alt="Minecraft tournament"
                  className={styles.relatedThumb}
                />
                <div>
                  <strong>Minecraft tournament</strong>
                  <div className={styles.relatedTag}>Minecraft</div>
                </div>
              </li>
              <li className={styles.relatedItem}>
                <img
                  src="/img/csgo.png"
                  alt="CS:GO Major Championship"
                  className={styles.relatedThumb}
                />
                <div>
                  <strong>CS:GO Major Championship</strong>
                  <div className={styles.relatedTag}>CS:GO</div>
                </div>
              </li>
            </ul>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sidebarTitle}>VIEW ANALYTICS</h3>
            <div className={styles.analyticsItem}>
              <strong>Highest view count</strong>
              <p>245,328 viewers (2022 Finals)</p>
            </div>
            <div className={styles.analyticsItem}>
              <strong>#watchingWCF on Twitter</strong>
              <p>45,832 tweets</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
