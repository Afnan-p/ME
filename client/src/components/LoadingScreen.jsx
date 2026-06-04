import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const statements = [
  "Building Modern Web Applications",
  "Creating Scalable SaaS Products",
  "Transforming Ideas Into Reality",
  "Founder & Problem Solver"
];

const LoadingScreen = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % statements.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Total loading time: 3.5 seconds
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center z-10 w-full max-w-md px-6 text-center">
        
        {/* Animated Text Container */}
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-display font-bold tracking-[0.2em] text-white flex items-center justify-center"
          >
            AFNAN
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-[10px] md:text-xs font-medium tracking-[0.4em] text-white uppercase mb-8"
        >
          FULL STACK DEVELOPER • FOUNDER
        </motion.div>

        {/* Rotating Text */}
        <motion.div
          className="h-6 md:h-8 mb-12 relative w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-xs md:text-sm font-sans text-muted absolute inset-0 flex items-center justify-center"
            >
              {statements[index]}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Loading Progress Line */}
        <div className="w-48 md:w-64 h-[2px] bg-border overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
          />
        </div>

      </div>
    </motion.div>
  );
};

export default LoadingScreen;
