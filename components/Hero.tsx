import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          몰입의 순간,<br />
          <span className={styles.highlight}>견고한 코드.</span>
        </h1>
        <p className={styles.subtitle}>
          성능의 한계를 뛰어넘는 시스템 아키텍처, 그리고 개발자들의 치열한 고민의 흔적. 더 나은 소프트웨어를 고민하는 모든 빌더(Builder)들을 위해 기록합니다.
        </p>
        <div className={styles.actions}>
          <button className={styles.primaryBtn}>최신 아티클 읽기</button>
          <button className={styles.secondaryBtn}>뉴스레터 구독 <span>✉</span></button>
        </div>
      </div>
    </section>
  );
}
