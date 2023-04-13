import 'swiper/css';
import 'react-image-lightbox/style.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { ThemeProvider } from 'styled-components';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ToastContainer } from 'react-toastify';
import { FC, ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyles, roboto, theme } from '@tama/ui';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta
          name="msapplication-TileColor"
          content={`${theme.colors.primary}`}
        />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="bingbot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color={`${theme.colors.primary}`}
        />
        <meta
          name="msapplication-TileColor"
          content={`${theme.colors.primary}`}
        />
        <meta name="theme-color" content={`${theme.colors.primary}`}></meta>
      </Head>
      <GoogleAnalytics trackPageViews />
      <UserProvider>
        <div className={roboto.className}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <ReactQueryProvider>
              <Component {...pageProps} />
              <ToastContainer position={'bottom-center'} />
            </ReactQueryProvider>
          </ThemeProvider>
        </div>
      </UserProvider>
    </>
  );
}

const ReactQueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
