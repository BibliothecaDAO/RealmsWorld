import { createServerFn } from "@tanstack/start";
import { parseCookies, setCookie } from "vinxi/http";

type CookieSetter = {
  name: string;
  value: string;
};

export const cookieSetter = createServerFn(
  "GET",
  ({ name, value }: CookieSetter) => {
    setCookie(name, value);
  },
);

export const cookieParser = createServerFn("GET", (name: string) => {
  const cookies = parseCookies();

  return cookies[name];
});
