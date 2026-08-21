"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

type LinkItem = { href: string; label: string };

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: LinkItem[];
};

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.06,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-3 font-display text-4xl text-paper"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
