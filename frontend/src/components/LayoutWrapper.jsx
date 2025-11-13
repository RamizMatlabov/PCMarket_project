'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Navigation = dynamic(() => import('./Navigation'), { ssr: false });

export default function LayoutWrapper({ children }) {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    // Update height on mount and window resize
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    // Also update when mobile menu opens/closes
    const observer = new MutationObserver(updateHeaderHeight);
    const header = document.querySelector('header');
    if (header) {
      observer.observe(header, { attributes: true, childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: `${headerHeight + 50}px` }}>
        {children}
      </main>
    </>
  );
}