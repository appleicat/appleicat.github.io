import { useState, useEffect } from 'react';
import { Link } from './_link';
export const Github = ({ children }) => {
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
          <div className="text-[0.5em]">
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
