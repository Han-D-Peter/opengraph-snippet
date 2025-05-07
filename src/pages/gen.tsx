import { GetServerSidePropsContext } from "next";
import Head from "next/head";

export default function Gen({
  title,
  content,
  img,
}: {
  title: string;
  content: string;
  img: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={content} />
      <meta property="og:image" content={img} />
      <meta
        property="og:url"
        content={`https://example.com/gen?title=${title}&content=${content}&img=${img}`}
      />
      <meta property="og:type" content="website" />
    </Head>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { title, content, img } = query;

  return { props: { title, content, img } };
}
