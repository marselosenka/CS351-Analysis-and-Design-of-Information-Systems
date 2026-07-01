import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>eSports System</title>
        <meta
          name="description"
          content="Browse, create, and manage eSports events with a lightweight event platform."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
