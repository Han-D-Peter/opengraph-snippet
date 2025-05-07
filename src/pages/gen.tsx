import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { use, useEffect } from "react";

export default function Gen({
  title,
  content,
  img,
  link,
}: {
  title: string;
  content: string;
  img: string;
  link: string;
}) {
  const router = useRouter();

  useEffect(() => {
    if (link) router.replace(link);
  }, []);

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
  const { title, content, img, link } = query;

  return { props: { title, content, img, link } };
}

// https://opengraph-snippet.vercel.app/gen?title=hello&description=byebye&img=https://www.imgacademy.com/sites/default/files/img-academy-performance-center.jpg
