import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";

type EditorialSectionProps = {
  index: string;
  title: string;
  children: ReactNode;
};

export function EditorialSection({ index, title, children }: EditorialSectionProps) {
  return (
    <section className="border-t border-stone-200 px-6 py-16 dark:border-stone-800 sm:px-10">
      <Reveal className="mx-auto max-w-3xl">
        <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">
          {index} — {title}
        </h2>
        <div className="mt-4 font-display text-2xl leading-relaxed sm:text-3xl">
          {children}
        </div>
      </Reveal>
    </section>
  );
}
