'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Navigation = dynamic(() => import('./Navigation'), { ssr: false });

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    const headerObserver = new MutationObserver(updateHeaderHeight);

    const tryAttach = () => {
      const h = document.querySelector('header');
      if (h) {
        updateHeaderHeight();
        headerObserver.observe(h, { attributes: true, childList: true, subtree: true });
        return true;
      }
      return false;
    };

    if (!tryAttach()) {
      const bodyObserver = new MutationObserver(() => {
        if (tryAttach()) {
          bodyObserver.disconnect();
        }
      });
      bodyObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      headerObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Navigation />
      <motion.main
        style={{ paddingTop: headerHeight }}
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {children}
      </motion.main>
    </>
  );
}
