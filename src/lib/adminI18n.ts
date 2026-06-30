import { cache } from "react";
import { cookies } from "next/headers";
import {
  ADMIN_LOCALE_COOKIE,
  getAdminDictionary,
  type AdminLocale,
  type AdminDictionary,
} from "@/content/admin";

export const getAdminLocale = cache(async (): Promise<AdminLocale> => {
  const value = (await cookies()).get(ADMIN_LOCALE_COOKIE)?.value;
  return value === "en" ? "en" : "hy";
});

export const getAdminDict = cache(async (): Promise<AdminDictionary> => {
  return getAdminDictionary(await getAdminLocale());
});
