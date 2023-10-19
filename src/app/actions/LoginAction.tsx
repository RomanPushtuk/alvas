import { getJwtSecretKey } from "@/lib/auth";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginAction = async (formData: any) => {
    "use server";
    console.log("loginAction");
    const cookieStore = cookies();

    let data: any = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }

    console.log(data);

    if (data.username === "test" && data.password === "test") {
      const accessToken = await new SignJWT({
        username: data.username,
        role: "admin",
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("120s")
        .sign(getJwtSecretKey());

      const refreshToken = await new SignJWT({
        username: data.username,
        role: "admin",
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("240s")
        .sign(getJwtSecretKey());

      cookieStore.set("accessToken", accessToken, { secure: true });
      cookieStore.set("refreshToken", refreshToken, { secure: true });
      redirect("/");
    } else {
        throw new Error('Authentication failed')
    }
  };

  export default loginAction;