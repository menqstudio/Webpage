"use server";

import { requirePermission } from "@/lib/auth/rbac";
import { writeAuditLog } from "@/lib/auth/audit";
import { isEmailConfigured, sendRawEmail } from "./email";
import { isTelegramConfigured, sendTelegramMessage } from "./telegram";

export type TestChannelResult = "sent" | "failed" | "skipped";

/** Sends a test notification to Email + Telegram so admins can verify config. */
export async function sendTestNotificationAction(): Promise<{
  email: TestChannelResult;
  telegram: TestChannelResult;
}> {
  const actor = await requirePermission("integrations.test_connection");

  let email: TestChannelResult = "skipped";
  let telegram: TestChannelResult = "skipped";

  if (isEmailConfigured()) {
    try {
      await sendRawEmail({
        to: process.env.EMAIL_TO_LEADS as string,
        subject: "MenQ — test notification",
        text: "This is a test notification from the MenQ admin panel. If you received this, email is working.",
      });
      email = "sent";
    } catch {
      email = "failed";
    }
  }

  if (isTelegramConfigured()) {
    const res = await sendTelegramMessage(
      "✅ MenQ — test notification. If you see this, Telegram is working.",
    );
    telegram = res.sent ? "sent" : "failed";
  }

  await writeAuditLog({
    actorUserId: actor.id,
    action: "integration.test",
    entityType: "integration",
    metadata: { email, telegram },
  });

  return { email, telegram };
}
