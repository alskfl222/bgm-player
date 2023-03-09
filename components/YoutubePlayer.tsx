import { useContext } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { WebsocketType } from '@/types';
import { PlayerContext } from '@/contexts/player';

export function YoutubePlayer({
  queue,
  send,
}: Pick<WebsocketType, 'queue' | 'send'>) {
  const { playerRef } = useContext(PlayerContext);
  const opts: YouTubeProps['opts'] = {
    width: '480',
    height: '270',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady: YouTubeProps['onReady'] = (e) => {
    // https://developers.google.com/youtube/iframe_api_reference#Events
    console.log('onReady');
    // e.target.mute();
  };

  const onStateChange: YouTubeProps['onStateChange'] = (e) => {
    // https://developers.google.com/youtube/iframe_api_reference#Events
    console.log('onStateChange', e.data);
    const currentTime = e.target.getCurrentTime().toFixed(2);
    const duration = e.target.getDuration().toFixed(2);
    const data = { ...queue[0], current: currentTime, duration };
    if (e.data === -1) {
      console.log('시작되지 않음');
    }
    if (e.data === 0) {
      e.target.loadVideoById(queue[1].id);
      e.target.playVideo();
      send('bgm.stop', data);
    }
    if (e.data === 1) {
      send('bgm.play', data);
      // setTimeout(() => {
      //   const currentTime = e.target.getCurrentTime().toFixed(2);
      //   const duration = e.target.getDuration().toFixed(2);
      //   send('play', { ...data, current: currentTime, duration });
      // }, 1000);
    }
    if (e.data === 2) {
      send('bgm.pause', data);
    }
    if (e.data === 3) {
      send('bgm.buffering', data);
    }
  };

  const onError: YouTubeProps['onError'] = (e) => {
    // https://developers.google.com/youtube/iframe_api_reference#Events
    console.log(e);
    if (e.data === 101 || e.data === 150) {
      e.target.loadVideoById(queue[1].id);
      e.target.playVideo();
      send('bgm.inactive');
      send('bgm.stop');
    }
  };
  return (
    <YouTube
      id='player'
      ref={playerRef}
      videoId={queue[0].id}
      opts={opts}
      onReady={onReady}
      onStateChange={onStateChange}
      onError={onError}
    />
  );
}
