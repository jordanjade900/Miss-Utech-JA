import React, { useState, useEffect } from 'react';
// CORRECTED: Changed "../../lib/utils" to "../lib/utils"
import { cn } from '../lib/utils';

interface TypewriterProps {
  text: string[];
  speed?: number;
  deleteSpeed?: number;
  waitTime?: number;
  className?: string;
  cursorChar?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 100,
  deleteSpeed = 50,
  waitTime = 2000,
  className,
  cursorChar = '|'
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = text[loopNum % text.length];
      
      if (isDeleting) {
        setDisplayText(currentFullText.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
      } else {
        setDisplayText(currentFullText.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }

      if (!isDeleting && currentIndex === currentFullText.length) {
        setTimeout(() => setIsDeleting(true), waitTime);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, loopNum, text, speed, deleteSpeed, waitTime]);

  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      <span className="animate-pulse ml-1">{cursorChar}</span>
    </span>
  );
};
