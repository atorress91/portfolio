import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 100, delay = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    let timer;
    
    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(timer);
    }
    
    if (!isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex));
        setCurrentIndex(prevIndex => prevIndex + 1);
        
        if (currentIndex >= text.length) {
          setIsPaused(true);
        }
      }, speed);
    } 

    else {
      timer = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex));
        setCurrentIndex(prevIndex => prevIndex - 1);
        
        if (currentIndex <= 0) {
          setIsDeleting(false);
        }
      }, speed / 2); 
    }
    
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, isPaused, text, speed, delay]);
  
  return <span>{displayText}<span className="cursor">|</span></span>;
};

export default Typewriter;