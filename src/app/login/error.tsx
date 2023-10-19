"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error: FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className="flex flex-col justify-center items-center p-10 rounded-md space-y-2 bg-white shadow-lg">
      <h2 className="text-2xl font-semibold">{error.message}</h2>
      <span>Please return to the login page</span>
      <Button className="mt-4" onClick={reset}>
        Retry
      </Button>
    </div>
  );
};

export default Error;
