export default function NowStream({ title, channel, from, percent }: any) {
  return (
    <div
      className='w-[600px] h-[240px] p-8 flex flex-col justify-evenly gap-12 text-neutral-100
                 rounded-tr-3xl bg-neutral-700 overflow-hidden'
    >
      <span className='grow flex items-center text-[36px] font-bold leading-tight break-normal overflow-hidden'>
        {title}
      </span>
      <div className='flex-none w-full flex justify-between items-center gap-4'>
        <span className='grow text-2xl font-bold text-ellipsis whitespace-nowrap overflow-hidden'>
          {channel}
        </span>
        <span className='flex-none text-2xl'>{from}</span>
        <span className='flex-none w-[80px] flex justify-end text-2xl'>
          {percent}%
        </span>
      </div>
    </div>
  );
}
