import React, { useEffect, useState } from 'react'

interface Iwindow {
  width: number
  height: number
}

function getWindowDimensions(): Iwindow {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  } as Iwindow
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<Iwindow>(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}