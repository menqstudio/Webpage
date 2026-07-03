/**
 * Visually-hidden "skip to main content" link that appears on keyboard focus.
 * Targets the page's `#main` landmark. Render it as the first focusable element.
 */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-toast focus:rounded-lg focus:bg-action-primary focus:px-4 focus:py-2 focus:text-content-inverse"
    >
      {label}
    </a>
  );
}
