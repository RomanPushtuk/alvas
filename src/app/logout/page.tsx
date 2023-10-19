import { redirect } from "next/navigation";
import { headers, cookies} from "next/headers";

const Logout = async () => {
  const headersList = headers();
  const cookieStore = cookies()
  console.log(cookieStore.getAll())

  await fetch("https://localhost:3000/api/logout", { method: "POST" });
  redirect("/login");
};

export default Logout;
