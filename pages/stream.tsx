import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useWebsocket } from '@/hooks/useWebsocket';

export default function Stream() {
  const { queue, currentTime, duration, isPlay } = useWebsocket('stream');
  const [current, setCurrent] = useState(currentTime);
  const timer = useRef<null | NodeJS.Timer>(null);

  useEffect(() => {
    setCurrent(currentTime);
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
    if (isPlay) timer.current = setInterval(startTimer, 1000);

    return () => {
      if (timer.current !== null) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [currentTime, isPlay]);

  const title =
    queue[0].title.length > 50
      ? queue[0].title.slice(0, 47) + '...'
      : queue[0].title;

  const startTimer = (): void => {
    setCurrent((curr) => curr + 1);
  };

  const percent = duration !== 0 ? ((current / duration) * 100).toFixed() : 0;

  return (
    <>
      <Head>
        <title>BGM-VIEWER-FOR-STREAM</title>
        <meta name='description' content='BGM viewer for alskfl222 stream' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div
        className='w-[600px] h-[240px] p-12 flex justify-center items-center
                  rounded-tr-3xl bg-neutral-700'
      >
        <div className='w-full flex flex-col justify-center gap-6 text-neutral-100'>
          <span className='max-h-[120px] text-[42px] font-bold leading-normal break-normal overflow-hidden'>
            {title}
          </span>
          <div className='grow w-full flex justify-between items-center gap-4'>
            <span className='grow text-2xl font-bold text-ellipsis whitespace-nowrap overflow-hidden'>
              {queue[0].channel}
            </span>
            <span className='flex-none text-2xl'>{queue[0].from}</span>
            <span className='flex-none w-[80px] flex justify-end text-2xl'>{percent}%</span>
          </div>
        </div>
      </div>
    </>
  );
}
