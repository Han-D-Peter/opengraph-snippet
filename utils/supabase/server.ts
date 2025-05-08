// utils/supabase/server.ts
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import type { GetServerSidePropsContext } from "next";

export const createClient = (ctx: GetServerSidePropsContext) => {
  return createPagesServerClient(ctx);
};
