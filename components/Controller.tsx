import { ChangeEvent, useState } from 'react';
import { GrFormAdd, GrLink, GrSend, GrCheckmark } from 'react-icons/gr';
import { GiCancel } from 'react-icons/gi';
import { MdRefresh } from 'react-icons/md';
import { WebsocketType } from '@/types';

// const SERVER_URL = process.env.NEXT_PUBLIC_LOCAL!;
const SERVER_URL = process.env.NEXT_PUBLIC_CLOUD!;

export default function Controller({ send }: Pick<WebsocketType, 'send'>) {
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [streamId, setStreamId] = useState<string>('');
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };
  const onClick = (): void => {
    if (query) {
      setQuery('');
      send('bgm.append', { query, from: 'streamer' });
    }
  };
  const onClickUpdate = (): void => {
    send('bgm.update', { from: 'streamer' });
  };
  const onClickOpen = (): void => {
    setIsOpen((isOpen) => !isOpen);
  };
  const onChangeStreamId = (e: ChangeEvent<HTMLInputElement>): void => {
    setStreamId(e.target.value);
  };
  const onClickCheck = (): void => {
    fetch(`${SERVER_URL}/observer/alive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data !== null) setIsConnect(false);
        alert(data);
      });
  };
  const onClickConnect = (): void => {
    fetch(`${SERVER_URL}/observer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ streamId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === null) {
          setIsConnect(true);
          setIsOpen(false);
        } else {
          setIsConnect(false);
          alert('Connecting ERROR');
        }
      });
  };
  const onClickDisconnect = (): void => {
    fetch(`${SERVER_URL}/observer/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === null) {
          setIsConnect(false);
        } else {
          alert('Something ERROR');
        }
      });
  };
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  return (
    <div className='relative w-full flex justify-between gap-8'>
      <input
        className='w-full h-8 px-2 border-b border-b-neutral-700'
        type='text'
        value={query}
        onChange={onChangeQuery}
        onKeyUp={(e) => onKeyUp(e)}
      />
      <div className='flex-none flex gap-4'>
        <button
          className='px-2 py-1 border rounded-xl hover:bg-neutral-300'
          onClick={onClick}
        >
          <GrFormAdd />
        </button>
        <button
          className='px-2 py-1 border rounded-xl hover:bg-neutral-300'
          onClick={onClickUpdate}
        >
          <MdRefresh />
        </button>
        <button
          className={`px-2 py-1 border rounded-xl ${
            isConnect ? 'bg-lime-300' : 'bg-white hover:bg-neutral-300'
          } `}
          onClick={onClickOpen}
        >
          <GrLink />
        </button>
      </div>

      {isOpen && (
        <div
          className='absolute top-10 z-5 w-full px-4 py-2 flex justify-center items-center
                        gap-4 rounded-sm bg-neutral-50 shadow'
        >
          <input
            className='w-full h-8 px-2 border-b border-b-neutral-400'
            type='text'
            value={streamId}
            onChange={onChangeStreamId}
          />
          <button
            disabled={!isConnect}
            className={`px-2 py-1 border rounded-xl ${
              isConnect ? 'hover:bg-neutral-300' : 'bg-neutral-300'
            } `}
            onClick={onClickDisconnect}
          >
            <GiCancel />
          </button>
          {isConnect ? (
            <button
              className='px-2 py-1 border rounded-xl  hover:bg-neutral-300'
              onClick={onClickCheck}
            >
              <GrCheckmark />
            </button>
          ) : (
            <button
              className='px-2 py-1 border rounded-xl  hover:bg-neutral-300'
              onClick={onClickConnect}
            >
              <GrSend />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
