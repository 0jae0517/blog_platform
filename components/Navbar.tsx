import Link from 'next/link';
import { Search } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>0_Log</Link>
          <div className={styles.navLinks}>
            <Link href="/" className={`${styles.link} ${styles.active}`}>아티클</Link>
            <Link href="/tutorials" className={styles.link}>시리즈</Link>
            <Link href="/changelog" className={styles.link}>릴리즈 노트</Link>
            <Link href="/write" className={styles.link}>새 글 작성</Link>
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <Search size={16} className={styles.searchIcon} />
            <input type="text" placeholder="검색 (Cmd + K)..." className={styles.searchInput} />
          </div>
          <Link href="/login" className={styles.loginBtn}>로그인</Link>
          <Link href="/signup" className={styles.signupBtn}>시작하기</Link>
        </div>
      </div>
    </nav>
  );
}
