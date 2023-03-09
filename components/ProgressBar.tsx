import { PlayerContext } from '@/contexts/player';
import { useContext } from 'react';
import { Item } from '@/types';

export default function ProgressBar({
  queue,
  send,
  current,
  duration,
  isPlay,
}: {
  queue: Item[];
  send: (eventName: string, data?: any) => void;
  current: number;
  duration: number;
  isPlay: boolean;
}) {
  const { playerRef } = useContext(PlayerContext);
  const formatTime = (time: number): string => {
    if (time === 0) return '0 : 00';
    return `${Math.floor(time / 60)} : ${Math.floor(time % 60)
      .toString()
      .padStart(2, '0')}`;
  };
  const percent = ((current / duration) * 100).toFixed();

  const onClickNext = () => {
    const data = { ...queue[0], current, duration };
    const player = playerRef?.current?.internalPlayer;
    player?.loadVideoById(queue[1].id);
    player?.playVideo();
    send('bgm.stop', data);
  };

  return (
    <div className='w-full flex justify-between gap-4 text-sm'>
      <div className='w-full flex justify-between items-center gap-4'>
        <span className='flex-none'>{formatTime(current)}</span>
        <div className='relative z-1 w-full h-full border rounded-lg bg-white'>
          <div className='absolute inset-0 flex items-center'>
            <div
              className='mx-0.5 rounded-md bg-sky-300'
              style={{ width: `${percent}%`, height: '80%' }}
            />
          </div>
        </div>
        <span className='flex-none'>{formatTime(duration)}</span>
      </div>
      <div className='flex-none flex justify-between items-center gap-4'>
        <span className='w-6'>{isPlay ? 'ON' : 'OFF'}</span>
        <button
          className='px-1 border rounded border-neutral-800 hover:bg-neutral-500'
          onClick={onClickNext}
        >
          다음
        </button>
      </div>
    </div>
  );
}
