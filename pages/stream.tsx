import { useState, useEffect, useRef, useContext } from 'react';
import Head from 'next/head';
import NextStream from '@/components/stream/NextStream';
import NowStream from '@/components/stream/NowStream';
import { useWebsocket } from '@/hooks/useWebsocket';
import { ToastContext } from '@/contexts/toast';

export default function Stream() {
  const { queue, currentTime, duration, isPlay } = useWebsocket('stream');
  const { toasts, removeToast } = useContext(ToastContext);
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

  useEffect(() => {
    if (toasts.length > 0) setTimeout(removeToast, 5000);
  }, [toasts, removeToast]);

  const title =
    queue[0].title.length > 50
      ? queue[0].title.slice(0, 47) + '...'
      : queue[0].title;

  const startTimer = (): void => {
    setCurrent((curr) => curr + 1);
  };

  const percent = duration !== 0 ? ((current / duration) * 100).toFixed() : 0;

  const getToastComponent = (name: string) => {
    if (name === 'obs.next') return <NextStream toast={toasts[0]} />;
    return null;
  };

  return (
    <>
      <Head>
        <title>BGM-VIEWER-FOR-STREAM</title>
        <meta name='description' content='BGM viewer for alskfl222 stream' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {toasts[0] ? (
        getToastComponent(toasts[0].name)
      ) : (
        <NowStream
          title={title}
          channel={queue[0].channel}
          from={queue[0].from}
          percent={percent}
        />
      )}
    </>
  );
}
