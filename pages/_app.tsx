import '@/styles/globals.css';
import type { AppProps } from 'next/app';
// import { Nanum_Gothic } from '@next/font/google';
import { ToastContextProvider } from '@/contexts/toast';

// const nanum = Nanum_Gothic({
//   weight: '400',
//   subsets: ['latin'],
//   preload: false,
// });

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <main className={nanum.className}>
    <ToastContextProvider>
      <Component {...pageProps} />
    </ToastContextProvider>
    // </main>
  );
}
