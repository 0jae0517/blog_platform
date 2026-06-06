import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>0_Log</Link>
        <div className={styles.links}>
          <Link href="/documentation" className={styles.link}>Documentation</Link>
          <Link href="/privacy" className={styles.link}>Privacy</Link>
          <Link href="/terms" className={styles.link}>Terms</Link>
          <Link href="/rss" className={styles.link}>RSS Feed</Link>
        </div>
        <p className={styles.copyright}>
          © 2024 0_Log Engine. Built for builders.
        </p>
      </div>
    </footer>
  );
}
