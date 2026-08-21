"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useOdysseyStore, type Theme } from "@/lib/store";

const order: Theme[] = ["light", "dark", "auto"];
const icons: Record<Theme, typeof Sun> = { light: Sun, dark: Moon, auto: Monitor };

export function ThemeToggle() {
  const theme = useOdysseyStore((s) => s.theme);
  const setTheme = useOdysseyStore((s) => s.setTheme);
  const Icon = icons[theme];

  return (
    <button
      type="button"
      onClick={() => setTheme(order[(order.indexOf(theme) + 1) % order.length])}
      aria-label={`Theme: ${theme}. Click to change.`}
      className="flex size-9 items-center justify-center rounded-full transition-opacity hover:opacity-60"
    >
      <Icon className="size-4" aria-hidden="true" />
    </button>
  );
}
