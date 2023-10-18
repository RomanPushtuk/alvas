import { NextResponse } from "next/server";
import { getJwtSecretKey, verifyJwtToken } from "./lib/auth";
import { SignJWT } from "jose";

const isAuthPages = (url: string) =>
  ["/", "/logout"].some((page) => page.startsWith(url));

export async function middleware(request: any) {
  const { url, nextUrl, cookies } = request;
  console.log("pathname", nextUrl.pathname);
  const { value: refreshToken } = cookies.get("refreshToken") ?? {
    value: null,
  };
  const { value: accessToken } = cookies.get("accessToken") ?? { value: null };

  const hasVerifiedAccessToken = await verifyJwtToken(accessToken);
  const hasVerifiedRefreshToken = await verifyJwtToken(refreshToken);

  console.log("hasVerifiedAccessToken", hasVerifiedAccessToken);
  console.log("hasVerifiedRefreshToken", hasVerifiedRefreshToken);

  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    console.log("isAuthPageRequested");
    if (!hasVerifiedAccessToken) {
      if (!hasVerifiedRefreshToken) {
        console.log("Протух и accessToken и refreshToken");
        const response = NextResponse.redirect(new URL(`/login`, url));
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      } else {
        console.log("Протух и accessToken но refreshToken жив");
        const accessToken = await new SignJWT({
          username: hasVerifiedRefreshToken.username,
          role: "admin",
        })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("120s")
          .sign(getJwtSecretKey());

        const refreshToken = await new SignJWT({
          username: hasVerifiedRefreshToken.username,
          role: "admin",
        })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("240s")
          .sign(getJwtSecretKey());

        cookies.set("accessToken", accessToken, { secure: true });
        cookies.set("refreshToken", refreshToken, { secure: true });
      }
    } else {
      console.log("accessToken cdeжий");
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/login", "/"] };
