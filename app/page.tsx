'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';
import { createClient } from '@/utils/supabase/client';
import { ChevronDown } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const supabase = createClient();
  const POSTS_PER_PAGE = 3;

  const fetchPosts = async (currentCategory: string | null, currentPage: number) => {
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (currentCategory) {
      query = query.eq('category', currentCategory);
    }

    const from = (currentPage - 1) * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;

    const { data, count, error } = await query.range(from, to);

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      if (currentPage === 1) {
        setPosts(data || []);
      } else {
        setPosts((prev) => [...prev, ...(data || [])]);
      }
      
      setHasMore(count !== null && (from + (data?.length || 0)) < count);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts(activeCategory, 1);
    setPage(1);
  }, [activeCategory]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(activeCategory, nextPage);
  };

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const categories = ["Rust", "Architecture", "WebAssembly"];

  return (
    <div className={styles.main}>
      <Navbar />
      <Hero />
      
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>최신 인사이트</h2>
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button 
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && page === 1 ? (
          <p className={styles.emptyState}>아티클을 불러오는 중입니다...</p>
        ) : (
          <>
            <div className={styles.grid}>
              {posts.map((post) => (
                <ArticleCard key={post.id} article={post} />
              ))}
              {posts.length === 0 && !loading && (
                <div className={styles.emptyState}>아직 등록된 아티클이 없습니다.</div>
              )}
            </div>
            
            {hasMore && (
              <div className={styles.loadMoreContainer}>
                <button className={styles.loadMoreBtn} onClick={loadMore} disabled={loading}>
                  {loading ? '불러오는 중...' : '아티클 더 보기'} <ChevronDown size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
