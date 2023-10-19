import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React, { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className="bg-slate-100 rounded-md">{children}</div>;
};

export default AuthLayout;
