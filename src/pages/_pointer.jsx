import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const usePointer = (element = { current: window }) => {
  const [pointer, setPointer] = useState({});
  useEffect(() => {
    const pointerMove = (event) => setPointer(event);
    element?.current.addEventListener('pointermove', pointerMove);
    return () =>
      element?.current.removeEventListener('pointermove', pointerMove);
  }, []);
  return pointer;
};

export const usePointerExist = (element = { current: window }) => {
  const [isExist, setIsExist] = useState(false);
  useEffect(() => {
    const pointerOut = (event) =>
      setIsExist(event.relatedTarget === null ? false : true);
    const pointerOver = (event) =>
      setIsExist(event.relatedTarget === null ? false : true);
    const pointerMove = () => setIsExist(true);
    element?.current.addEventListener('pointerout', pointerOut);
    element?.current.addEventListener('pointerover', pointerOver);
    element?.current.addEventListener('pointermove', pointerMove);
    return () => {
      element?.current.removeEventListener('pointerout', pointerOut);
      element?.current.removeEventListener('pointerover', pointerOver);
      element?.current.removeEventListener('pointermove', pointerMove);
    };
  }, []);
  return isExist;
};

export const Pointer = ({ size, color = 'white', hover }) => {
  const {
    clientX: x = window.innerWidth / 2,
    clientY: y = window.innerHeight / 2,
    target,
  } = usePointer();
  const hovered = target?.getAttribute(hover);
  return (
    <motion.div
      style={{
        backgroundColor: color,
        position: 'fixed',
        zIndex: 99999,
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        translateX: -size / 2,
        translateY: -size / 2,
      }}
      initial={{
        opacity: 0,
        scale: 0,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        height: size + 'px',
        width: size + 'px',
        borderRadius: '50%',
      }}
      animate={{
        opacity: usePointerExist() ? 1 : 0,
        scale: usePointerExist() ? 1 : 0,
        x: hovered ? target.getBoundingClientRect().left + size / 2 : x,
        y: hovered ? target.getBoundingClientRect().top + size / 2 : y,
        height: hovered
          ? target.getBoundingClientRect().height + 'px'
          : size + 'px',
        width: hovered
          ? target.getBoundingClientRect().width + 'px'
          : size + 'px',
        borderRadius: hovered
          ? window.getComputedStyle(target).borderRadius
          : '50%',
      }}
      transition={{
        type: 'spring',
        damping: 70,
        stiffness: 1000,
      }}
    />
  );
};
