
import { useState, useEffect } from 'react'

function getSize() {
  return {
    mobile: window.innerWidth < 768,
  };
}

export default function useResponsive() {
  let [windowSize, setWindowSize] = useState(getSize());

  function handleResize() {
    setWindowSize(getSize());
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}