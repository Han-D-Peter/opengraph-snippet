import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { createClient } from "../../utils/supabase/client";

export const clientSupabase = createClient();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
