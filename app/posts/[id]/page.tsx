import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ThumbsUp, Share2, Bookmark, Heart } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import styles from './page.module.css';

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    notFound();
  }

  const date = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Mock content and author data since it's not in the DB schema
  const authorName = "0Jae";
  const authorRole = "Senior Backend Engineer at 0_Log. Passionate about distributed systems, rust, and making observability less painful.";
  const authorAvatar = "https://ui-avatars.com/api/?name=0Jae&background=random";

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link href={`/?category=${post.category}`} className={styles.category}>
            {post.category}
          </Link>
          {post.tags && post.tags.filter((t: string) => t !== post.category).map((tag: string) => (
            <span key={tag}>
              <span className={styles.category} style={{ color: '#8b949e', margin: '0 8px' }}>•</span>
              <span className={styles.category} style={{ color: '#8b949e', textDecoration: 'none' }}>
                {tag}
              </span>
            </span>
          ))}
        </div>

        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.authorMeta}>
          <div className={styles.authorInfo}>
            <img src={authorAvatar} alt={authorName} width={40} height={40} className={styles.avatar} />
            <div>
              <span className={styles.authorName}>{authorName}</span>
              <span className={styles.postDate}>{date} • {post.read_time}</span>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button className={styles.actionBtn}><ThumbsUp size={20} /></button>
            <button className={styles.actionBtn}><Share2 size={20} /></button>
            <button className={styles.actionBtn}><Bookmark size={20} /></button>
          </div>
        </div>

        {/* Thumbnail space if required, though the screenshot doesn't show one at the top. We will show the image_url here */}
        <div className={styles.thumbnailContainer}>
          <Image src={post.image_url} alt={post.title} fill className={styles.thumbnail} />
        </div>

        <article className={styles.content}>
          <ReactMarkdown>{post.content || ''}</ReactMarkdown>
        </article>

        <div className={styles.authorBox}>
          <img src={authorAvatar} alt={authorName} width={64} height={64} className={styles.authorBoxAvatar} />
          <div className={styles.authorBoxContent}>
            <h3 className={styles.authorBoxName}>Written by {authorName}</h3>
            <p className={styles.authorBoxBio}>{authorRole}</p>
            <button className={styles.followBtn}>Follow on Twitter</button>
          </div>
        </div>

        <section className={styles.discussions}>
          <h3 className={styles.discussionsTitle}>Discussions (2)</h3>
          
          <textarea className={styles.commentInput} placeholder="Add to the discussion..."></textarea>
          <div style={{ overflow: 'hidden' }}>
            <button className={styles.postCommentBtn}>Post Comment</button>
          </div>

          <div className={styles.commentsList}>
            <div className={styles.comment}>
              <div className={styles.commentAvatar}>SJ</div>
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>Sarah Jenkins</span>
                  <span className={styles.commentTime}>2 hours ago</span>
                </div>
                <p className={styles.commentText}>
                  Great write-up. We recently migrated to OpenTelemetry and the context
                  propagation was definitely the trickiest part to get right across our Go and
                  Node services. Did you encounter issues with header case sensitivity in
                  older proxy setups?
                </p>
                <div className={styles.commentActions}>
                  <button className={styles.replyBtn}>Reply</button>
                  <button className={styles.replyBtn}><Heart size={14} /> 1</button>
                </div>
              </div>
            </div>

            <div className={styles.comment}>
              <div className={styles.commentAvatar}>MR</div>
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>Marcus Reed</span>
                  <span className={styles.commentTime}>5 hours ago</span>
                </div>
                <p className={styles.commentText}>
                  I strongly agree with the observability quote. It's too often treated as an
                  afterthought rather than a core requirement during the design phase.
                </p>
                <div className={styles.commentActions}>
                  <button className={styles.replyBtn}>Reply</button>
                  <button className={styles.replyBtn}><Heart size={14} /> 0</button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
