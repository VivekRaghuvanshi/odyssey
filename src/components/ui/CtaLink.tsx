import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

const base =
  "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] transition-colors duration-300";

const variants = {
  solid: "bg-ink text-paper hover:text-ink",
  outline: "border border-current/30 text-paper hover:text-ink",
};

export function CtaLink({
  href,
  children,
  variant = "outline",
  className = "",
}: CtaLinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span className="absolute inset-0 -translate-x-full bg-paper transition-transform duration-300 ease-out group-hover:translate-x-0" />
      <span className="relative transition-transform duration-300 group-hover:-translate-x-1">
        {children}
      </span>
      <ArrowUpRight
        className="relative size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden="true"
      />
    </Link>
  );
}
