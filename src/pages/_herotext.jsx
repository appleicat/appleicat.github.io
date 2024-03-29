import { motion } from 'framer-motion';
export const HeroText = ({ children, size }) => {
  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{
        duration: 1.5,
        ease: 'easeOut',
      }}
      className="w-full flex justify-evenly items-center font-thin font-['Melodrama'] opacity-0"
      style={{
        fontSize: size,
      }}
    >
      {children.split('').map((letter, key) => (
        <motion.div key={key}>{letter}</motion.div>
      ))}
    </motion.div>
  );
};
