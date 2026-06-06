import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import styles from './ArticleCard.module.css';

interface ArticleProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    image_url: string;
    read_time: string;
    created_at: string;
  };
}

export default function ArticleCard({ article }: ArticleProps) {
  const date = new Date(article.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/posts/${article.id}`} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageContainer}>
          <Image 
            src={article.image_url} 
            alt={article.title} 
            fill 
            className={styles.image} 
          />
          <span className={styles.categoryBadge}>{article.category}</span>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.excerpt}>{article.excerpt}</p>
          <div className={styles.meta}>
            <span className={styles.date}>{date}</span>
            <span className={styles.readTime}>
              <Clock size={14} className={styles.clockIcon} />
              {article.read_time}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
