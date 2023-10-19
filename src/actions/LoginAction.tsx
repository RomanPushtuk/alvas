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
    });
    cookieStore.set("refreshToken", refreshToken, {
      secure: true,
    });
    redirect("/");
  } else {
    throw new Error("Authentication failed");
  }
};

export default loginAction;
