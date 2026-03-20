import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// CORRECTED: Path goes up one level to src/ then into ui/ with exact lowercase filename
import { ShaderLines } from '../ui/shader-lines'; 
import { useReveal } from '../context/RevealContext';

interface RevealOverlayProps {
  children: React.ReactNode;
}

export const RevealOverlay: React.FC<RevealOverlayProps> = ({ children }) => {
  const { isRevealed, setIsRevealed } = useReveal();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-rich-black flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0">
              <ShaderLines />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative z-10 text-center px-4"
            >
              <h2 className="text-royal-gold text-2xl md:text-4xl font-light tracking-[0.2em] uppercase mb-8">
                Experience the Elements
              </h2>
              <button
                onClick={() => setIsRevealed(true)}
                className="group relative px-8 py-3 bg-transparent border border-royal-gold/30 hover:border-royal-gold text-royal-gold transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10 font-light tracking-widest uppercase text-sm">
                  Enter Gallery
                </span>
                <div className="absolute inset-0 bg-royal-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ 
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : 20
        }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
