import { useState, useEffect } from 'react';
import { Link } from './_link';
export const Repos = ({ children }) => {
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
        <div className="mx-auto w-1/2 flex flex-col gap-3">
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
