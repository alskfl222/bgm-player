import '@/styles/globals.css';
import type { AppProps } from 'next/app';
// import { Nanum_Gothic } from '@next/font/google';
import { PlayerContextProvider } from '@/contexts/player';
import { ToastContextProvider } from '@/contexts/toast';

// const nanum = Nanum_Gothic({
//   weight: '400',
//   subsets: ['latin'],
//   preload: false,
// });

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <main className={nanum.className}>
    <PlayerContextProvider>
      <ToastContextProvider>
        <Component {...pageProps} />
      </ToastContextProvider>
    </PlayerContextProvider>
    // </main>
  );
}
