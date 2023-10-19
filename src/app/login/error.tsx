"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center p-10 rounded-md space-y-2 bg-white shadow-lg">
      <h2 className="text-2xl font-semibold">{error.message}</h2>
      <span>Please return to the login page</span>
      <Button className="mt-4" onClick={() => reset()}>
        Retry
      </Button>
    </div>
  );
}
