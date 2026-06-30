"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to monitoring; never expose internals to the user.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-page px-page-x text-center">
      <h1 className="font-display text-3xl font-bold text-content-primary">
        Something went wrong
      </h1>
      <p className="max-w-narrow text-content-secondary">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset} size="lg">
        Try again
      </Button>
    </div>
  );
}
