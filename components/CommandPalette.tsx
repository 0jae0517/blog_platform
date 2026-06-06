'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)',
        zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '10vh'
      }} 
      onClick={() => setIsOpen(false)}
    >
      <div 
        style={{
          backgroundColor: '#161b22', width: '100%', maxWidth: '600px',
          borderRadius: '8px', border: '1px solid #30363d',
          boxShadow: '0 16px 32px rgba(0, 0, 0, 0.5)', overflow: 'hidden',
          margin: '0 16px'
        }} 
        onClick={e => e.stopPropagation()}
      >
        <div 
          style={{
            display: 'flex', alignItems: 'center', padding: '16px',
            borderBottom: '1px solid #30363d'
          }}
        >
          <Search size={20} color="#8b949e" style={{ marginRight: '12px' }} />
          <input 
            autoFocus
            type="text" 
            placeholder="아티클 검색..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              flex: 1, backgroundColor: 'transparent', border: 'none',
              color: '#eaeaea', fontSize: '1.1rem', outline: 'none'
            }}
          />
          <div 
            style={{
              fontSize: '0.8rem', color: '#8b949e', backgroundColor: '#21262d',
              padding: '2px 6px', borderRadius: '4px', border: '1px solid #30363d'
            }}
          >
            ESC
          </div>
        </div>
        <div style={{ padding: '16px', color: '#8b949e', fontSize: '0.9rem', minHeight: '100px' }}>
          {searchQuery ? `"${searchQuery}"에 대한 검색 결과가 없습니다.` : '검색어를 입력하고 아티클을 찾아보세요.'}
        </div>
      </div>
    </div>
  );
}
