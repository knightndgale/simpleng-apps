import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NextProgressBar from "nextjs-progressbar";

import { api } from "~/utils/api";
import DefaultLayout from "~/components/layout";

import "~/styles/globals.css";
import ReduxProvider from "~/provider/redux.provider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ReduxProvider>
        <DefaultLayout>
          <NextProgressBar
            color="#ffffff"
            showOnShallow
            startPosition={1}
            stopDelayMs={100}
            height={2}
          />
          <Component {...pageProps} />
        </DefaultLayout>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
