import { site } from "./site";
import type { Dictionary } from "@/content/locales/types";

/** Nav items map a dictionary label to a section anchor on the page. */
export const navItems: { key: keyof Dictionary["nav"]; anchor: string }[] = [
  { key: "solutions", anchor: site.anchors.solutions },
  { key: "industries", anchor: site.anchors.industries },
  { key: "process", anchor: site.anchors.process },
  { key: "faq", anchor: site.anchors.faq },
  { key: "contact", anchor: site.anchors.contact },
];
