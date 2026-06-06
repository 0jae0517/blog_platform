import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          깊은 집중.<br />
          <span className={styles.highlight}>깔끔한 코드.</span>
        </h1>
        <p className={styles.subtitle}>
          고성능 시스템을 구축하기 위한 고급 아키텍처 패턴, 함수형 패러다임, 그리고 엔지니어링의 뒷이야기를 탐구합니다. 빌더를 위해 만들어졌습니다.
        </p>
        <div className={styles.actions}>
          <button className={styles.primaryBtn}>Read Latest</button>
          <button className={styles.secondaryBtn}>Subscribe <span>⚲</span></button>
        </div>
      </div>
    </section>
  );
}
