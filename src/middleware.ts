import { NextResponse } from "next/server";
import { generateToken, getJwtSecretKey, verifyJwtToken } from "./lib/auth";

const isAuthPages = (url: string) =>
  ["/", "/logout"].some((page) => page.startsWith(url));

export async function middleware(request: any) {
  const { url, nextUrl, cookies } = request;
  const { value: refreshToken } = cookies.get("refreshToken") ?? {
    value: null,
  };
  const { value: accessToken } = cookies.get("accessToken") ?? { value: null };

  const verifiedAccessToken = await verifyJwtToken(accessToken);
  const verifiedRefreshToken = await verifyJwtToken(refreshToken);

  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    // go to the page that requires authentication
    if (!verifiedAccessToken) {
      if (!verifiedRefreshToken) {
        const response = NextResponse.redirect(new URL(`/login`, url));
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      } else {
        const { username } = verifiedRefreshToken;
        const accessToken = await generateToken({ username }, "120s");
        const refreshToken = await generateToken({ username }, "240s");
        cookies.set("accessToken", accessToken, { secure: true });
        cookies.set("refreshToken", refreshToken, { secure: true });
      }
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/login", "/"] };
