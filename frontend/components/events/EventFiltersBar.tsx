import styles from "../../styles/HomePage.module.css";

interface EventFiltersBarProps {
  games: string[];
}

export default function EventFiltersBar({ games }: EventFiltersBarProps) {
  return (
    <div className={styles.filtersBar}>
      <button className={styles.filterActive}>All</button>
      {games.map((game) => (
        <button key={game} className={styles.filterBtn}>
          {game}
        </button>
      ))}
      <div className={styles.rightFilters}>
        <input className={styles.filterInput} placeholder="Filter:" />
        <button className={styles.sortBtn}>Sort By</button>
        <input className={styles.searchInput} placeholder="Search" />
        <button className={styles.uploadBtn}>Upload</button>
      </div>
    </div>
  );
}
