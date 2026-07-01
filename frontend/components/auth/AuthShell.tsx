import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "../../styles/AuthShell.module.css";

interface AuthShellProps {
  title: string;
  eyebrow: string;
  blurb: string;
  footerText: string;
  footerHref: string;
  footerLabel: string;
  children: ReactNode;
}

export default function AuthShell({
  title,
  eyebrow,
  blurb,
  footerText,
  footerHref,
  footerLabel,
  children,
}: AuthShellProps) {
  return (
    <div className={styles.shell}>
      <aside className={styles.visualPane}>
        <Image
          src="/img/Background.png"
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 100vw, 45vw"
          className={styles.backgroundImage}
        />
        <div className={styles.overlay} />
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2>{title}</h2>
          <p>{blurb}</p>
        </div>
      </aside>

      <section className={styles.formPane}>
        <h1 className={styles.title}>eSports System</h1>
        {children}
        <div className={styles.footer}>
          {footerText} <Link href={footerHref}>{footerLabel}</Link>
        </div>
      </section>
    </div>
  );
}
