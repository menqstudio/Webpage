// Client-safe feedback components (no server-only imports) so client forms
// can import them without pulling in the async AuthShell server chain.
export function AuthError({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <div
      role="alert"
      className="rounded-lg border border-state-danger bg-surface-secondary px-4 py-3 text-sm text-content-primary"
    >
      {children}
    </div>
  );
}

export function AuthNotice({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <div className="rounded-lg border border-edge-strong bg-accent-soft px-4 py-3 text-sm text-content-primary">
      {children}
    </div>
  );
}
