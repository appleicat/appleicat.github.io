import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, easeInOut } from 'framer-motion';

const HeroText = ({ children, size }) => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      setData(
        await (await fetch(`https://api.github.com/repos/${children}`)).json()
      );
    })();
  }, []);
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
      {(data ? (data.description ? data.description : ' ') : ' ')
        .split('')
        .map((letter, key) => (
          <motion.div key={key}>{letter}</motion.div>
        ))}
    </motion.div>
  );
};

const Github = ({ children }) => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      setData(
        await (await fetch(`https://api.github.com/users/${children}`)).json()
      );
    })();
  }, []);
  return (
    <div className="h-full w-full p-[10cqmin] flex flex-col justify-between select-none">
      <div className="flex justify-between">
        <div className="text-justify">{data?.bio}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-baseline">
          {data?.name}
          <div className="text-[0.44em]">
            <Link href={data?.html_url}>{data?.login}</Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-full h-[11cqmin] aspect-square">
          <img
            className="h-full w-full aspect-square object-cover"
            src={data?.avatar_url}
          />
        </div>
      </div>
    </div>
  );
};

const Background = ({ children }) => {
  return (
    <div className="fixed -z-10 overflow-hidden size-full">
      <img className="size-full object-cover" src={children} />
    </div>
  );
};

const Repos = ({ children }) => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      setData(
        await (
          await fetch(`https://api.github.com/users/${children}/repos`)
        ).json()
      );
    })();
  }, []);
  return (
    <>
      {Array.isArray(data) && (
        <div className="flex flex-col gap-3">
          <div className="mx-1 text-3xl">GitHub repositories</div>
          {data?.map((repo, key) => (
            <div key={key} className="flex">
              <div className="flex text-nowrap">
                <Link href={repo.html_url}>{repo.name} &rarr;</Link>
              </div>
              <div className="mx-1 opacity-70">{repo.description}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const Link = ({ href, children }) => {
  return (
    <a
      className="px-[5px] cursor-none underline underline-offset-[3.5px] hover:no-underline transition-all inline-block"
      href={href}
      data-hover-pointer
    >
      {children}
    </a>
  );
};

const Footer = ({ children }) => {
  return (
    <footer className="mx-auto w-1/2 p-[5cqmin] bg-white text-black">
      {children}
    </footer>
  );
};

export default function Page() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  return (
    <>
      {/* <Background></Background> */}
      <motion.header
        style={{
          scale: useTransform(scrollYProgress, [0, 1], [1, 0.5], {
            ease: easeInOut,
          }),
          y: useTransform(scrollYProgress, [0.66, 1], ['0vh', '-60vh'], {
            ease: easeInOut,
          }),
        }}
        className="fixed size-full overflow-hidden z-50"
      >
        <section ref={ref} className="relative h-[350vh] cursor-none">
          <section className="sticky top-0 h-screen overflow-hidden">
            <div className="absolute overflow-hidden bg-white h-full w-full text-black text-[7vmin] flex items-center justify-center">
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
            </div>
          </section>
        </section>
      </motion.header>
      <section className="h-[300vh] -z-50" />
      <section className="mx-auto w-1/2 py-[5cqmin]"></section>
      <Footer>
        <Repos>appleicat</Repos>
      </Footer>
    </>
  );
}
