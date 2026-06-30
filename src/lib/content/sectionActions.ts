"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/auth/rbac";
import { writeAuditLog } from "@/lib/auth/audit";
import { getSectionDef } from "@/config/sectionContent";

const LOCALES = ["hy", "en", "ru"];

type JsonContent = Record<string, string | string[] | Record<string, string>[]>;

function parseContent(type: string, fd: FormData): JsonContent | null {
  const def = getSectionDef(type);
  if (!def) return null;
  const content: JsonContent = {};

  for (const f of def.fields) {
    if (f.type === "text" || f.type === "textarea") {
      content[f.key] = String(fd.get(f.key) ?? "").trim();
    } else if (f.type === "stringList") {
      const arr: string[] = [];
      for (let i = 0; i < f.count; i++) {
        const v = String(fd.get(`${f.key}.${i}`) ?? "").trim();
        if (v) arr.push(v);
      }
      content[f.key] = arr;
    } else if (f.type === "cardList") {
      const arr: Record<string, string>[] = [];
      for (let i = 0; i < f.count; i++) {
        const obj: Record<string, string> = {};
        let hasValue = false;
        for (const s of f.sub) {
          const v = String(fd.get(`${f.key}.${i}.${s.key}`) ?? "").trim();
          obj[s.key] = v;
          if (v) hasValue = true;
        }
        if (hasValue) arr.push(obj);
      }
      content[f.key] = arr;
    }
  }
  return content;
}

export async function saveSectionAction(fd: FormData): Promise<void> {
  const actor = await requirePermission("content.edit");
  const type = String(fd.get("type") ?? "");
  const language = LOCALES.includes(String(fd.get("language")))
    ? String(fd.get("language"))
    : "hy";
  if (!getSectionDef(type)) return;

  const db = getPrisma();
  if (!db) return;
  const content = parseContent(type, fd);
  if (!content) return;

  const existing = await db.contentItem.findFirst({
    where: { type, language },
    select: { id: true },
  });
  if (existing) {
    await db.contentItem.update({
      where: { id: existing.id },
      data: { content, title: type },
    });
  } else {
    await db.contentItem.create({
      data: { type, language, title: type, content, status: "DRAFT" },
    });
  }

  await writeAuditLog({
    actorUserId: actor.id,
    action: "content.updated",
    entityType: "section",
    entityId: `${type}:${language}`,
  });
  revalidatePath("/admin/content");
  revalidatePath(`/admin/content/${type}`);
  redirect(`/admin/content/${type}?lang=${language}&saved=1`);
}

export async function setSectionStatusAction(fd: FormData): Promise<void> {
  const type = String(fd.get("type") ?? "");
  const language = String(fd.get("language") ?? "hy");
  const status = String(fd.get("status") ?? "");
  if (!["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)) return;
  const perm =
    status === "PUBLISHED"
      ? "content.publish"
      : status === "ARCHIVED"
        ? "content.archive"
        : "content.edit";
  const actor = await requirePermission(perm);

  const db = getPrisma();
  if (!db) return;
  const existing = await db.contentItem.findFirst({
    where: { type, language },
    select: { id: true },
  });
  if (!existing) return;
  await db.contentItem.update({
    where: { id: existing.id },
    data: { status: status as never },
  });

  await writeAuditLog({
    actorUserId: actor.id,
    action: `content.${status.toLowerCase()}`,
    entityType: "section",
    entityId: `${type}:${language}`,
  });
  revalidatePath("/admin/content");
  revalidatePath(`/admin/content/${type}`);
  redirect(`/admin/content/${type}?lang=${language}`);
}
