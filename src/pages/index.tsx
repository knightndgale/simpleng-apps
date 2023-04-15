import { type NextPage } from "next";
import Head from "next/head";

import Content from "~/components/content";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Simpleng App</title>
          <meta
          name="author"
          content="Mark Dav Soriano"
        />
        <meta
          name="description"
          content="Created with T3 | Curated by Mark Dave Soriano and the Innoendo IT Solutions team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Content />
      </main>
    </>
  );
};

export default Home;
