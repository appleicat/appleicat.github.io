import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const useTime = (refresh = 1000) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), refresh);
    return () => clearInterval(interval);
  }, [refresh]);
  return now;
};

const Arrow = ({ width, height, color, rotate, ease, duration }) => {
  return (
    <motion.section
      className="flex flex-col absolute rounded-full overflow-hidden"
      initial={{ rotate }}
      animate={{ rotate }}
      transition={{ ease, duration: duration / 1000 }}
    >
      <div
        style={{
          width,
          height,
          backgroundColor: color,
        }}
      />
      <div style={{ width, height }} />
    </motion.section>
  );
};

export const Clock = ({
  refresh = 1000,
  time = useTime(refresh),
  ease = 'linear',
  arrowSecondsEase = ease,
  arrowMinutesEase = ease,
  arrowHoursEase = ease,
  duration = '1000',
  arrowSecondsDuration = duration,
  arrowMinutesDuration = duration,
  arrowHoursDuration = duration,
  size = '100%',
  color = 'white',
  arrowSecondsColor = color,
  arrowMinutesColor = color,
  arrowHoursColor = color,
  border = `1cqmin`,
  arrowHoursHeight = `25cqmin`,
  arrowMinutesHeight = `35cqmin`,
  arrowSecondsHeight = `45cqmin`,
  arrowHoursWidth = `1.5cqmin`,
  arrowMinutesWidth = `1cqmin`,
  arrowSecondsWidth = `0.5cqmin`,
  centerDotSize = `3cqmin`,
  centerDotColor = color,
}) => {
  return (
    <section
      className="aspect-square"
      style={{ containerType: 'size', height: size }}
    >
      <section
        className="relative rounded-full w-full h-full flex justify-center items-center"
        style={{ borderWidth: border, borderColor: color }}
      >
        <Arrow
          width={arrowHoursWidth}
          height={arrowHoursHeight}
          color={arrowHoursColor}
          ease={arrowHoursEase}
          duration={arrowHoursDuration}
          rotate={
            ((Math.trunc(
              (new Date(time).getTime() -
                new Date(time).getTimezoneOffset() * 60 * 1000) /
                60 /
                60 /
                refresh
            ) %
              ((360 / 30) * (1000 / refresh))) *
              30) /
            (1000 / refresh)
          }
        />
        <Arrow
          width={arrowMinutesWidth}
          height={arrowMinutesHeight}
          color={arrowMinutesColor}
          ease={arrowMinutesEase}
          duration={arrowMinutesDuration}
          rotate={
            (Math.trunc(new Date(time).getTime() / 60 / refresh) * 6) /
            (1000 / refresh)
          }
        />
        <Arrow
          width={arrowSecondsWidth}
          height={arrowSecondsHeight}
          color={arrowSecondsColor}
          ease={arrowSecondsEase}
          duration={arrowSecondsDuration}
          rotate={
            (Math.trunc(new Date(time).getTime() / refresh) * 6) /
            (1000 / refresh)
          }
        />
        <div
          className="rounded-full aspect-square absolute"
          style={{ height: centerDotSize, backgroundColor: centerDotColor }}
        />
      </section>
    </section>
  );
};
