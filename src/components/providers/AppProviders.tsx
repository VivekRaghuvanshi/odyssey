"use client";

import { useEffect } from "react";
import { useOdysseyStore } from "@/lib/store";

export function AppProviders() {
  useEffect(() => {
    useOdysseyStore.persist.rehydrate();
  }, []);

  const theme = useOdysseyStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme !== "auto") {
      root.dataset.theme = theme;
      return;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      root.dataset.theme = mql.matches ? "dark" : "light";
    };
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, [theme]);

  return null;
}
