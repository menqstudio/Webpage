export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-page">
      <div
        className="h-8 w-8 animate-spin rounded-pill border-2 border-edge-subtle border-t-action-primary"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
