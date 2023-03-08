import { GrClose } from 'react-icons/gr';
import { Item } from '@/types';
import { getChannelUrl } from '@/utils';

type ListItemProps = {
  item: Item;
  idx: number;
  send?: (eventName: string, data?: any) => void;
};

export default function ListItem({ item, idx, send }: ListItemProps) {
  const title =
    item.title.length > 50 ? item.title.slice(0, 47) + '...' : item.title;
  const onClickDelete = (idx: number) => {
    if (send) send('delete', { idx });
  };
  return (
    <div
      className={`w-full flex justify-between items-center gap-2 ${
        idx !== 0 ? 'border-b' : ''
      }`}
    >
      <div
        className={
          idx === 0
            ? 'w-full flex flex-col gap-2'
            : 'w-[90%] p-4 flex flex-col gap-2 '
        }
      >
        <div
          className={
            idx === 0
              ? 'font-bold'
              : 'font-bold whitespace-nowrap text-ellipsis overflow-hidden'
          }
        >
          <a
            href={`https://youtu.be/${item.id}`}
            target='_blank'
            rel='noreferrer'
            className={idx === 0 ? 'text-xl italic' : 'text-base'}
          >
            {idx !== 0 && <span>{idx}. </span>}
            <span>{title}</span>
          </a>
        </div>
        <div className='flex justify-between'>
          <a
            href={getChannelUrl(item.channel_id)}
            target='_blank'
            rel='noreferrer'
            className={idx === 0 ? 'text-lg' : 'text-sm'}
          >
            {item.channel}
          </a>
          <span className={idx === 0 ? 'text-lg' : 'text-sm'}>{item.from}</span>
        </div>
      </div>
      {idx !== 0 && (
        <div className='flex-none flex items-center'>
          <button
            className='p-2 border hover:bg-neutral-300'
            onClick={() => onClickDelete(idx)}
          >
            <GrClose />
          </button>
        </div>
      )}
    </div>
  );
}
