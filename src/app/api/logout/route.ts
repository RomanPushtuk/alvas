import { NextRequest, NextResponse } from "next/server";
export const POST = async (request: NextRequest) => {
  const { cookies } = request;
  console.log("POST");
  console.log("cookies", cookies.getAll());
  const response = NextResponse.json({});
//   console.log(response.setHeaders);
  response.cookies.set("accessToken", "", { expires: +new Date() });
  response.cookies.set("refreshToken", "", { expires: +new Date() });
  return response;
};
