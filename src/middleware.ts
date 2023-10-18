import { NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/auth";

const isAuthPages = (url: string) => ["/"].some((page) => page.startsWith(url));

export async function middleware(request: any) {
  const { url, nextUrl, cookies } = request;
  const { value: refreshToken } = cookies.get("refreshToken") ?? {
    value: null,
  };
  const { value: accessToken } = cookies.get("accessToken") ?? { value: null };

  const hasVerifiedToken = accessToken && (await verifyJwtToken(accessToken));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);
  if (isAuthPageRequested) {
    console.log("Зашли");
    if (!hasVerifiedToken) {
      const response = NextResponse.redirect(new URL(`/login`, url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/login", "/"] };
