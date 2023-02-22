export default function ProgressBar({
  current,
  duration,
  isPlay,
}: {
  current: number;
  duration: number;
  isPlay: boolean;
}) {
  const formatTime = (time: number): string => {
    return `${Math.floor(time / 60)} : ${Math.floor(time % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <>
      <div className='w-full flex justify-between'>
        <span>{formatTime(current)}</span>
        <span>진행바 예정</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className='flex-none flex justify-between gap-2'>
        <span className='w-6'>{isPlay ? 'ON' : 'OFF'}</span>
        <button className=''>다음</button>
      </div>
    </>
  );
}
