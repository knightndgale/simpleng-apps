import { Html, NextScript, Head, Main } from "next/document";
import NextProgressBar from "nextjs-progressbar";

export default function Document() {
  return (
    <Html data-theme="corporate">
      <Head>
        <title>Simpleng Apps</title>
        <meta name="author" content="Mark Dave Soriano" />
        <meta
          name="description"
          content="Discover Next.js, Prisma, PostgreSQL, useQuery, and Redux-powered web apps, curated by Mark Dave Soriano and the Innoendo IT Solutions team. Join us on this exciting web adventure!"
        />
      </Head>
      <body>
        <NextProgressBar color="#007ebf" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
