import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  easeInOut,
  easeIn,
} from 'framer-motion';
import { Github } from './_github';
import { HeroText } from './_herotext';
import { Link } from './_link';
export default function Page() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  return (
    <motion.section ref={ref} className="relative h-[350vh] cursor-none">
      <section className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1, 0.5], {
              ease: easeInOut,
            }),
            y: useTransform(scrollYProgress, [0.66, 1], ['0vh', '-60vh'], {
              ease: easeIn,
            }),
          }}
          className="absolute z-[1] overflow-hidden bg-white h-full w-full text-black text-[7vmin] flex items-center justify-center"
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
                <HeroText size="3.5vmax">kitty</HeroText>
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
            }}
            className="h-full w-full absolute"
          >
            <Github>appleicat</Github>
          </motion.div>
        </motion.div>
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.8, 0.95], [0, 1], {
              ease: easeInOut,
            }),
            scale: useTransform(scrollYProgress, [0.8, 0.95], [0.95, 1], {
              ease: easeInOut,
            }),
            y: useTransform(scrollYProgress, [0.8, 1], ['15%', '0%'], {
              ease: easeInOut,
            }),
          }}
          className="z-[0] h-full w-full flex justify-center items-center"
        >
          <div className="w-1/2 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <div className="w-full mb-4 ml-3">Hı.</div>
              <div className="w-full mb-4 ml-3">
                I'm frontend web developer.
              </div>
              <div className="w-full mb-4 ml-3">Already developed by me:</div>
              <div className="w-full flex flex-wrap gap-4">
                <div className="flex flex-col">
                  <div>
                    <Link href="https://appleicat.github.io/calendar/">
                      calendar →
                    </Link>
                  </div>
                  <div className="ml-1 text-white/70">
                    minimalistic
                    <br /> as a dumb phone,
                    <br /> nothing special.
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>
                    <Link href="https://appleicat.github.io/crypt/">
                      crypt →
                    </Link>
                  </div>
                  <div className="ml-1 text-white/70">
                    hashing, signing,
                    <br /> symmetric and asymmetric
                    <br /> cryptography.
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>
                    <Link href="https://appleicat.github.io/qrc/">qrc →</Link>
                  </div>
                  <div className="ml-1 text-white/70">
                    QRcode
                    <br /> generator
                    <br /> and reader.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.section>
  );
}
