import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="rounded-md">{children}</div>;
};

export default AuthLayout;
