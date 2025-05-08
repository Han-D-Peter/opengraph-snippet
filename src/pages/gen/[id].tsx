import { createClient } from "../../../utils/supabase/server";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { use, useEffect } from "react";

export default function Gen({
  title,
  content,
  img,
  redirectUrl,
}: {
  title: string | null;
  content: string | null;
  img: string | null;
  redirectUrl: string | null;
}) {
  const router = useRouter();

  useEffect(() => {
    if (redirectUrl) {
      router.replace(redirectUrl);
    } else {
      router.replace(process.env.NEXT_PUBLIC_VERCEL_URL!);
    }
  }, []);

  return (
    <Head>
      <title>{title}</title>
      {content && <meta name="description" content={content} />}
      {title && <meta property="og:title" content={title} />}
      {content && <meta property="og:description" content={content} />}
      {img && <meta property="og:image" content={img} />}
      <meta
        property="og:url"
        content={`https://example.com/gen?title=${title}&content=${content}&img=${img}`}
      />
      <meta property="og:type" content="website" />
    </Head>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params!.id;
  const supabase = createClient(context);
  const data = await supabase.from("LINK").select("*").eq("shorten_link", id);

  const { title, content, img_link, redirect_link } = data.data![0];

  return {
    props: { title, content, img: img_link, redirectUrl: redirect_link },
  };
}
