import { useRef } from 'react';
import { motion, useScroll, useTransform, easeInOut } from 'framer-motion';
import { Github } from './_github';
import { HeroText } from './_herotext';
import { Repos } from './_repos';
import { Link } from './_link';
export default function Page() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  return (
    <>
      <header className="fixed size-full">
        <motion.section ref={ref} className="relative h-[350vh] cursor-none">
          <section className="sticky top-0 h-screen overflow-hidden">
            <motion.div
              style={{
                scale: useTransform(scrollYProgress, [0, 1], [1, 0.5], {
                  ease: easeInOut,
                }),
                y: useTransform(scrollYProgress, [0.66, 1], ['0vh', '-60vh'], {
                  ease: easeInOut,
                }),
              }}
              className="absolute overflow-hidden bg-white h-full w-full text-black text-[7vmin] flex items-center justify-center"
            >
              <motion.div
                style={{
                  scale: useTransform(scrollYProgress, [0, 1], [1, 33], {
                    ease: easeInOut,
                  }),
                  opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0], {
                    ease: easeInOut,
                  }),
                }}
                className="h-full w-full absolute"
              >
                <div className="h-full w-full flex flex-col justify-center items-center select-none">
                  <div className="flex justify-center items-center overflow-hidden w-full h-full">
                    <HeroText size="3.5vmax">
                      appleicat/appleicat.github.io
                    </HeroText>
                  </div>
                </div>
              </motion.div>
              <motion.div
                style={{
                  opacity: useTransform(scrollYProgress, [0.15, 0.7], [0, 1], {
                    ease: easeInOut,
                  }),
                  scale: useTransform(scrollYProgress, [0.15, 0.9], [0.8, 1], {
                    ease: easeInOut,
                  }),
                  display: useTransform(
                    scrollYProgress,
                    [0, 0.15, 1],
                    ['none', 'none', 'flex'],
                    {
                      ease: easeInOut,
                    }
                  ),
                }}
                className="h-full w-full absolute"
              >
                <Github>appleicat</Github>
              </motion.div>
            </motion.div>
          </section>
        </motion.section>
      </header>
      <section className="h-[300vh]" />
      <section>
        <Repos>appleicat</Repos>
      </section>
      <section className="h-1/3" />
    </>
  );
}
