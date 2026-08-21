"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search as SearchIcon, X } from "lucide-react";
import { searchDestinations } from "@/lib/destinations";
import { useOdysseyStore } from "@/lib/store";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-clay/30 text-inherit">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  );
}

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastQuery, setLastQuery] = useState(query);
  const mounted = useMounted();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (query !== lastQuery) {
    setLastQuery(query);
    setActiveIndex(0);
  }

  const recentSearches = useOdysseyStore((s) => s.recentSearches);
  const addRecentSearch = useOdysseyStore((s) => s.addRecentSearch);
  const clearRecentSearches = useOdysseyStore((s) => s.clearRecentSearches);
  const setCompanion = useOdysseyStore((s) => s.setCompanion);

  const results = useMemo(
    () => (query.trim() ? searchDestinations(query).slice(0, 8) : []),
    [query],
  );

  useEffect(() => {
    if (!open) return;
    setCompanion("thinking");
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(id);
    };
  }, [open, setCompanion]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" && results[activeIndex]) {
      addRecentSearch(query);
      router.push(`/destinations/${results[activeIndex].slug}`);
      close();
    }
  }

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/97 px-6 pt-28 text-paper sm:px-10"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-full hover:bg-paper/10 sm:right-10"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <div className="mx-auto w-full max-w-2xl">
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute left-1 top-1/2 size-5 -translate-y-1/2 text-stone-400"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search destinations…"
                aria-label="Search destinations"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
                className="w-full border-b border-paper/20 bg-transparent py-4 pl-9 font-display text-2xl outline-none placeholder:text-stone-500 sm:text-3xl"
              />
            </div>

            {query.trim() === "" && recentSearches.length > 0 && (
              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                    Recent
                  </p>
                  <button
                    type="button"
                    onClick={clearRecentSearches}
                    className="text-xs text-stone-500 hover:text-paper"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-paper/20 px-4 py-1.5 text-sm hover:border-paper/50"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query.trim() !== "" && results.length === 0 && (
              <div className="mt-10 text-stone-400">
                <p className="font-display text-xl">No destination found.</p>
                <p className="mt-2 text-sm">
                  Try searching: Japan, Italy, Iceland
                </p>
              </div>
            )}

            <ul id="search-results" role="listbox" className="mt-6 flex flex-col">
              {results.map((destination, i) => (
                <li key={destination.id} role="option" aria-selected={i === activeIndex}>
                  <Link
                    href={`/destinations/${destination.slug}`}
                    onClick={() => {
                      addRecentSearch(query);
                      close();
                    }}
                    className={`flex items-center justify-between border-b border-paper/10 py-4 transition-colors ${
                      i === activeIndex ? "text-clay" : "hover:text-clay"
                    }`}
                  >
                    <span className="font-display text-xl">
                      {highlight(destination.country, query)}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      {destination.continent.replace("-", " ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search destinations"
        className="flex size-9 items-center justify-center rounded-full transition-opacity hover:opacity-60"
      >
        <SearchIcon className="size-4" aria-hidden="true" />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
