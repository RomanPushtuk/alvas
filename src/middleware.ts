import { NextRequest, NextResponse } from "next/server";
import { generateToken, verifyJwtToken } from "./lib/auth";
import { isAuthPages } from "./lib/utils";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies, body } = request;
  const { value: accessToken } = cookies.get("accessToken") ?? { value: "" };
  const { value: refreshToken } = cookies.get("refreshToken") ?? { value: "" };

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
        const response = NextResponse.next();
        const { username } = verifiedRefreshToken;
        const accessToken = await generateToken({ username }, "120s");
        const refreshToken = await generateToken({ username }, "240s");
        cookies.set({ name: "accessToken", value: accessToken });
        cookies.set("refreshToken", refreshToken);
        response.cookies.set("accessToken", accessToken, {
          secure: true,
        });
        response.cookies.set("refreshToken", refreshToken, {
          secure: true,
        });
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/", "/login"] };
