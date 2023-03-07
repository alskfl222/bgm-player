export default function NowStream({ title, channel, from, percent }: any) {
  return (
    <div
      className='relative w-[600px] h-[240px] p-12 flex justify-center items-center
            rounded-tr-3xl bg-neutral-700 overflow-hidden'
    >
      <div className='w-full flex flex-col justify-center gap-6 text-neutral-100'>
        <span className='max-h-[120px] text-[42px] font-bold leading-normal break-normal overflow-hidden'>
          {title}
        </span>
        <div className='grow w-full flex justify-between items-center gap-4'>
          <span className='grow text-2xl font-bold text-ellipsis whitespace-nowrap overflow-hidden'>
            {channel}
          </span>
          <span className='flex-none text-2xl'>{from}</span>
          <span className='flex-none w-[80px] flex justify-end text-2xl'>
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
