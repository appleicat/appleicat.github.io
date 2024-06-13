import { useRef } from 'react';
import { motion, useScroll, useTransform, easeInOut } from 'framer-motion';

const Link = ({
  href,
  children,
  className = 'cursor-none underline underline-offset-[0.3em] hover:no-underline transition-all inline-block whitespace-pre',
  ...props
}) => {
  return (
    <a className={className} href={href} data-hover-pointer {...props}>
      {children}
    </a>
  );
};

const GithubRepositories = ({ data }) => {
  return (
    <section className="flex flex-col gap-[1.618em]">
      {data?.user?.pinnedItems?.edges?.map((edge, key) => (
        <div key={key} className="flex flex-col gap-[0.35em]">
          <div className="flex flex-wrap items-baseline justify-start gap-[0.5em]">
            <div className="flex">
              <Link
                href={edge?.node?.owner?.url}
                className="cursor-none underline underline-offset-[0.3em] hover:no-underline transition-all inline-block whitespace-pre px-1 pb-0.5"
              >
                {edge?.node?.owner?.login}
              </Link>
              <div>/</div>
              <Link
                href={edge?.node?.url}
                className="cursor-none underline underline-offset-[0.3em] hover:no-underline transition-all inline-block whitespace-pre px-1 pb-0.5"
              >
                {edge?.node?.name}
              </Link>
            </div>
            <div className="flex flex-wrap gap-[0.5em]">
              {/* {edge?.node?.collaborators?.totalCount !==
              0 && (
              <div className="text-xs px-1 py-0.5">
                CODERS{' '}
                {edge?.node?.collaborators?.totalCount}
              </div>
            )} */}
              {edge?.node?.watchers?.totalCount !== 0 && (
                <div className="text-xs px-1 py-0.5">
                  WATCHERS {edge?.node?.watchers?.totalCount}
                </div>
              )}
              {edge?.node?.forks?.totalCount !== 0 && (
                <div className="text-xs px-1 py-0.5">
                  FORKS {edge?.node?.forks?.totalCount}
                </div>
              )}
              {edge?.node?.stargazers?.totalCount !== 0 && (
                <div className="text-xs px-1 py-0.5">
                  STARS {edge?.node?.stargazers?.totalCount}
                </div>
              )}
              {edge?.node?.homepageUrl && (
                <Link
                  className="cursor-none underline underline-offset-[0.3em] hover:no-underline transition-all inline-block whitespace-pre px-1 py-0.5 text-xs"
                  href={edge?.node?.homepageUrl}
                >
                  LINK&nbsp;&rarr;
                </Link>
              )}
            </div>
          </div>
          {edge?.node?.description && (
            <div className="pl-1 text-sm">{edge?.node?.description}</div>
          )}
          {edge?.node?.languages?.edges?.length !== 0 && (
            <div className="flex flex-wrap">
              {edge?.node?.languages?.edges?.map((eedge, key) => (
                <div key={key} className="uppercase flex text-xs px-1 py-0.5">
                  <div style={{ color: eedge?.node?.color }}>
                    {eedge?.node?.name}
                  </div>
                  <div>&nbsp;</div>
                  <div>
                    {(
                      (eedge?.size / edge?.node?.languages?.totalSize) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  <div>&nbsp;&nbsp;&nbsp;</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

const Collection = ({ collection }) => {
  return (
    <section className="flex flex-col gap-[1.618em]">
      {collection
        ?.filter((entry) => entry?.data?.show)
        ?.map((entry, key) => (
          <div key={key} className="flex flex-col">
            <Link
              className="text-[1em] text-pretty cursor-none underline underline-offset-[0.3em] hover:no-underline transition-all px-1.5 py-0.5 mb-0.5"
              href={`/${entry?.slug}`}
            >
              {entry?.data?.title ? entry?.data?.title : entry?.slug}
            </Link>
            {entry?.data?.tag && (
              <div className="flex flex-wrap px-1.5">
                {entry?.data?.tag?.map((tag, key) => (
                  <div key={key} className="text-[0.7em]">
                    {tag}&nbsp;&nbsp;&nbsp;
                  </div>
                ))}
              </div>
            )}
            {entry?.data?.description && (
              <div className="text-[0.9em] opacity-50 px-1.5">
                {entry?.data?.description}
              </div>
            )}
            {(entry?.data?.author || entry?.data?.date) && (
              <div className="flex flex-wrap opacity-50 px-1.5 items-baseline">
                {entry?.data?.date && (
                  <time className="text-[0.7em]">
                    {new Date(entry?.data?.date).toLocaleDateString('en-GB')}
                    &nbsp;&nbsp;&nbsp;
                  </time>
                )}
                {entry?.data?.author &&
                  entry?.data?.author?.map((author, key) => (
                    <span key={key} className="italic text-[0.85em]">
                      {author}&nbsp;&nbsp;&nbsp;
                    </span>
                  ))}
              </div>
            )}
          </div>
        ))}
    </section>
  );
};

const Background = ({ image }) => {
  return (
    <section className="fixed -z-10 overflow-hidden size-full">
      <img className="size-full object-cover" src={image} />
    </section>
  );
};

export default function Page({
  data,
  collection,
  backgroundImage,
  mdx,
  children,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  return (
    <>
      {backgroundImage && <Background image={backgroundImage} />}
      <header>
        <motion.section
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
            <section className="sticky top-0 h-[100dvh] overflow-hidden">
              <div className="absolute overflow-hidden bg-white h-full w-full text-black flex items-center justify-center">
                <motion.div
                  style={{
                    scale: useTransform(scrollYProgress, [0, 1], [1, 33], {
                      ease: easeInOut,
                    }),
                    opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0], {
                      ease: easeInOut,
                    }),
                  }}
                  className="h-full w-full absolute text-[3.5vmax]"
                >
                  <div className="h-full w-full flex flex-col justify-center items-center select-none">
                    <div className="flex justify-center items-center overflow-hidden w-full h-full">
                      <motion.div
                        animate={{ opacity: [0, 1] }}
                        transition={{
                          duration: 1.5,
                          ease: 'easeOut',
                        }}
                        className="w-full flex justify-evenly items-center font-thin font-['Melodrama'] opacity-0"
                      >
                        {(data?.user?.repository?.description
                          ? data?.user?.repository?.description
                          : ' '
                        )
                          .split('')
                          .map((letter, key) => (
                            <div key={key}>{letter}</div>
                          ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [0.15, 0.7],
                      [0, 1],
                      {
                        ease: easeInOut,
                      }
                    ),
                    scale: useTransform(
                      scrollYProgress,
                      [0.15, 0.9],
                      [0.8, 1],
                      {
                        ease: easeInOut,
                      }
                    ),
                    display: useTransform(
                      scrollYProgress,
                      [0, 0.15, 1],
                      ['none', 'none', 'flex'],
                      {
                        ease: easeInOut,
                      }
                    ),
                  }}
                  className="h-full w-full absolute text-[7vmin]"
                >
                  <div className="h-full w-full p-[10cqmin] flex flex-col justify-between select-none">
                    <div className="h-full flex flex-col justify-between">
                      <div className="text-justify">{data?.user?.bio}</div>
                    </div>
                    <div className="pt-[10cqmin] flex justify-between items-center">
                      <div className="flex items-baseline">
                        {data?.user?.name}
                        <div className="text-[0.44em]">
                          <Link href={data?.user?.url}>
                            {data?.user?.login}
                          </Link>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-full h-[11cqmin] aspect-square">
                        <img
                          className="h-full w-full aspect-square object-cover"
                          src={data?.user?.avatarUrl}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </section>
        </motion.section>
        <section className="h-[257.25vh] -z-50" />
      </header>
      <main className="px-[5cqmin]">
        <section className="mx-auto w-[clamp(50%+5cqmin,700px,100%)] text-[1.5rem] leading-relaxed text-pretty">
          <article>{children}</article>
        </section>
      </main>
      {collection?.filter((entry) => entry?.data?.show)?.length !== 0 && (
        <section className="min-[1000px]:hidden flex flex-col-reverse">
          <section className="px-[5cqmin] py-[max(5cqmin,64px)] bg-white text-black">
            <div className="flex flex-col gap-3 text-base">
              <div className="ml-1 mb-3.5 text-[2em]">Collection</div>
              <Collection collection={collection} />
            </div>
          </section>
        </section>
      )}
      {data?.user?.pinnedItems?.edges?.length !== 0 && (
        <section className="min-[700px]:hidden flex flex-col-reverse">
          <section className="px-[5cqmin] py-[max(5cqmin,64px)] bg-white text-black">
            <div className="flex flex-col gap-3 text-base">
              <div className="ml-1 mb-3.5 text-[2em]">Repositories</div>
              <GithubRepositories data={data} />
            </div>
          </section>
        </section>
      )}
      <footer>
        <section className="text-black bg-white">
          <section className="relative h-screen w-screen [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]">
            <section className="fixed h-screen w-screen inset-0">
              <section className="size-full p-[5cqmin] pt-[15vh] flex flex-col gap-[3cqmin] text-base">
                <section className="flex size-full px-1.5 gap-[5cqmin]">
                  <section className="flex flex-col justify-end gap-[1em]">
                    <div className="flex items-baseline">
                      {data?.user?.name && (
                        <div className="font-['Melodrama'] text-5xl">
                          {data?.user?.name}
                        </div>
                      )}
                      <Link
                        href={data?.user?.url}
                        className="cursor-none underline underline-offset-[0.3em] hover:no-underline transition-all inline-block whitespace-pre px-1 pb-0.5"
                      >
                        {data?.user?.login}
                      </Link>
                      {(data?.user?.followers?.totalCount !== 0 ||
                        data?.user?.following?.totalCount !== 0) && (
                        <div className="text-xs">
                          [&nbsp;{data?.user?.followers?.totalCount}
                          &nbsp;/&nbsp;{data?.user?.following?.totalCount}
                          &nbsp;]
                        </div>
                      )}
                      {data?.user?.status?.message && (
                        <div>&nbsp;·&nbsp;{data?.user?.status?.message}</div>
                      )}
                      {data?.user?.pronouns && (
                        <div className="opacity-30">
                          &nbsp;·&nbsp;{data?.user?.pronouns}
                        </div>
                      )}
                    </div>
                    {data?.user?.bio && <div>{data?.user?.bio}</div>}
                    {(data?.user?.location ||
                      data?.user?.company ||
                      data?.user?.isHireable) && (
                      <div className="flex gap-[1em]">
                        {data?.user?.location && (
                          <div>{data?.user?.location}</div>
                        )}
                        {data?.user?.company && (
                          <div>{data?.user?.company}</div>
                        )}
                        {data?.user?.isHireable && (
                          <div>AVAILABLE FOR HIRE</div>
                        )}
                      </div>
                    )}
                  </section>
                  {data?.user?.pinnedItems?.edges?.length !== 0 && (
                    <section className="max-[699px]:hidden flex flex-col justify-end gap-[1em]">
                      <div className="ml-1 mb-3.5 text-[2em]">Repositories</div>
                      <GithubRepositories data={data} />
                    </section>
                  )}
                  {collection?.filter((entry) => entry?.data?.show)?.length !==
                    0 && (
                    <section className="max-[999px]:hidden flex flex-col justify-end gap-[1em]">
                      <div className="ml-1 mb-3.5 text-[2em]">Collection</div>
                      <Collection collection={collection} />
                    </section>
                  )}
                </section>
                {(data?.user?.email ||
                  data?.user?.websiteUrl ||
                  data?.user?.socialAccounts?.edges?.length !== 0) && (
                  <section className="flex flex-wrap justify-start gap-[1em] uppercase text-xs">
                    {data?.user?.email && (
                      <Link
                        href={`mailto:${data?.user?.email}`}
                        className="cursor-none underline underline-offset-[0.3em] hover:no-underline transition-all inline-block whitespace-pre px-1.5 py-1"
                      >
                        {data?.user?.email}
                      </Link>
                    )}
                    {data?.user?.websiteUrl && (
                      <Link
                        href={data?.user?.websiteUrl}
                        className="cursor-none underline underline-offset-[0.3em] hover:no-underline transition-all inline-block whitespace-pre px-1.5 py-1"
                      >
                        {(data?.user?.websiteUrl).split('/')[2]}
                      </Link>
                    )}
                    {data?.user?.socialAccounts?.edges?.map((edge, key) => (
                      <Link
                        key={key}
                        href={edge?.node?.url}
                        className="cursor-none underline underline-offset-[0.3em] hover:no-underline transition-all inline-block whitespace-pre px-1.5 py-1"
                      >
                        {(edge?.node?.url).split('/')[2]}
                      </Link>
                    ))}
                  </section>
                )}
              </section>
            </section>
          </section>
        </section>
      </footer>
    </>
  );
}
