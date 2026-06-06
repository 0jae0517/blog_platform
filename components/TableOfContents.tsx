'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Regex to match markdown headings, e.g., ## Heading Text
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      // Simple slugify matching github/rehype-slug logic
      const id = text.toLowerCase().trim().replace(/[\s_]+/g, '-').replace(/[^\w\uAC00-\uD7AF-]/g, '');
      if (id) {
        items.push({ level, text, id });
      }
    }
    setToc(items);
  }, [content]);

  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div style={{
      position: 'sticky',
      top: '100px',
      paddingLeft: '2rem',
      borderLeft: '1px solid #30363d',
      maxHeight: 'calc(100vh - 120px)',
      overflowY: 'auto',
      minWidth: '200px'
    }}>
      <h4 style={{ color: '#eaeaea', fontSize: '1rem', marginBottom: '1rem', fontWeight: 'bold' }}>목차</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {toc.map((item, index) => (
          <li key={index} style={{ 
            marginLeft: `${(item.level - 1) * 12}px`,
            marginBottom: '0.75rem'
          }}>
            <a 
              href={`#${item.id}`}
              style={{
                color: activeId === item.id ? '#58a6ff' : '#8b949e',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color 0.2s',
                fontWeight: activeId === item.id ? 600 : 400
              }}
              onMouseOver={(e) => {
                if (activeId !== item.id) e.currentTarget.style.color = '#c9d1d9';
              }}
              onMouseOut={(e) => {
                if (activeId !== item.id) e.currentTarget.style.color = '#8b949e';
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
