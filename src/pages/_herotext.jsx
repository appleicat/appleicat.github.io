import { motion } from 'framer-motion';
export const HeroText = ({ children, size }) => {
  return (
    <motion.div
      animate={{ filter: ['blur(10px)', 'blur(0px)'] }}
      transition={{
        duration: 1.3,
        ease: 'easeOut',
      }}
      className="w-full flex justify-evenly items-center"
      style={{
        fontSize: size,
      }}
    >
      {children.split('').map((letter, key) => (
        <motion.div
          animate={{
            rotateY: ['90deg', '0deg'],
          }}
          transition={{ duration: 1.3, ease: 'easeOut', delay: 0.15 }}
          key={key}
        >
          {letter}
        </motion.div>
      ))}
    </motion.div>
  );
};
