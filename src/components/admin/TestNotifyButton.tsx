"use client";

import { useState } from "react";
import { sendTestNotificationAction, type TestChannelResult } from "@/lib/integrations/testActions";

export function TestNotifyButton({
  button,
  running,
  labels,
}: {
  button: string;
  running: string;
  labels: { sent: string; failed: string; skipped: string };
}) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ email: TestChannelResult; telegram: TestChannelResult }>();

  async function run() {
    setPending(true);
    setResult(undefined);
    try {
      setResult(await sendTestNotificationAction());
    } finally {
      setPending(false);
    }
  }

  function label(v: TestChannelResult) {
    return v === "sent" ? labels.sent : v === "failed" ? labels.failed : labels.skipped;
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={run}
        disabled={pending}
        className="self-start rounded-pill bg-action-primary px-4 py-2 text-sm font-semibold text-content-inverse disabled:opacity-60"
      >
        {pending ? running : button}
      </button>
      {result ? (
        <div className="flex gap-4 text-sm">
          <span className="text-content-secondary">
            Email: <span className="font-semibold text-content-primary">{label(result.email)}</span>
          </span>
          <span className="text-content-secondary">
            Telegram: <span className="font-semibold text-content-primary">{label(result.telegram)}</span>
          </span>
        </div>
      ) : null}
    </div>
  );
}
