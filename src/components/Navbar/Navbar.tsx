import Link from "next/link";
import { buttonVariants } from "../ui/button";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-zinc-100 py-2 border-b border-s-zinc-200 w-full z-10">
      <div className="container flex items-center justify-between">
        <Link className={buttonVariants()} href="/">
          Home
        </Link>
        <Link className={buttonVariants()} href="/logout">
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
