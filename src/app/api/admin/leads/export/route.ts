import { NextResponse } from "next/server";
import { getCurrentUser, userHasPermission } from "@/lib/auth/rbac";
import { getPrisma } from "@/lib/db/prisma";
import { writeAuditLog } from "@/lib/auth/audit";

export const runtime = "nodejs";

function csvCell(value: unknown): string {
  let s = value == null ? "" : String(value);
  // Neutralize spreadsheet formula injection (=,+,-,@,tab,CR at start).
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !userHasPermission(user, "leads.export")) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const db = getPrisma();
  if (!db) return NextResponse.json({ error: "NO_DB" }, { status: 503 });

  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5000 });

  const headers = [
    "id", "createdAt", "status", "name", "company", "phone", "email",
    "interestedSolution", "locale", "notificationStatus", "utmSource", "message",
  ];
  const lines = [headers.map(csvCell).join(",")];
  for (const l of leads) {
    lines.push(
      [
        l.id, l.createdAt.toISOString(), l.status, l.name, l.company, l.phone,
        l.email, l.interestedSolution, l.locale, l.notificationStatus, l.utmSource,
        l.message,
      ]
        .map(csvCell)
        .join(","),
    );
  }

  await writeAuditLog({
    actorUserId: user.id,
    actorRole: user.roles[0],
    action: "leads.exported",
    entityType: "lead",
    metadata: { count: leads.length },
  });

  return new NextResponse(`﻿${lines.join("\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="menq-leads.csv"',
    },
  });
}
