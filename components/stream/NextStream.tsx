export default function NextStream({ toast }: any) {
  const { title, from } = toast.data.song;
  return (
    <div
      className='relative w-[600px] h-[240px] p-12 flex justify-center items-center
                 rounded-tr-3xl bg-neutral-700 overflow-hidden'
    >
      <div className='w-full flex flex-col justify-center gap-6 text-neutral-100'>
        <div className='grow w-full flex justify-between items-center gap-4'>
          <span className='flex-none text-2xl'>다음곡</span>
          <span className='flex-none text-2xl'>{from}</span>
        </div>
        <span className='max-h-[120px] text-[42px] font-bold leading-normal break-normal overflow-hidden'>
          {title}
        </span>
      </div>
    </div>
  );
}
