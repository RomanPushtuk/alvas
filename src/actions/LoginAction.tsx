"use server";
import { generateToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginAction = async (formData: FormData) => {
  const cookieStore = cookies();

  const username = formData.get("username");
  const password = formData.get("password");

  if (username === "test" && password === "test") {
    const accessToken = await generateToken({ username }, "120s");
    const refreshToken = await generateToken({ username }, "240s");

    cookieStore.set("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
      expires: +new Date() + 120 * 1000 * 60,
    });
    cookieStore.set("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      expires: +new Date() + 240 * 1000 * 60,
    });
    redirect("/");
  } else {
    throw new Error("Authentication failed");
  }
};

export default loginAction;
