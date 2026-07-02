"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

const COPY: Record<string, { title: string; body: string; retry: string }> = {
  hy: {
    title: "Ինչ-որ բան սխալ գնաց",
    body: "Անսպասելի սխալ առաջացավ։ Խնդրում ենք նորից փորձել։",
    retry: "Փորձել նորից",
  },
  en: {
    title: "Something went wrong",
    body: "An unexpected error occurred. Please try again.",
    retry: "Try again",
  },
  ru: {
    title: "Что-то пошло не так",
    body: "Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова.",
    retry: "Попробовать снова",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] ?? "hy";
  const t = COPY[locale] ?? COPY.hy;

  useEffect(() => {
    // Surface to monitoring; never expose internals to the user.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-page px-page-x text-center">
      <h1 className="font-display text-3xl font-bold text-content-primary">
        {t.title}
      </h1>
      <p className="max-w-narrow text-content-secondary">{t.body}</p>
      <Button onClick={reset} size="lg">
        {t.retry}
      </Button>
    </div>
  );
}
