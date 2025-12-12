'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export const MovingBorder = ({ children, className = '', borderColor = 'blue' }) => {
  return (
    <motion.div
      className={`relative inline-block overflow-hidden ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)`,
        }}
        variants={{
          initial: { x: '-100%' },
          hover: { x: '100%' },
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      <div className="relative bg-slate-700/50 backdrop-blur-sm">
        {children}
      </div>
    </motion.div>
  );
};

export const HoverBorderGradient = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)',
          backgroundSize: '200% 100%',
        }}
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1, backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] },
        }}
        transition={{ duration: 0.5 }}
      />
      <div className="relative bg-slate-800 rounded-lg p-[2px]">
        {children}
      </div>
    </motion.div>
  );
};

export const StatefulButton = ({ children, onClick, disabled = false, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    try {
      await onClick?.();
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          ⏳
        </motion.div>
      ) : isSuccess ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          ✓
        </motion.div>
      ) : (
        children
      )}
    </motion.button>
  );
};

