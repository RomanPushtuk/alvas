import { getJwtSecretKey } from "@/lib/auth";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const { value } = cookieStore.get("refreshToken") || {
    value: "",
  };
  const secret = getJwtSecretKey();
  const parsedToken = await jwtVerify(value, secret);

  return (
    <main>
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold">You're logged in with JWT</h1>
        <h6 className="text-gray-600">Users from secure API endpoint</h6>
        <h2 className="text-lg text-indigo-700">
          Username: {parsedToken.payload.username as string}
        </h2>
      </div>
    </main>
  );
}
