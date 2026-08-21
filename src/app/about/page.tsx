import type { Metadata } from "next";
import { Reveal } from "@/components/animations/Reveal";
import { CtaLink } from "@/components/ui/CtaLink";

export const metadata: Metadata = {
  title: "About",
  description: "The story and craft behind ODYSSEY.",
};

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Motion",
  "Zustand",
];

const principles = [
  {
    title: "Every animation has a purpose",
    body: "Nothing moves just because a library made it easy. Motion here guides attention, signals hierarchy, or gives feedback — never decoration for its own sake.",
  },
  {
    title: "Zero backend, by design",
    body: "There's no server, no database, no API key anywhere in this project. Every destination, article, and interaction runs entirely in the browser from local data.",
  },
  {
    title: "Built to stay free",
    body: "Next.js, Motion, Zustand, Tailwind, and Vercel's Hobby tier — nothing here costs anything to build or host, and nothing here needed to.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col px-6 pb-24 pt-32 sm:px-10">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">
          About
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-6xl">
          A frontend built like a place worth visiting.
        </h1>
        <p className="mt-6 text-lg text-stone-500">
          ODYSSEY isn&apos;t a travel booking product — it&apos;s a demonstration
          of what a modern frontend can do when animation, interaction, and
          content design are treated as engineering problems, not
          afterthoughts.
        </p>

        <div className="mt-16 flex flex-col gap-12">
          {principles.map((p) => (
            <Reveal key={p.title}>
              <h2 className="font-display text-2xl">{p.title}</h2>
              <p className="mt-3 text-stone-500">{p.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 border-t border-stone-200 pt-10 dark:border-stone-800">
          <h2 className="font-display text-2xl">Built with</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-stone-300 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-stone-600 dark:border-stone-600 dark:text-stone-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-16">
          <CtaLink href="/explore" variant="solid">
            Begin Journey
          </CtaLink>
        </div>
      </div>
    </main>
  );
}
