"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/content/locales/types";

export function Faq({ dict }: { dict: Dictionary }) {
  const { faq } = dict;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id={site.anchors.faq} variant="muted" spacing="lg">
      <Container size="narrow">
        <SectionHeading title={faq.title} description={faq.description} />

        <div className="mt-10 flex flex-col gap-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <Reveal key={item.q} delay={(i % 4) * 50}>
                <div className="overflow-hidden rounded-card border border-edge-subtle bg-surface-primary">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-content-primary transition-colors duration-base ease-standard hover:bg-surface-secondary focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-content-muted transition-transform duration-base ease-standard",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="px-5 pb-5 leading-relaxed text-content-secondary"
                  >
                    {item.a}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
