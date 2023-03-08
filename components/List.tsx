import ListItem from './ListItem';
import { WebsocketType } from '@/types';

export default function List({
  queue,
  send,
}: Pick<WebsocketType, 'queue' | 'send'>) {
  return (
    <div className='w-full flex flex-col gap-2'>
      {queue.slice(1).map((item, idx) => {
        return <ListItem item={item} send={send} idx={idx + 1} key={item.id + idx} />;
      })}
    </div>
  );
}
