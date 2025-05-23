// HomePage.tsx
import React from 'react'
import Link from 'next/link'
import styles from '../styles/HomePage.module.css'

export default function HomePage() {
  return (
    <div className={`${styles.pageWrapper} ${styles.bodyBackground}`}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navLogo}>eSports System</Link>
        <div className={styles.navLinks}>
          <Link href="/" className={`${styles.navLink} ${styles.active}`}>Home</Link>
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

      <div className={styles.filtersBar}>
        <button className={styles.filterActive}>Όλα</button>
        {['League of Legends', 'Valorant', 'CS:GO', 'Dota 2'].map(game => (
          <button key={game} className={styles.filterBtn}>{game}</button>
        ))}
        <div className={styles.rightFilters}>
          <input className={styles.filterInput} placeholder="Filter:" />
          <button className={styles.sortBtn}>Sort By</button>
          <input className={styles.searchInput} placeholder="Search" />
          <button className={styles.uploadBtn}>Upload</button>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>LIVE EVENTS</h2>
        <div className={styles.cardsGrid}>
          {[
            { title: 'World Championship Finals 2025', game: 'League of Legends', viewers: '32.4K', price: 'FREE', img: 'lol' },
            { title: 'Valorant Finals Tokyo', game: 'Valorant', viewers: '18.7K', price: '€4.99', img: 'home-valorant' },
            { title: 'CS:GO Championship', game: 'CS:GO', viewers: '45.2K', price: 'FREE', img: 'home-css' },
          ].map(({ title, game, viewers, price, img }) => (
            <div key={title} className={styles.card}>
              <img src={`/img/${img}.png`} alt={title} className={styles.cardImage} />
              <span className={styles.liveTag}>Live</span>
              <div className={styles.cardBody}>
                <h3>{title}</h3>
                <p className={styles.cardGame}>🎮 {game}</p>
                <div className={styles.cardMeta}>
                  <span>{viewers} viewers</span>
                  <span className={styles.cardPrice}>{price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>UPCOMING EVENTS</h2>
        <div className={styles.cardsGrid}>
          {[
            { title: 'Dota 2 The International', game: 'Dota 2', date: '15 Jun 2025, 18:00', price: '€9.99', img: 'home-data2' },
            { title: 'Rocket League World Cup', game: 'Rocket League', date: '17 Jun 2025, 18:00', price: 'FREE', img: 'home-rocket' },
            { title: 'Fortnite Champion Series', game: 'Fortnite', date: '5 Νοv 2025, 17:00', price: '€2.99', img: 'home-fortnite' },
            { title: 'Fortnite Champion Series', game: 'Fortnite', date: '5 Νοv 2025, 17:00', price: 'FREE', img: 'home-f' },
          ].map(({ title, game, date, price, img }) => (
            <div key={title + date} className={styles.card}>
              <img src={`/img/${img}.png`} alt={title} className={styles.cardImage} />
              <div className={styles.cardBody}>
                <h3>{title}</h3>
                <p className={styles.cardGame}>🎮 {game}</p>
                <div className={styles.cardMeta}>
                  <span>{date}</span>
                  <span className={styles.cardPrice}>{price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
