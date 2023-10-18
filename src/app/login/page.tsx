import { SignJWT } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getJwtSecretKey } from "../../lib/auth";
import Input from "@/components/Input";

const Login = async () => {
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
      throw new Error("AAAAAAAAAAAAAA!");
    }
  };

  return (
    <form action={loginAction}>
      <Input name="username" type="text" placeholder="username" required />
      <Input name="password" type="password" placeholder="password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
