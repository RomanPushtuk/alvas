import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    console.log("request.cookies", cookieStore.getAll());
    request.cookies.delete("accessToken");
    request.cookies.delete("refreshToken");
    console.log("Удалили куки");
    return new Response("Успешный вход", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("", { status: 500 });
  }
}
