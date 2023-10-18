import { getJwtSecretKey } from "@/lib/auth";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  // @ts-ignore
  const { value } = cookieStore.get("token");
  const a = await jwtVerify(value, getJwtSecretKey());
  console.log(a);
  return (
    <main>
      <h1>Home</h1>
      <h2>username = {a.payload.username as string}</h2>
    </main>
  );
}
