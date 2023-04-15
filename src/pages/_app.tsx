import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";
import DefaultLayout from "~/components/layout";

import "~/styles/globals.css";
import ReduxProvider from "~/utils/ReduxProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ReduxProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
