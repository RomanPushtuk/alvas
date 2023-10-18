"use client";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const Logout = () => {
  Cookies.remove("refreshToken");
  Cookies.remove("accessToken");

  redirect("/login");
};

export default Logout;
