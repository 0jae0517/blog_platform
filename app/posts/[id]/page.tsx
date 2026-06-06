import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import { ThumbsUp, Share2, Bookmark, Heart } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ReadingProgressBar from '../../../components/ReadingProgressBar';
import TableOfContents from '../../../components/TableOfContents';
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
  
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const calculatedReadTime = post.read_time || `${Math.max(1, Math.ceil(wordCount / 200))}분 소요`;

  return (
    <div className={styles.page}>
      <ReadingProgressBar />
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
              <span className={styles.postDate}>{date} • {calculatedReadTime}</span>
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

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', position: 'relative' }}>
          <article className={styles.content} style={{ flex: 1, minWidth: 0 }}>
            <ReactMarkdown rehypePlugins={[rehypeSlug]}>{post.content || ''}</ReactMarkdown>
          </article>

          <aside style={{ width: '250px', flexShrink: 0, display: 'none' }} className="md:block">
            <TableOfContents content={post.content || ''} />
          </aside>
        </div>

        <div className={styles.authorBox}>
          <img src={authorAvatar} alt={authorName} width={64} height={64} className={styles.authorBoxAvatar} />
          <div className={styles.authorBoxContent}>
            <h3 className={styles.authorBoxName}>작성자: {authorName}</h3>
            <p className={styles.authorBoxBio}>{authorRole}</p>
            <button className={styles.followBtn}>X(Twitter)에서 팔로우</button>
          </div>
        </div>

        <section className={styles.discussions}>
          <h3 className={styles.discussionsTitle}>댓글 및 토론 (2)</h3>
          
          <textarea className={styles.commentInput} placeholder="자유롭게 의견을 남겨주세요..."></textarea>
          <div style={{ overflow: 'hidden' }}>
            <button className={styles.postCommentBtn}>댓글 작성</button>
          </div>

          <div className={styles.commentsList}>
            <div className={styles.comment}>
              <div className={styles.commentAvatar}>SJ</div>
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>Sarah Jenkins</span>
                  <span className={styles.commentTime}>2시간 전</span>
                </div>
                <p className={styles.commentText}>
                  훌륭한 글입니다. 최근에 OpenTelemetry로 마이그레이션했는데,
                  Go와 Node 서비스 간의 컨텍스트 전파를 제대로 맞추는 것이 가장 까다로웠습니다.
                  오래된 프록시 설정에서 헤더 대소문자 구분 문제가 발생하지는 않으셨나요?
                </p>
                <div className={styles.commentActions}>
                  <button className={styles.replyBtn}>답글</button>
                  <button className={styles.replyBtn}><Heart size={14} /> 1</button>
                </div>
              </div>
            </div>

            <div className={styles.comment}>
              <div className={styles.commentAvatar}>MR</div>
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>Marcus Reed</span>
                  <span className={styles.commentTime}>5시간 전</span>
                </div>
                <p className={styles.commentText}>
                  옵저버빌리티에 대한 부분 전적으로 동의합니다. 설계 단계에서 핵심 요구사항으로
                  다뤄지기보다는 나중에 덧붙이는 경우가 너무 많죠.
                </p>
                <div className={styles.commentActions}>
                  <button className={styles.replyBtn}>답글</button>
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
