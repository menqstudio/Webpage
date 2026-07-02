import { ButtonLink } from "@/components/ui/Button";
import { defaultLocale } from "@/lib/i18n";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-page px-page-x text-center">
      <p className="font-display text-6xl font-bold text-content-muted">404</p>
      <h1 className="font-display text-2xl font-bold text-content-primary">
        Էջը չի գտնվել · Page not found · Страница не найдена
      </h1>
      <ButtonLink href={`/${defaultLocale}`} size="lg">
        Գլխավոր · Home · Главная
      </ButtonLink>
    </div>
  );
}
