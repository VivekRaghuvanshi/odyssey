"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { Search } from "./Search";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/explore", label: "Explore" },
  { href: "/destinations", label: "Destinations" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-paper sm:px-10">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold uppercase tracking-[0.3em]"
          >
            Odyssey
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-10 text-xs font-medium uppercase tracking-[0.2em] md:flex"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-opacity hover:opacity-60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Search />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-50 flex size-10 items-center justify-center md:hidden"
            >
              {open ? (
                <X className="size-6" aria-hidden="true" />
              ) : (
                <Menu className="size-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </>
  );
}
