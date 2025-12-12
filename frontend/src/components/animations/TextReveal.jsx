'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export const TextReveal = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const TextGenerateEffect = ({ words, className = '' }) => {
  const wordsArray = typeof words === 'string' ? words.split(' ') : words;
  const [displayedWords, setDisplayedWords] = useState([]);

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < wordsArray.length) {
        setDisplayedWords(wordsArray.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [wordsArray]);

  return (
    <div className={className}>
      {displayedWords.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {word}
          {index < wordsArray.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </div>
  );
};

