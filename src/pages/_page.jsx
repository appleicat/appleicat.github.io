import { useRef } from 'react';
import { motion, useScroll, useTransform, easeInOut } from 'framer-motion';
import { Github } from './_github';
import { HeroText } from './_herotext';
export default function Page() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  return (
    <motion.section
      ref={ref}
      className="relative h-[350vh] cursor-none"
    >
      <section className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1, 0.5], {
              ease: easeInOut,
            }),
            y: useTransform(scrollYProgress, [0.77, 1], ['0vh', '-60vh'], {
              ease: easeInOut,
            }),
          }}
          className="absolute z-[1] overflow-hidden bg-white h-full w-full text-black text-[7vmin] flex items-center justify-center"
        >
          <motion.div
            style={{
              scale: useTransform(scrollYProgress, [0, 1], [1, 33], {
                ease: easeInOut,
              }),
              opacity: useTransform(scrollYProgress, [0.1, 0.5], [1, 0], {
                ease: easeInOut,
              }),
              filter: useTransform(
                scrollYProgress,
                [0.1, 0.5],
                ['blur(0px)', 'blur(3px)'],
                {
                  ease: easeInOut,
                }
              ),
            }}
            className="h-full w-full absolute"
          >
            <div className="h-full w-full flex flex-col justify-center items-center select-none">
              <div className="flex justify-center items-center overflow-hidden w-full h-full">
                <HeroText size="3.5vmax">kitty</HeroText>
              </div>
            </div>
          </motion.div>
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.4, 0.77], [0, 1], {
                ease: easeInOut,
              }),
              scale: useTransform(scrollYProgress, [0.4, 0.9], [0.9, 1], {
                ease: easeInOut,
              }),
            }}
            className="h-full w-full absolute"
          >
            <Github>appleicat</Github>
          </motion.div>
        </motion.div>
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.9, 0.95], [0, 1], {
              ease: easeInOut,
            }),
            scale: useTransform(scrollYProgress, [0.9, 0.95], [0.97, 1], {
              ease: easeInOut,
            }),
          }}
          className="z-[0] h-full w-full flex justify-center items-center"
        >
          <div className="w-1/2 flex flex-col justify-center items-center">
            <div>Design. Develop. Ship.</div>
          </div>
        </motion.div>
      </section>
    </motion.section>
  );
}
