import Link from 'next/link';
import { Search } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>0_Log</Link>
        <div className={styles.navLinks}>
          <Link href="/" className={`${styles.link} ${styles.active}`}>Explore</Link>
          <Link href="/tutorials" className={styles.link}>Tutorials</Link>
          <Link href="/changelog" className={styles.link}>Changelog</Link>
          <Link href="/write" className={styles.link}>Write</Link>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.searchContainer}>
          <Search size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Search articles..." className={styles.searchInput} />
        </div>
        <Link href="/login" className={styles.loginBtn}>Log In</Link>
        <Link href="/signup" className={styles.signupBtn}>Sign Up</Link>
      </div>
    </nav>
  );
}
